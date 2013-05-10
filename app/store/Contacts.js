Ext.define('SimplyFundraising.store.Contacts', {
    extend: 'Ext.data.Store',
    model: 'SimplyFundraising.model.Contact',
    autoLoad: true,
    autoSync: true,
    constructor: function () {
        this.callParent(arguments);
        return this;
    }
});