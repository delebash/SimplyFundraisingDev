Ext.define('SimplyFundraising.model.Contact', {
    extend : 'Ext.data.Model',
    idProperty : '__KEY',
    fields : ['firstName', 'middleName','lastName'],
    proxy : {
        entity : 'Contact',
        type : 'sfproxy'
    }
}); 