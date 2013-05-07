var crudServiceBaseUrl = "http://127.0.0.1:8081/cors/";

Ext.define('SimplyFundraising.store.SFStore', {
    alias: 'Sfstore',
    extend : 'Ext.data.Store',
    autoLoad : false,
    autoSync : true,

    constructor : function(config) {
        // applyIf means only copy if it doesn't exist
        Ext.applyIf(config, {
            proxy : this.createProxy()
        });
        this.callParent([config]);
    },

    createProxy : function() {
        return {
            directionParam : null,
            filterParam : null,
            groupDirectionParam : null,
            groupParam : null,
            limitParam : null,
            pageParam : null,
            sortParam : null,
            startParam : null,
            type: 'ajax',
            api : {
                create : crudServiceBaseUrl + '/{entity}/?$method=update',
                read : crudServiceBaseUrl + '/{entity}',
                update : crudServiceBaseUrl + '/{entity}/?$method=update',
                destroy : crudServiceBaseUrl + '/{entity}({id})/?$method=delete',
            },
            reader : {
                type : 'json',
                root : '__ENTITIES',
                successProperty : false,
                getResponseData : function(response) {
                    var findme = "__ENTITIES";
                    if (response.responseText.indexOf(findme) > -1) {
                        //Already an array of __ENTITIES
                    } else {
                        //Single result turn into array __ENTITIES
                        response.responseText = '{"__ENTITIES":[' + response.responseText + ']}';
                    }
                    var data = Ext.data.reader.Json.prototype.getResponseData.call(this, response);
                    return data;
                }
            },
            writer : {
                type : 'json',
                writeAllFields : false,
                getRecordData : function(record, operation) {
                    switch(operation.action) {
                        case 'create':
                            console.log('INFO', 'Create');
                            delete record.data.__KEY
                            delete record.data.__STAMP
                            return record.data
                            break;
                        case 'update':
                            console.log('INFO', 'Updating');
                            var myrecord = record.getChanges();
                            myrecord.__KEY = record.data.__KEY
                            myrecord.__STAMP = record.data.__STAMP
                            return myrecord
                            break;
                    }
                }
            }
            
        }
    },
    buildUrl : function(request) {
                var url = this.callParent(arguments);
                return this.replaceTokens(url, request);
            },
            replaceTokens : function(str, request) {
                var me = this;

                return str.replace(/{(.*?)}/g, function(full, token) {
                    // We read the id from the request params, the category is read from the proxy itself
                    return encodeURIComponent(request.params[token] || me[token]);
                });
            }
});

