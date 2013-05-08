
Ext.define('SimplyFundraising.store.Users', {
    extend : 'Ext.data.Store',
    model : 'User',
    autoLoad : false,
    autoSync : true
});

// Ext.define('SimplyFundraising.store.Users', {
// extend : 'Ext.data.Store',
// model : 'SimplyFundraising.model.User',
// autoLoad : false,
// autoSync : true,
// proxy : {
// type : 'ajax',
// api : {
// create : crudServiceBaseUrl + 'Users/?$method=update',
// read : crudServiceBaseUrl + 'Users',
// update : crudServiceBaseUrl + 'Users/?$method=update',
// destroy : crudServiceBaseUrl + 'Users/?$method=delete'
// },
// writer : {
// type : 'json',
// writeAllFields : false,
// getRecordData : function(record, operation) {
// switch(operation.action) {
// case 'create':
// console.log('INFO', 'Create');
// delete record.data.__KEY
// delete record.data.__STAMP
// return record.data
// break;
// case 'update':
// console.log('INFO', 'Updating');
// var myrecord = record.getChanges();
// myrecord.__KEY = record.data.__KEY
// myrecord.__STAMP = record.data.__STAMP
// return myrecord
// break;
// }
// },
// },
// reader : {
// type : 'json',
// root : '__ENTITIES',
// successProperty : false,
// getResponseData : function(response) {
// var findme = "__ENTITIES";
// if (response.responseText.indexOf(findme) > -1) {
// //Already an array of __ENTITIES
// } else {
// //Single result turn into array __ENTITIES
// response.responseText = '{"__ENTITIES":[' + response.responseText + ']}' ;
// }
// var data = Ext.data.reader.Json.prototype.getResponseData.call(this, response);
// return data;
// }
// }
//
// },
// update : function(record, operation, modifiedFieldNames, eOpts) {
// // debugger;
// console.log("records");
// },
// onCreateRecords : function(records, operation, success) {
// console.log(records);
// },
//
// onUpdateRecords : function(records, operation, success) {
// //  debugger;
// //   console.log(records);
// },
//
// onDestroyRecords : function(records, operation, success) {
// console.log(records);
// },
// listeners : {
// update : function(store, record, operation, eOpts) {
// switch(operation) {
// case Ext.data.Model.EDIT:
// console.log('INFO', 'Updating record...');
// break;
// case Ext.data.Model.COMMIT:
// console.log('INFO', 'Record was updated!');
// break;
// case Ext.data.Model.REJECT:
// console.log('ERR', 'Something went horribly wrong :( Data was rejected!');
// break;
// }
// },
// beforesync : function(options, eOpts) {
// //    debugger;
// }
// }
// // listeners : {
// // write : function(store, action, result, res, rs) {
// // debugger;
// // console.log('WRITE', arguments);
// // }
// // },
// }))