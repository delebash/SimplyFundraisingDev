Ext.define('SimplyFundraising.view.contacts.Edit', {
    extend: 'Ext.window.Window',
    xtype: 'contactsedit',
    title: 'Edit Contacts',
    layout: 'fit',
    stores: ['ContactTypes','Contacts'],
    autoShow: true,
//    defaults: {
//        listeners: {
//            change: function(field, newVal, oldVal) {
//                //alert(newVal);
//                debugger;
//            }
//        }
//    },
//    listeners: {
//        dirtychange: function() {
//            alert('hello');
//        }
//    },
    initComponent: function () {
        this.items = [

            {
                xtype: 'form',
                bodyStyle: {
                    background: 'none',
                    padding: '10px',
                    border: '0'
                },
                items: [
                    {
                        xtype: 'textfield',
                        name: 'firstName',
                        allowBlank: false,
                        fieldLabel: 'Name'
                    },
                    {
                        xtype: 'textfield',
                        name: 'lastName',
                        allowBlank: false,
                        fieldLabel: 'Last Name'
                    },
                    {
                        xtype: 'combobox',
                        fieldLabel: 'Contact Type',
                        store: 'ContactTypes',
                         valueNotFoundText: 'not found',
                        displayField: 'name',
                        valueField: '__KEY',
                        name: 'ContactType',
                        typeAhead: true,
                        queryMode: 'local',
                        emptyText: 'Select a type...'
                    }
                ]
            }
        ];
        this.buttons = [
            {
                text: 'Save',
                action: 'save'
            },
            {
                text: 'Cancel',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});