Ext.define('SimplyFundraising.model.Contact', {
    extend : 'Wakanda.model',
    requires:[
        'SimplyFundraising.model.ContactType'
    ],
    fields: ['firstName', 'middleName','lastName','ContactType.name'],
    associations: [
        {
            type: 'hasOne',
            model: 'SimplyFundraising.model.ContactType',
            name: 'ContactTypes',
            getterName: 'getContactType',
            associationKey: 'ContactType'

        }
    ]
});