const venom = require('venom-bot')
//const wa = require('@open-wa/wa-automate');
const fs = require('fs')
var info = require('./Scripts/info')
const serien = require('./Scripts/serien')

venom
  .create('main', (base64Qr, asciiQR) => {
    console.log(asciiQR)
    exportQR(base64Qr, 'qr.png')
  })
  .then((client) => start(client))

async function start(client) {
  global.gclient = client
  global.stimmen = []
  global.choices = []
  global.amdownloaden = []
  global.sendingSticker = []
  global.sendingAnimatedSticker = []
  global.queueSticker = []
  global.queueAnimatedSticker = []
  global.queuemp3 = []
  global.queuemp4 = []
  global.polllist = []
  global.allSticker = []

  client.onAddedToGroup((chatEvent) => {
    var onAddedToGroup = require('./Scripts/onAddedToGroup')
    onAddedToGroup.AddedToGroup(chatEvent)
    delete require.cache[require.resolve('./onAddedToGroup')]
  })

  client.onMessage((message) => {
    client.sendSeen(message.from)
    var onMessage = require('./Scripts/onMessage')
    var poll = require('./Scripts/poll')
    onMessage.message(message)
    poll.poll(message)
    delete require.cache[require.resolve('./Scripts/onMessage')]
    delete require.cache[require.resolve('./Scripts/poll')]
  })
  info.info()
  serien.serien()
}

function exportQR(qrCode, path) {
  qrCode = qrCode.replace('data:image/png;base64,', '')
  const imageBuffer = Buffer.from(qrCode, 'base64')
  fs.writeFileSync(path, imageBuffer)
}

function Sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}
