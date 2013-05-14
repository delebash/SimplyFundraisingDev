Ext.define('SimplyFundraising.model.Contact', {
    extend : 'Wakanda.model',
    fields: ['firstName', 'middleName','lastName'],
    associations: [{
        type: 'hasOne',
        model: 'SimplyFundraising.model.ContactType',
        name: 'contacttypes',
        associationKey: 'ContactType',
        reader: {
            type: 'json',
            record: 'ContactType',
            idProperty: '__KEY',
            root: '__ENTITIES'
        }}
    ],


    associations: [{ type: 'hasOne', name: 'contacttype', model: 'SimplyFundraising.model.ContactType',associationKey: 'ContactType' }]
}); 