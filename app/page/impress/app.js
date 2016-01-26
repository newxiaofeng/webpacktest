/**
 * Created by fenghongyu on 15/8/13.
 */
import {} from'normalize.css';
import {} from './app.less';
import util from 'util';
import _ from 'lodash';

function setBackgroundColor($dom) {
    var rgb = util.hexToRgb(util.randomColor());
    $dom.css('background-color', 'rgba('+rgb.r+','+rgb.g+','+rgb.b+',.2)');
}

function init() {
    var template = require('./app.ejs')();
    $('body').append(template);
    impress().init();

    var asyncLoad = _.once(function(template) {
        $('#impress').find('.async-load').append(template);
    });

    $('#impress').on('impress:stepenter', function(e, data) {
        setBackgroundColor($(e.target));
    })
    .find('.async').on('click', function(e) {
        require.ensure([], function() {
            var widget = require('../../widget/impress/widget?name=widget');
            widget.alert('异步');
            asyncLoad(widget.getTemplate());
        });
    });
}
init();

