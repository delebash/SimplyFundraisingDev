 afterRequest: function (request, success)
{
 
if (request.action == 'read') {
this.readCallback(request);
}
 
else if (request.action == 'create') {
this.createCallback(request);
}
 
else if (request.action == 'update') {
this.updateCallback(request);
}
 
else if (request.action == 'destroy') {
this.deleteCallback(request);
}
},
 
//After Albums fetched
 
readCallback: function (request)
{
if (!request.operation.success)
{
...
}
},
 
//After A record/Album created
 
createCallback: function (request)
{
if (!request.operation.success)
{
...
}
},
 
//After Album updated
 
updateCallback: function (request)
{
if (!request.operation.success)
{
...
}
},
 
//After a record deleted
 
deleteCallback: function (request)
{
if (!request.operation.success)
{
...
}
}
}