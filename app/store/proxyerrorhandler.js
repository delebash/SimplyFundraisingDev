Ext.define("SimplyFundraising.lib.StoreUtils", {
    singleton : true,

    msg01 : "Application not has been able to communicate with the server.<br/>",
    msg02 : "This occurred when trying to ",
    msg03 : " data.<br/>",
    msg04 : "Please try again later.<br/>",
    msg05 : "Please reload your browser.",
    msg10 : "Unexpected error from server (",
    msg11 : ").<br/>",
    msg20 : "Your session with the server has expired.",
    msg30 : "An error occurred when you attempted to ",
    msg40 : "It is recommended to refresh data.",

    exception : function(proxy, response, operation) {
   
        var action = "";
        if (operation) {
            switch (operation.action) {
                case "read":
                    action = "read";
                    break;
                case "create":
                case "update":
                    action = "save";
                    break;
                case "destroy":
                    action = "delete";
                    break;
                default:
                    action = operation.action;
            }
        }

        var msg = "";
        var fn = this.reload;
        // Error -- communiction
        if (response.status == 0) {
            msg = this.msg01 + this.msg02 + action + this.msg03 + this.msg04 + this.msg05;
        } else if (response.status != 200) {
            // Error -- unexpected
            msg = this.msg10 + response.status + this.msg11 + '<br/>' + response.responseText + '<br/>'+ this.msg02 + action + this.msg03 + this.msg04 + this.msg05;
        } else if (operation.error == "NOT_SIGNED") {
            // Session expired
            msg = this.msg20;
        } else {
            // Error attempting to
            msg = this.msg30 + action + ":<br/>" + operation.error + "</br>" + this.msg40;
            fn = null;
        }
        Ext.Msg.show({
            title : "Error",
            msg : msg,
            icon : Ext.Msg.ERROR,
            buttons : Ext.Msg.OK,
            fn : fn
        });
    },
    reload : function() {
    //    location.reload();
    }
})
