Ext.define('SimplyFundraising.controller.Users', {
    extend : 'Ext.app.Controller',
    stores : ['Users'],
    views : ['users.List', 'users.Add', 'users.Edit'],

    init : function() {

        this.control({

            'userslist' : {
                itemclick : this.onListItemClick,
                removeitem : this.removeUser
            },
            'usersedit' : {
                afterrender : this.onEditAfterRender
            },
            'usersedit button[action=save]' : {
                click : this.updateUser
            },
            // 'userlist > toolbar > button[action=create]': {
            // click: this.onCreateUser
            // },
        });
    },

    list : function() {
        // debugger;
        // this.getUsersStore().load()
        var users = Ext.getStore('Users')
        users.load();
        //  users.proxy.api.read = users.proxy.api.read + '(17)'
        //users.proxy.extraParams = { $filter : "'ID=1'", dan : 'abc' };

    },
    add : function(params) {
        // alert('add')
        this.addnew = true
    },
    edit : function(params) {
        this.userId = parseInt(params.id, 10);
        this.addnew = false
    },

    onListItemClick : function(grid, record) {

        Ext.ux.Router.redirect('users/' + record.getId() + '/edit');
    },
    removeUser : function(user) {
        Ext.Msg.confirm('Remove User', 'Are you sure?', function(button) {
            if (button == 'yes') {
                this.getUsersStore().remove(user);
            }
        }, this);
    },
    updateUser : function(button) {

        // var win = button.up('window'),
        form = button.up('form'), record = form.getRecord(), values = form.getValues(), store = this.getUsersStore();
        if (form.getForm().isValid()) {
            if (this.addnew == true) {
                store.add(values);
            } else {
                record.set(values);
            }
            Ext.ux.Router.redirect('users');

        }
    },
    onEditAfterRender : function(editView) {
        if (!this.addnew) {
            var user = Ext.getStore('Users').findRecord('__KEY', this.userId)
            if (user) {
                //     debugger;
                editView.loadRecord(user);
            }
        }
        //     debugger;
        //  var user = Ext.getStore('Users').getById(this.userId);
        //  var id = 9; //an example record id

        //var myuser = user.getById(this.userId).
        //debugger;
        // user.load({
        // params: {
        // $filter: 'ID=' + this.userId
        // },
        // scope:this,
        // callback: function(records, operation, success){
        // if(success){
        // var contact = records[0];
        // debugger;
        // //do something with the contact record
        // }
        // }
        // });
        // // delete this.userId;

    }
});
