var SecretStack = require('secret-stack')
var SSB = require('ssb-db')
var pull = require('pull-stream')

//create a sbot with default caps. these can be overridden again when you call create.
var createSbot =
  SecretStack({ caps: require('./caps') })
    .use(SSB)
    .use(require('ssb-gossip'))
    .use(require('ssb-replicate'))
    .use(require('ssb-ebt'))
    .use(require('ssb-ws'))

var config = require('ssb-config/inject')(null, {
    seeds: [
      //my pub
      'ws://128.199.132.182:9009~shs:DTNmX+4SjsgZ7xyDh5xxmNtFqa6pWi5Qtw7cE8aR9TQ='
    ],
    timers: {
      inactivity: -1, handshake: 30000
    },
    connections: {
      //disable the local server, since we have no way to receive connections
      incoming: {},
      outgoing: {
//        net: [{transform: 'shs'}],
        ws: [{transform: 'shs'}],
//        tunnel: [{transform: 'shs'}]
      }
    },
    gossip: {
      pub: false //don't look for pub announcements
    },
    replicate: {
      legacy: false //don't do legacy replication (only ebt)
    },
    ebt: { logging: true }
})

var sbot = createSbot(config)

//publish a test message
/*
  sbot.publish({
    type:'test', text: 'it worked!!!'
  }, function (err, msg) {
    if(err) throw err
    console.log(msg)
  })
*/

//request feed of my pub
sbot.replicate.request({
  id: "@DTNmX+4SjsgZ7xyDh5xxmNtFqa6pWi5Qtw7cE8aR9TQ=.ed25519",
  replicate: true
})

//monitor messages received
pull(
  sbot.createLogStream({live: true}),
  pull.drain(function (e) {
    console.log(e)
  })
)

//connect to my pub
sbot.gossip.connect('@DTNmX+4SjsgZ7xyDh5xxmNtFqa6pWi5Qtw7cE8aR9TQ=.ed25519', function (err, rpc) {
  if(err) console.error(err)
  else console.error("CONNECTED!")
  RPC = rpc
})

