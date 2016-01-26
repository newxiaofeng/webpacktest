/**
 * Created by fenghongyu on 15/8/18.
 */
module.exports = {
    randomColor: function() {
        return Math.random().toString(16).substr(2,6);
    },
    hexToRgb: function(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    },

};
