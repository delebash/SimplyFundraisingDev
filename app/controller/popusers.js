Ext.define('SimplyFundraising.controller.popusers', {
    extend: 'Ext.app.Controller',
    stores: ['Users'],
    views: ['popusers.List'],
    init: function () {
        this.control({
            'popuserslist': {
                itemdblclick: this.editUser,
                removeitem: this.removeUser
            },
            'popuserslist > toolbar > button[action=create]': {
                click: this.onCreateUser
            },
            // 'popusersadd button[action=save]': {
            // click: this.doCreateUser
            // },
            'popusersedit button[action=save]': {
                click: this.updateUser
            }
        });
    },
    list: function () {
        var users = Ext.getStore('Users')
        users.load();
    },
    editUser: function (grid, record) {
        var view = Ext.widget('popusersedit');
        view.down('form').loadRecord(record);
        this.addnew = false
    },
    removeUser: function (user) {
        Ext.Msg.confirm('Remove User ' + user.data.name, 'Are you sure?', function (button) {
            if (button == 'yes') {
                this.getUsersStore().remove(user);
            }
        }, this);
    },
    onCreateUser: function () {
        var view = Ext.widget('popusersedit');
        this.addnew = true
    },
    // doCreateUser: function (button) {
    // var win = button.up('window'),
    // form = win.down('form'),
    // values = form.getValues(),
    // store = this.getUsersStore();
    // if (form.getForm().isValid()) {
    // store.add(values);
    // win.close();
    // }
    // },
    updateUser: function (button) {
        var win = button.up('window'), form = win.down('form'), record = form.getRecord(), values = form.getValues(), store = this.getUsersStore();
        if (form.getForm().isValid()) {
            if (this.addnew == true) {
                store.add(values);
            } else {
                record.set(values);
            }
            win.close();
        }
    }
}); 