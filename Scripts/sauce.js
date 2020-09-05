const fs = require('fs')
const nrc = require('node-run-cmd')
const mime = require('mime-types')
const malScraper = require('mal-scraper')

exports.sauce = async function (message) {
  const buffer = await gclient.decryptFile(message)
  const fileName = `temp${message.from}.${mime.extension(message.mimetype)}`
  fs.writeFile(fileName, buffer, function (err) {})
  gclient.sendText(message.from, 'Searching Sauce')

  await nrc.run('curl -F "image=@' + 'temp' + message.from + '.jpeg"' + ' https://trace.moe/api/search', { onData: dataCallback })
  try {
    daten = JSON.parse(daten)
  } catch (error) {
    // console.log('keine Sauce gefunden')
    await gclient.sendText(message.from, 'Error no sauce found')
    await nrc.run('rm temp' + message.from + '.jpeg')
    return
  }

  var anime = ''
  for (let index = 1; index < daten.docs.length; index++) {
    const MAL = await malScraper.getInfoFromName(daten.docs[index].anime)
    var anime = anime + index + '. result ' + daten.docs[index].anime + ' ' + MAL.url + '\n'
  }
  console.log(anime)
  gclient.sendText(message.from, anime)
  await nrc.run('rm temp' + message.from + '.jpeg')
}

var dataCallback = function (data) {
  daten = data
}
