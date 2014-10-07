'use strict';


var cssConnector = require('css-connector'),
    render       = require('./js/render'),
    pkg          = require('./package.json');

module.exports = cssConnector(render, pkg.name);