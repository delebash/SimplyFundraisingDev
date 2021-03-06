Ext.define('SimplyFundraising.controller.Contacts', {
    extend: 'Ext.app.Controller',


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

        var mystore = this.getStore('Contacts')
        mystore.proxy.extraParams = { $expand: 'ContactType'};
        mystore.load({
            params: {
            },
            callback: function(r,options,success) {
                //       debugger;
            } //callback
        }); //store.load

// mystore.proxy.extraParams = { $expand: 'ContactType'};
//        var User = this.getContactModel();
//        User.load(258, {
//            success: function (user) {
//                console.log("Loaded user 258: " + user.get('lastName'));
//            }
//        });
    },
    editContact: function (grid, record) {
        var store = this.getStore('ContactTypes');
        store.load({
            params: {
            },
            callback: function(r,options,success) {
                //    debugger;
            } //callback
        }); //store.load

        var view = Ext.widget('contactsedit');
        var form =  view.down('form')
        var combo = form.down('combobox');
     //           debugger;
        // combo.store.add({id:3, name:'expert wanna-be'});
        form.loadRecord(record);
        var mykey = record.getContactType().data.__KEY
     //   debugger;
        combo.setValue(mykey)
//        form.on('dirtychange', function(basic, dirty, eOpts){
//            debugger;
//        });
        //
        //  debugger;
        // form.loadRecord(record.getContactType());
        //  debugger;
        //  form.loadRecord(records.baseModel());
        //form.loadRecords(records.getAt(0)); this will load your form with id & name
        //     form.loadRecords(records.getAt(0).getterName();
        //form.loadRecord(record);
       // this.addnew = false
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
        var win = button.up('window'),
            form = win.down('form'),
            record = form.getRecord(),
            values = form.getValues(false, false, false, true),
            ct = record.getContactType()
            store =  this.getStore('Contacts')
        debugger;
        if (form.getForm().isValid()) {
            if (this.addnew == true) {
                store.add(values);
            } else {
                record.set(values);
                ct.set(values)
            }
            store.sync();
            win.close();
        }
    }
});
