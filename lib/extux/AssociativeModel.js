Ext.override(Ext.data.Model,{
    dirtyState: {
    },
    allowEmpty: true,
    disableChildWrites: true,
    disableWrite: false,
    constructor: function() {
      //debugger;
        this.callParent(arguments);

        this.dirtyState = {
            previous: false,
            model: false,
            children: false,
            dirtyChildren: 0
        };

        this.addEvents('add', 'update', 'remove', 'dirtychange');
        this.on({
            add: this.onStoreChange,
            update: this.onStoreChange,
            remove: this.onStoreChange,
            scope: this
        });
    },
    monitorRecord: function(record) {
      //  debugger;
        record.on('dirtychange', this.onFieldChanged, this);
    },
    monitorStore: function(store) {
      //  debugger;
        store.dirty = false;
        this.relayEvents(store, ['add', 'update', 'remove']);
    },
    updateMyStores: function() {
       // debugger;
        if (this.stores.length > 0) {
            Ext.each(this.stores, function(store) {
                store.fireEvent('datachanged', store);
                store.fireEvent('update', store, this);
            });
        }
    },
    onFieldChanged: function(record, dirty, previous) {
      //  debugger;
        if (dirty && !previous) {
            this.dirtyState.children = true;
            this.dirtyState.dirtyChildren++;
            if (this.dirtyState.previous == false) {
                this.dirty = true;
                this.fireEvent('dirtychange', this, this.dirty, this.dirtyState.previous);
                this.dirtyState.previous = true;
                this.updateMyStores();
            }
        } else if (!dirty && previous) {
            this.dirtyState.dirtyChildren--;
            if (this.dirtyState.dirtyChildren == 0) {
                this.dirtyState.children = false;
                if (this.dirtyState.previous == true && this.dirtyState.model == false) {
                    this.dirty = false;
                    this.fireEvent('dirtychange', this, this.dirty, this.dirtyState.previous);
                    this.dirtyState.previous = false;
                    this.updateMyStores();
                }
            }
        }
    },
    onStoreChange: function(store) {
     //   debugger;
        var dirty = false;
        if (store.getNewRecords().length > 0) {
            dirty = true;
        }
        if (store.getModifiedRecords().length > 0) {
            dirty = true;
        }
        if (store.getRemovedRecords().length > 0) {
            dirty = true;
        }

        this.onFieldChanged(store, dirty, store.dirty);
        store.dirty = dirty;
    },
    setDirty: function() {
      //  debugger;
        this.callParent(arguments);
        this.fireEvent('dirtychange', this, this.dirty, this.dirtyState.previous);
    },
    checkDirty: function() {
   //     debugger;
        this.dirtyState.model = this.dirty;
        if (this.dirtyState.children == true) {
            this.dirty = true;
        }
        if (this.dirty != this.dirtyState.previous) {
            this.fireEvent('dirtychange', this, this.dirty, this.dirtyState.previous);
            this.dirtyState.previous = this.dirty;
        }
    },
    set: function() {
     //   debugger;
        this.callParent(arguments);
        this.checkDirty();
    },
    reject: function() {
      //  debugger;
        this.callParent(arguments);
        this.checkDirty();
        var models = this.fields.filterBy(function(item) {
            return (item.type.type == 'hasone' || item.type.type == 'model')?true:false;
        });
        models.each(function(field) {var model = this.get(field.name); model.reject(); },this);

        var stores = this.fields.filterBy(function(item) {
            return (item.type.type == 'hasmany' || item.type.type == 'store')?true:false;
        });
        stores.each(function(field) {var store = this.get(field.name); store.rejectChanges(); }, this);
    },
    commit: function() {
     //   debugger;
        if (this.disableWrite) {
            Ext.log({msg: 'Write disabled for this record.',level: 'warn', stack: true});
        } else {
            this.callParent(arguments);
        }
        this.checkDirty();
    },
    save: function() {
     //   debugger;
        if (this.disableWrite) {
            Ext.log({msg: 'Write disabled for this record.',level: 'warn', stack: true});
        } else {
            this.callParent(arguments);
        }
        this.checkDirty();
    },
    loadAssociatedData: function(depth) {
      //  debugger;
        depth = depth || 0;
        var models = this.fields.filterBy(function(item) {
            return (item.type.type == 'hasone' || item.type.type == 'model')?true:false;
        });
        models.each(function(model) { this.loadModelData(model, depth); }, this);

        var stores = this.fields.filterBy(function(item) {
            return (item.type.type == 'hasmany' || item.type.type == 'store')?true:false;
        });
        stores.each(function(store) { this.loadStoreData(store); }, this);
    },
    load: function(config) {
     //   debugger;
        config = Ext.apply({}, config);
        config = Ext.applyIf(config, {
            action: 'read'
        });
        var operation  = new Ext.data.Operation(config),
                scope      = config.scope || this,
                record     = null,
                callback;

        callback = function(operation) {
            if (operation.wasSuccessful()) {
                record = operation.getRecords()[0];
                this.copyFrom(record);
                Ext.callback(config.success, scope, [this, operation]);
            } else {
                Ext.callback(config.failure, scope, [this, operation]);
            }
            Ext.callback(config.callback, scope, [this, operation]);
        };
        this.proxy.read(operation, callback, this);
    },
    loadModelData: function(field, depth) {
      //  debugger;
        var model = this.get(field.name),params = {};
        if (Ext.isFunction(model.load)) {

        Ext.each(model.params, function(param) {
            if (Ext.isString(param)) {
                params[param] = this.get(param);
            } else if (typeof param.field !== 'undefined') {
                params[param.name] = this.get(param.field);
            } else {
                params[param.name] = param.value;
            }
        }, this);
        model.load({
            scope: this,
            params: params,
            success: function(record) {
                if (depth - 1 > 0) {
                    record.loadAssociatedData(depth - 1);
                }
            }
        });
        }
    },
    loadStoreData: function(field, depth) {
    //    debugger;
        var store = this.get(field.name);
        if (Ext.isFunction(store.load)) {
            store.load();
        }
    }
});


