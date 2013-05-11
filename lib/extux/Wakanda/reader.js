Ext.define('Wakanda.reader', {

    extend: 'Ext.data.reader.Json',

    //alternateClassName: 'SimplyFundraising.data.WakandaReader',

    alias: 'reader.wakanda',

    root: '__ENTITIES',

    totalProperty: '__COUNT',

    getData: function (data) {
        //  debugger;
        if (Ext.isObject(data) && !data[this.root]) {
            data = [data];
        }
        return data;
    }

});
