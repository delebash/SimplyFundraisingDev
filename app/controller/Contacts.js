Ext.define('SimplyFundraising.controller.Contacts', {
    extend: 'Ext.app.Controller',
    models: ['Contact'],


    views: ['contacts.List', 'contacts.Edit'],
    init: function () {
        this.control({
            'contactslist': {
                itemdblclick: this.editContact,
                removeitem: this.removeContact
            },
            'contactslist > toolbar > button[action=create]': {
                click: this.onCreateContact
            },
            // 'contactsadd button[action=save]': {
            // click: this.doCreateContact
            // },
            'contactsedit button[action=save]': {
                click: this.updateContact
            }
        });
    },
    list: function () {
        // var mystore = Ext.StoreMgr.lookup('Contacts');
        //   var myContact = this.getModel('Contact')
        //   var User = this.getModel('User');

        //debugger;
        //  var mystore =  Ext.create('SimplyFundraising.store.Contacts')

        //  var myContact = this.getModel('Contact').create()
        //   var bb =  myContact.create()

        // var rr = Ext.create('SimplyFundraising.model.Contact')
        var mystore = Ext.create('SimplyFundraising.store.Contacts')
        debugger;
        //  mystore.proxy.api.read = users.proxy.api.read + '(17)'
        //mystore.proxy.extraParams = { $expand: 'ContactType'};
        mystore.load();
        //var test = Ext.ModelManager.getModel('Contact');

        // //var User = this.getContactModel();
        // User.load(258, {
        // success: function(user) {
        // console.log("Loaded user 258: " + user.get('lastName'));
        // }
// });
    },
    editContact: function (grid, record) {
        var view = Ext.widget('contactsedit');
        view.down('form').loadRecord(record);
        this.addnew = false
    },
    removeContact: function (Contact) {
        Ext.Msg.confirm('Remove Contact ' + Contact.data.lastName, 'Are you sure?', function (button) {
            if (button == 'yes') {
                this.getContactsStore().remove(Contact);
            }
        }, this);
    },
    onCreateContact: function () {
        var view = Ext.widget('contactsedit');
        this.addnew = true
    },
    // doCreateContact: function (button) {
    // var win = button.up('window'),
    // form = win.down('form'),
    // values = form.getValues(),
    // store = this.getContactsStore();
    // if (form.getForm().isValid()) {
    // store.add(values);
    // win.close();
    // }
    // },
    updateContact: function (button) {
        var win = button.up('window'), form = win.down('form'), record = form.getRecord(), values = form.getValues(), store = this.getContactsStore();
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
