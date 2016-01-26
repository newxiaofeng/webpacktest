/**
 * Created by fenghongyu on 15/8/17.
 */
var widget = require('./widget.ejs');
module.exports = {
    alert: function(msg) {
        window.alert(msg);
    },

    getTemplate: function() {
        return widget();
    }
}
