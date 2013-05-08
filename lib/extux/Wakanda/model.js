Ext.define('Wakanda.Model', {

    extend: 'Ext.data.Model',

    idProperty: '__KEY',

    stampProperty: '__STAMP',

    defaultProxyType: 'wakanda',

   // onClassExtended: function(cls, data) {
         //     debugger;
//        var parts = data.$className.split('.');
//        var entity = parts[2]
//        var catalog = this.prototype.getCatalog(entity),
//            attributes = catalog.attributes;
//        for (var i = 0, l = attributes.length; i < l; i++) {
//            if (attributes[i].name === 'ID') {
//                attributes[i].persist = false;
//            }
//        }
//        attributes.push({name: this.prototype.idProperty});
//        attributes.push({name: this.prototype.stampProperty});
//       // data.fields = attributes;
//      //  debugger;
//        //this.setFields(data.fields)
//      // var mymodel = Ext.ModelManager.getModel(data.$className);
//        debugger;
//        //this.superclass.superclass.$onExtended.apply(this, arguments);
 //   },

    getCatalog: function(className) {
        var catalog;
        Ext.Ajax.request({
            async: false,
            url: 'http://127.0.0.1:8081/cors/$catalog/' + className,
            success: function(response) {
                catalog = Ext.decode(response.responseText);
            }
        });
        return catalog;
    }

});
