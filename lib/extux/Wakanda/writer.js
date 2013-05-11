Ext.define('Wakanda.writer', {

    extend: 'Ext.data.writer.Json',

   // alternateClassName: 'SimplyFundraising.data.WakandaWriter',

    alias: 'writer.wakanda',

    writeAllFields: false,

    getRecordData: function(record,operation) {
        var isPhantom = record.phantom === true,
            writeAll = this.writeAllFields || isPhantom,
            nameProperty = this.nameProperty,
            fields = record.fields,
            data = {},
            changes,
            name,
            field,
            key;

        if (writeAll) {
            // console.log("getRecordData1", this, arguments);
            fields.each(function(field){
                if (field.persist) {
                    debugger;
                    name = field[nameProperty] || field.name;
                    data[name] = record.get(field.name);
                } else {

                }

            });
        } else {
            changes = record.getChanges();
            debugger;
            // console.log("getRecordData2", this, arguments, changes);
            for (key in changes) {
                if (changes.hasOwnProperty(key)) {
                    field = fields.get(key);
                    name = field[nameProperty] || field.name;
                    data[name] = changes[key];
                }
            }
            if (!isPhantom) {
                debugger;

                data[record.idProperty] = record.getId();
                if(operation.action !== 'destroy'){
                data[record.stampProperty] = record.get(record.stampProperty);
                }
            }
        }
        return {'__ENTITIES': [data]};
    }

});