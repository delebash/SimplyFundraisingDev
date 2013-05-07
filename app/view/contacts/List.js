Ext.define('SimplyFundraising.view.contacts.List', {
    extend : 'Ext.grid.Panel',
    xtype : 'contactslist',
    title : 'All Contacts',
    store : 'Contacts',
    autoHeight: true,
    autoScroll : true,
    viewConfig : {
        loadMask : true
    },
    initComponent : function() {
        this.tbar = [{
            text : 'Create Contact',
            action : 'create'
        }];
        this.columns = [{
            header : 'Id',
            dataIndex : '__KEY',
            width : 50
        }, {
            header : 'First Name',
            dataIndex : 'firstName',
            flex : 1
        }, {
            header : 'Middle Name',
            dataIndex : 'middleName',
            flex : 1
        }, {
            header : 'Last Name',
            dataIndex : 'lastName',
            flex : 1
        },
        {
            header : 'Type',
            dataIndex : 'ContactType.name',
            flex : 1
        }];
        this.addEvents('removeitem');
        this.actions = {
            removeitem : Ext.create('Ext.Action', {
                text : 'Remove Contact',
                handler : function() {
                    this.fireEvent('removeitem', this.getSelected())
                },
                scope : this
            })
        };
        var contextMenu = Ext.create('Ext.menu.Menu', {
            items : [this.actions.removeitem]
        });
        this.on({
            itemcontextmenu : function(view, rec, node, index, e) {
                e.stopEvent();
                contextMenu.showAt(e.getXY());
                return false;
            }
        });
        this.callParent(arguments);
    },
    getSelected : function() {
        var sm = this.getSelectionModel();
        var rs = sm.getSelection();
        if (rs.length) {
            return rs[0];
        }
        return null;
    }
}); 