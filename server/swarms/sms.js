/**
 *
 * @author Catalin Manolescu <cc.manolescu@gmail.com>
 */

var swarmDescription =
{
    meta:{
        name:"sms.js",
        debug:false
    },
    vars:{

    },
    start:function(phone, message){
        this.phone = phone;
        this.message = message;
        this.swarm('sendMessage');
    },
    sendMessage:{
        node:"SMSAdapter",
        code: function() {
            sendMessage(this.phone, this.message);
        }
    }
};

swarmDescription;
