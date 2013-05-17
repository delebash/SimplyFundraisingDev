Ext.define('SimplyFundraising.model.Contact', {
    extend : 'Wakanda.model',
    requires:[
        'SimplyFundraising.model.ContactType'
    ],
    fields: ['firstName', 'middleName','lastName'],
    associations: [
        {
            type: 'hasOne',
            model: 'SimplyFundraising.model.ContactType',
            name: 'ContactType',
            getterName: 'getContactType',
            associationKey: 'ContactType'

        }
    ]
});