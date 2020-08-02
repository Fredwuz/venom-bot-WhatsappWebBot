const fs = require('fs')
const nrc = require('node-run-cmd')
const mime = require('mime-types')

exports.sauce = async function (message) {
const buffer = await gclient.decryptFile(message);
const fileName = `temp${message.from}.${mime.extension(message.mimetype)}`; 
fs.writeFile(fileName, buffer, function (err) {})
gclient.sendText(message.from, "Suche Sauce");

await nrc.run("curl -F \"image=@"+'temp'+message.from+".jpeg\""+" https://trace.moe/api/search", { onData: dataCallback})
try {
  daten = JSON.parse(daten);
} catch (error) {
  console.log("keine Sauce gefunden")
  gclient.sendText(message.from, "Error keine Sauce gefunden");
  await nrc.run('rm temp'+message.from+".jpeg")
  return
}

var anime = ""
for (let index = 1; index < daten.docs.length; index++) {

  var anime = anime + index + ". Ergebnis " + daten.docs[index].anime + "\n"
  
}
console.log(anime)
gclient.sendText(message.from, anime);
}

var dataCallback = function(data) {
    daten = data 
      }