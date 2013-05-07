Ext.define('SimplyFundraising.model.User', {
    extend : 'Ext.data.Model',
    idProperty : '__KEY',
    fields : ['name', 'email', '__KEY', '__STAMP'],
    proxy : {
        entity : 'Users',
        type : 'sfproxy'
    }
}); 