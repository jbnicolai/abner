'use strict';

var Hapi = require('hapi');
var clc = require('cli-color');
var moment = require('moment');
var _ = require('underscore');
var ejs = require('ejs');
var path = require('path');

module.exports = function server(opts) {

  opts = _.defaults(opts || {}, {
    // default values
    port: 9615,
    hostname: 'localhost',
    templates: path.dirname(module.parent.filename)
  });

  var server = new Hapi.Server(opts.hostname, opts.port, {
    cors: true,
    debug: {
      request: ['error']
    },
    views: {
      isCached: false,
      path: opts.templates,
      engines: {
        ejs: {
          module: ejs
        }
      }
    }
  });

  server.on('request', function(request, event) {
    if (event.data && event.data.url) {
      if (event.data.url === '/favicon.ico') {
        return;
      }
      console.log(clc.cyan(moment().format('YYYY-MM-DD HH:mm:ss') + ' ' + event.data.url));
    }
  });

  return server;
};
