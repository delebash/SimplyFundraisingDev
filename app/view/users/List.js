Ext.define('SimplyFundraising.view.users.List', {
    extend : 'Ext.grid.Panel',
    xtype : 'userslist',
       store : 'Users',
    dockedItems : [{
        xtype : 'toolbar',
        dock : 'top',
        items : ['*Click to view user', {
            text : 'Add',
            handler : function() {
                Ext.ux.Router.redirect('users/add');
            }
        }]
    }],
    columns : [{
        text : 'Id',
        dataIndex : '__KEY'

    }, {
        text : 'Name',
        dataIndex : 'name'
    }, {
        text : 'Email',
        dataIndex : 'email',
        flex : 1
    }],

    initComponent : function() {
        this.addEvents('removeitem');
        this.actions = {
            removeitem : Ext.create('Ext.Action', {
                text : 'Remove User',
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
