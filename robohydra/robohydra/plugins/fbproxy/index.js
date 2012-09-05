var heads = require('robohydra').heads,
    RoboHydraHead = heads.RoboHydraHead,
    RoboHydraHeadWatchdog = heads.RoboHydraHeadWatchdog,
    RoboHydraHeadProxy = heads.RoboHydraHeadProxy;



exports.getBodyParts = function(config) {
  var projectPath = config.rootpath || '.';

  function output(content) {
      if (content !== undefined) {
        console.log("-----------------------------");
        console.log(content);
        console.log("-----------------------------");
      }
  }

  return {
    heads: [
      new RoboHydraHead({
        name: "filterfbauthtoken",
        path: '/.*',
        handler: function (req, res, next) {
          var access_token = req.url.match(/access_token=(.*)$/)[1];
          req.url = req.url.replace(access_token, access_token + '#_=_');

          next(req, res);
        }
      }),

      new RoboHydraHeadWatchdog({
          // Note that res.body is always uncompressed, even if
          // the original response was compressed. If you really
          // want the original body, try "res.rawBody".
          watcher: function(req, res) { },
          reporter: function(req, res) {
              output("Response for request to " + req.url + " contained: \n\r" + res.body.toString());
          }
      }),

      new RoboHydraHeadProxy({
          name: 'proxy',
          mountPath: '/fb/graph',
          proxyTo: 'https://graph.facebook.com/',
          setHostHeader: true
        })
    ]
  };
};