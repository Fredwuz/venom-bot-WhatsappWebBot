const venom = require('venom-bot')
const fs = require('fs')
var info = require('./info')

venom.create().then((client) => start(client));


async function start(client) {
  global.gclient = client
  global.Stimmen = [[]]
  global.amdownloaden = []
  global.sendingSticker = []
  global.queueSticker = []
  global.queuemp3 = []
  global.queuemp4 = []
  global.polllist = []
  global.allSticker = []
  

  client.onAddedToGroup(chatEvent => {

  var onAddedToGroup = require('./onAddedToGroup')
  onAddedToGroup.AddedToGroup(chatEvent)
  delete require.cache[require.resolve('./onAddedToGroup')];

  });


  client.onMessage(message => {

  var onMessage = require('./onMessage')
  var poll = require('./poll')
  onMessage.message(message)
  poll.poll(message)
  delete require.cache[require.resolve('./onMessage')];
  delete require.cache[require.resolve('./poll')]

  });
  info.info()


}





function Sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}
