Ext.define('SimplyFundraising.store.ContactTypes', {
    extend: 'Ext.data.Store',
    model: 'SimplyFundraising.model.ContactType',
    autoLoad: false,
    autoSync: false
//    associations: [
//        {
//            type: 'belongsTo',
//            model: 'SimplyFundraising.model.Contact',
//            name: 'Contact',
//            getterName: 'getContact',
//            associationKey: 'Contact'
//
//        }
//    ]

});