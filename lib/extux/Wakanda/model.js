
Ext.define('Wakanda.model', {
    requires: ['Wakanda.proxy'],
    extend: 'Ext.data.Model',
    fields: ['__KEY',{name: '__STAMP',persist: false}],
    idProperty: '__KEY',

    stampProperty: '__STAMP',
    defaultProxyType: 'wakanda',
    proxy: 'wakanda',
    listeners: {
        update: function(store, record, modelOperation) {
            debugger;
            if(modelOperation === 'edit') {
                Ext.Object.each(record.modified, function(key, oldValue, self) {
                    if(oldValue) {
                        record.fireEvent(key+'modified', me, me.get(key), oldValue);
                    }
                });
            }
        }
    },
//    constructor: function () {
//        this.callParent(arguments)
//        return this;
//    },
    onClassExtended: function (cls, data) {
        //    debugger;
        // cls.apply(this)
//        var parts = data.$className.split('.');
//        var entity = parts[2]
//        var catalog = this.prototype.getCatalog(entity),
//            attributes = catalog.attributes;
//        for (var i = 0, l = attributes.length; i < l; i++) {
//            if (attributes[i].name === 'ID') {
//                attributes[i].persist = false;
//            }
//        }
//        attributes.push({name: this.prototype.idProperty});
//        attributes.push({name: this.prototype.stampProperty});
//       // data.fields = attributes;
//      //  debugger;
//        //this.setFields(data.fields)
//      // var mymodel = Ext.ModelManager.getModel(data.$className);
        //   debugger;
        // Ext.appy(this);
//        //this.superclass.superclass.$onExtended.apply(this, arguments);
        // this.triggerExtended.apply(this,arguments)
        // cls.apply(this,arguments)
    },

    getCatalog: function (className) {
        var catalog;
        Ext.Ajax.request({
            async: false,
            url: hosturl + '/$catalog/' + className,
            success: function (response) {
                catalog = Ext.decode(response.responseText);
            }
        });
        return catalog;
    }

});
