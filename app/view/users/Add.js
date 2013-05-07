Ext.define('SimplyFundraising.view.users.Add', {
    extend: 'Ext.form.Panel',
     xtype : 'usersadd',
    requires: [
        'Ext.form.field.Text',
        'Ext.Button'
    ],
    
    xtype: 'usersadd',
    bodyPadding: 20,
    buttonAlign: 'left',
    defaultType: 'textfield',
    autoScroll: true,
    fieldDefaults: {
        labelWidth: 50,
        msgTarget: 'side'
    },
    items: [{
        xtype: 'button',
        ui: 'plain',
        margin: '0 0 10 0',
        text: '&#171; Back to List',
        href: '#users',
        hrefTarget: '_self'
    }, {
        fieldLabel: 'Email',
        name: 'email'
    }]
});