Ext.data.Types.MODEL = {
    type: 'model',
    convert: function(value, record) {
        var newModel = Ext.create(this.modelType, value);
        if (this.persist && Ext.isFunction(record.monitorRecord)) {
            record.monitorRecord(newModel);
        }
        if (!Ext.isFunction(this.serialize)) {
            this.serialize = function(value, record) {
                return value.getData(true);
            };
        }
        if (record.disableChildWrites) {
            newModel.disableWrite = true;
        }
        if (Ext.isArray(this.params)) {
            newModel.params = this.params;
        }
        return newModel;
    },
    sortType: function(value) {
        return 1;
    }
};

Ext.data.Types.STORE = {
    type: 'store',
    convert: function(value, record) {
        if (!Ext.isEmpty(value) || record.allowEmpty || this.allowEmpty) {
            var storeType = this.storeType || 'Ext.data.Store';
            var newStore;
	          if (Ext.isArray(value)) {
		            if (typeof this.modelType !== 'undefined') {
                    newStore = Ext.create(storeType, {
			                  model: this.modelType,
			                  data: value
                    });
		            } else {
                    newStore = Ext.create(storeType, {
			                  data: value
                    });
		            }
	          } else {
		            if (typeof this.modelType !== 'undefined') {
                    newStore = Ext.create(storeType, {
			                  model: this.modelType
		                });
		            } else {
                    newStore = Ext.create(storeType);
		            }
		            newStore.loadRawData(value);
	          }
	          if (Ext.isArray(this.params)) {
                newStore.on('beforeload', function() {
                    var proxy = newStore.getProxy();
                    Ext.each(this.params, function(param) {
                        if (Ext.isString(param)) {
                            proxy.setExtraParam(param, record.get(param));
                        } else if (typeof param.field !== 'undefined') {
                            proxy.setExtraParam(param.name, record.get(param.field));
                        } else {
                            proxy.setExtraParam(param.name, param.value);
                        }
                    });
                }, this);
            }

            if (this.persist && Ext.isFunction(record.monitorStore)) {
                record.monitorStore(newStore);
            }

            if (!Ext.isFunction(this.serialize)) {
                this.serialize = function(value, record) {
                    var retval = { newRecords: [], updatedRecords: [], removedRecords: [] };
                    Ext.each(value.getNewRecords(), function(record) {
                        retval.newRecords.push(record.getData(true));
                    });
                    Ext.each(value.getUpdatedRecords(), function(record) {
                        retval.updatedRecords.push(record.getData(true));
                    });
                    Ext.each(value.getRemovedRecords(), function(record) {
                        retval.removedRecords.push(record.getData(true));
                    });
                    return retval;
                };
            }

            if (record.disableChildWrites) {
                newStore.on('beforesync', function() {
                    Ext.log({msg: 'Write disabled for this store.', level: 'warn', stack: true});
                    return false;
                },this);
            }

            return newStore;
        } else {
            return null;
        }
    },
    sortType: function(value) {
        return 1;
    }
};

Ext.data.Types.HASONE = {
    type: 'hasone',
    convert: Ext.data.Types.MODEL.convert,
    sortType: Ext.data.Types.MODEL.sortType
};

Ext.data.Types.HASMANY = {
    type: 'hasmany',
    convert: Ext.data.Types.STORE.convert,
    sortType: Ext.data.Types.STORE.sortType
};
