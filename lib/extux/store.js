Ext.override(Ext.data.Store, {
    filterNew:function(record) {
        var me = this, i, association, childStore, childRecordPhantom=false;
   //      debugger;
        if( record.phantom === false && record.associations.length )
        {
            for (i = 0; i < record.associations.length; i++)
            {
                association = record.associations.get(i);
                if (association.type == 'hasOne')
                {
                    childStore = eval('record.'+association.name+'()');
                    childStore.each(function(childRecord) {
                        childRecordPhantom = childRecord.phantom === true && childRecord.isValid();
                        if( childRecordPhantom )
                        {
                            return false;
                        }
                    }, me);
                    if( childRecordPhantom )
                    {
                        break;
                    }
                }
            }
        }

        return childRecordPhantom || record.phantom === true && record.isValid();
    },
    filterUpdated: function(record) {
     //   debugger;
        var me = this, i, association, childStore, childRecordDirty=false;

        if( record.dirty === false && record.phantom === false && record.associations.length )
        {
            for (i = 0; i < record.associations.length; i++)
            {
                association = record.associations.get(i);
                if (association.type == 'hasOne')
                {
                    childStore = eval('record.'+association.name+'()');
                    childStore.each(function(childRecord) {
                        childRecordDirty = childRecord.dirty === true && childRecord.phantom !== true && childRecord.isValid();
                        if( childRecordDirty )
                        {
                            return false;
                        }
                    }, me);
                    if( childRecordDirty )
                    {
                        break;
                    }
                }
            }
        }

        return childRecordDirty || record.dirty === true && record.phantom !== true && record.isValid();
    }
});