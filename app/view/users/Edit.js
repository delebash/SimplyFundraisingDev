Ext.define('SimplyFundraising.view.users.Edit', {
    extend: 'Ext.form.Panel',
     xtype : 'usersedit',
    requires: [
        'Ext.form.field.Text',
        'Ext.Button'
    ],
    
    xtype: 'usersedit',
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
    },{
        fieldLabel: 'Name',
        name: 'name'
    }, {
        fieldLabel: 'Email',
        name: 'email'
    },
            {   xtype: 'button',
                text: 'Save',
                action: 'save'
            },
            {   xtype: 'button',
                text: 'Cancel',
                scope: this,
                 handler : function() {
        history.back();
    },
            }
        ]
});
