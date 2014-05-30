'use strict';

var server = require('..')();
var test = require('tape');
var Chaps = require('chaps');
var chaps = new Chaps({
  debug: true,
  hostname: 'localhost:',
  timeout: 2000
});

test('should get a functional hapi server instance', function(t) {
  t.plan(1);

  server.route({
    method: 'GET',
    path: '/',
    config: {
      handler: function(request, reply) {
        reply.view('main');
      }
    }
  });

  server.start(function() {
    console.log('server started:', server.info.uri);
    chaps.get({
      url: server.info.port
    }, function(err, data) {
      if (err) {
        t.fail('failed to talk to test server');
      }
      server.stop(function() {
        console.log('server stopped');
      });
      t.equal(data.text, 'hello\n');
    });
  });
});
