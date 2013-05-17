Ext.define('SimplyFundraising.store.Contacts', {
    extend: 'Ext.data.Store',
    model: 'SimplyFundraising.model.Contact',
    autoLoad: false,
    autoSync: false,
    listeners : {                                                        // added listener
        datachanged : function() {
            console.log("got datachanged");
        },
        afterEdit: function(){
            console.log('afteredit1');
        }
    },
    afterEdit: function(){
        console.log('afteredit');
    },
        datachanged : function() {
            console.log('1datachanged');
        },
        update : function() {
            console.log('update');
        },

    onDataChange: function() {
    console.log('2datachanged');
},
    onUpdate: function() {
        console.log('3update');
    }
   // record = store.getAt(0);
//this.on({
//    'datachanged': onDataChange,
//    'update': onUpdate
//});
});