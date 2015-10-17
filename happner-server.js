var Mesh = require('happner');

Mesh.start(require('./config.js'), function(err) {

  if (err) {
    console.log(err);
    process.exit(err.code || 1);
  }

  console.log('READY');
  
});