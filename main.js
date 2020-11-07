/*
Author: Fredwuz (frederic23.mai@gmail.com)
main.js (c) 2020
Desc: main file
Created:  10/24/2020
Modified: 10/24/2020
*/

const venom = require('venom-bot')
//const wa = require('@open-wa/wa-automate');
const fs = require('fs')
var info = require('./Scripts/info')
const serien = require('./Scripts/serien')

venom
  .create(
    'main',
    (base64Qr, asciiQR) => {
      console.log(asciiQR)
      exportQR(base64Qr, 'qr.png')
    },
    (statusSession) => {
      //console.log('Status Session: ', statusSession) //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled
    },
    {
      folderNameToken: 'tokens', //folder name when saving tokens
      mkdirFolderToken: '', //folder directory tokens, just inside the venom folder, example:  { mkdirFolderToken: '/node_modules', } //will save the tokens folder in the node_modules directory
      headless: true, // Headless chrome
      devtools: false, // Open devtools by default
      useChrome: true, // If false will use Chromium instance
      debug: false, // Opens a debug session
      logQR: true, // Logs QR automatically in terminal
      browserArgs: [''], // Parameters to be added into the chrome browser instance
      disableSpins: false, // Will disable Spinnies animation, useful for containers (docker) for a better log
      disableWelcome: true, // Will disable the welcoming message which appears in the beginning
      updates: true, // Logs info updates automatically in terminal
      autoClose: 60000, // Automatically closes the venom-bot only when scanning the QR code (default 60 seconds, if you want to turn it off, assign 0 or false)
    }
  )
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
  client.onAck((ack) => {
    //  console.log(ack)
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
