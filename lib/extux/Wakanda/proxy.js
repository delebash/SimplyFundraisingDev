Ext.define('Wakanda.proxy', {
    requires: ['Wakanda.reader', 'Wakanda.writer'],
    extend: 'Ext.data.proxy.Rest',

    // alternateClassName: 'SimplyFundraising.data.WakandaProxy',

    alias: 'proxy.wakanda',

    sortParam: '$orderby',

    filterParam: '$filter',

    startParam: '$skip',

    groupParam: '$group',

    limitParam: '$top',

    //  groupersParam: '$group',

    reader: 'wakanda',

    writer: 'wakanda',

    actionMethods: {
        create: 'POST',
        read: 'GET',
        update: 'POST',
        destroy: 'POST'
    },

    buildUrl: function (request) {
        //   debugger;
        // var modelName = this.model.modelName,
        var parts = this.model.modelName.split('.');
        var modelName = parts[2]

        operation = request.operation,
            records = operation.records || [],
            record = records[0],
            id = record ? record.getId() : operation.id,
            url = 'http://127.0.0.1:8081/cors/' + modelName,
            action = request.action;

        if (this.appendId && id && (action === 'read' || action === 'destroy')) {
            url += '(' + id + ')';
        }

        request.url = url;

        // console.log("buildUrl", this, arguments, request.url);


        if (action !== 'read') {
            if (action === 'create') action = 'update';
            else if (action === 'destroy') action = 'delete';
            url = Ext.urlAppend(url, '$method=' + action);
        }

        if (this.noCache) {
            url = Ext.urlAppend(url, Ext.String.format("{0}={1}", this.cacheString, Ext.Date.now()));
        }

        return url;
    },

    encodeSorters: function (sorters) {
        var min = [],
            length = sorters.length,
            i = 0, sort = '';

        for (; i < length; i++) {
            sort += sorters[i].property + ' ' + sorters[i].direction + ' ';
        }

        return sort;
    },

    encodeFilters: function (filters) {
        var min = [],
            length = filters.length,
            i = 0, filter = '';

        for (; i < length; i++) {
            filter += filters[i].property + ' eq ' + filters[i].value + '@ ';
        }
        return filter;
    }

});
