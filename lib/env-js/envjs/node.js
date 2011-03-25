process.env.TZ = 'America/Los_Angeles';

require('./platform/node');
Envjs.eventLoop = function() {}; // disabled for clean shutdown

require('./window');
new Window(__this__); // initialize a blank window
