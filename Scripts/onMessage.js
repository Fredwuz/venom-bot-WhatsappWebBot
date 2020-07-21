const reddit = require('./reddit')
const poll = require('./poll')
const yt = require('./yt')
const fs = require('fs')
const mime = require('mime-types')
const nrc = require('node-run-cmd')
const readline = require('readline')
const help = require('./help')



exports.message = async function (message) {

const bans = fs.createReadStream('bans.txt');
  
const rl = readline.createInterface({
  input: bans,
  output: process.stdout
});
  
for await (const line of rl) {
  if(line.includes(message.from+' '+message.author)) {
  //  gclient.sendText(message.from, 'Banned');
  return
  }
}


if (message.body === 'Hi') {
    gclient.sendText(message.from, '👋 Hallo I bims Jürgen M.!');
  }

if (message.body.toLowerCase().startsWith('!ban') || message.body.toLowerCase().startsWith('ban') && message.author == "yourNumber") {
  bannedNumber = message.body.substring(message.body.indexOf("@") + 1)
  fs.appendFileSync('bans.txt', message.from+' '+bannedNumber+"@c.us\n");
  gclient.sendMentioned(message.from, 'Banned @'+bannedNumber+'!', [bannedNumber]);

}
if (message.body.toLowerCase().startsWith('!unban') || message.body.toLowerCase().startsWith('unban') && message.author == "yourNumber") {
  unBannedNumber = message.body.substring(message.body.indexOf("@") + 1)
  fs.readFile('bans.txt', {encoding: 'utf-8'}, function(err, data) {
      if (err) throw error;
  
      let dataArray = data.split('\n'); 
      const searchKeyword = message.from+' '+unBannedNumber+"@c.us"; 
      let lastIndex = -1; 
  
      for (let index=0; index<dataArray.length; index++) {
          if (dataArray[index].includes(searchKeyword)) { 
              lastIndex = index; 
              break; 
          }
      }
      dataArray.splice(lastIndex, 1);
      const updatedData = dataArray.join('\n');
      fs.writeFile('bans.txt', updatedData, (err) => {
          if (err) throw err;
          gclient.sendMentioned(message.from, 'Unbanned @'+unBannedNumber+'!', [unBannedNumber]);
          
      });
  
  });



}
if (message.body.toLowerCase() === 'ping') {
  gclient.sendText(message.from, 'Pong')
}  

if (message.body.endsWith('?')) {
   if (Math.round(Math.random()) == 1) {
    gclient.sendText(message.from, 'Ja')
  } else {
    gclient.sendText(message.from, 'Nein')
  } 
}

if (message.body.toLowerCase().startsWith('!poll') || message.body.toLowerCase().startsWith('poll')) {

  //console.log(message.chat.groupMetadata.creation)
  gclient.sendText(message.from, 'Still in Testing')
  console.log(polllist)
  polllist.push(message.chatId)
  

}
if (message.body.toLowerCase().startsWith('help') || message.body.toLowerCase().startsWith('!help')) {

  help.help(message)

}



if (message.isMedia & message.caption === "Sticker") {
 // console.log(message)
    const buffer = await gclient.downloadFile(message);
    const fileName = `temp${message.from}.${mime.extension(message.mimetype)}`; 
  fs.writeFile(fileName, buffer, function (err) {})

 fs.rename('temp'+message.from+'.jpeg', 'temp'+message.from+'.jpg', (err) => {
    if(err) throw err;
    else{
        console.log("File Renamed!")            
        gclient.sendImageAsSticker(message.from, 'temp'+message.from+'.jpg');
    }
 })
}




if (message.body.toLowerCase().startsWith('!ytdl') || message.body.toLowerCase().startsWith('ytdl')) {

  yt.mp4(message)

}


if (message.body.toLowerCase().startsWith('!ytmp3') || message.body.toLowerCase().startsWith('ytmp3')) {
  
  yt.mp3(message)

}


if (message.body.toLowerCase().startsWith("!meme") || message.body.toLowerCase().startsWith("meme")) {

    var anzahlmemes = message.body.slice(5);

  if (anzahlmemes >0 && anzahlmemes <=50) {

    reddit.reddit("",anzahlmemes,message)

  } else {
    
    gclient.sendText(message.from, 'format is \"meme count\"(max 50)');

  }
}

if (message.body.toLowerCase().startsWith('hentai') || message.body.toLowerCase().startsWith('!hentai')) {

    var anzahlmemes = message.body.slice(7);

  if (anzahlmemes >0 && anzahlmemes <=50) {

    reddit.reddit("hentai/",anzahlmemes,message)

  } else {
    
    gclient.sendText(message.from, 'format is \"hentai count\"(max 50)');

  }
}

if (message.body.toLowerCase().startsWith('reddit') || message.body.toLowerCase().startsWith('!reddit')) {

    var num = message.body.replace(/^\D+|\D.*$/g, "")
    var subReddit = message.body.substring(message.body.lastIndexOf(" ") + 1)+"/"

  if (num >0 && num <=50) {

    reddit.reddit(subReddit,num,message)

  } else {
    
    gclient.sendText(message.from, 'format is \"reddit count Subreddit\"(max 50)');

  } 
}

if (message.isMedia & message.caption === "Sauce") {

const buffer = await gclient.downloadFile(message);
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
await nrc.run('rm temp'+message.from+".jpeg")





delete require.cache[require.resolve('./reddit')]
delete require.cache[require.resolve('./poll')]
delete require.cache[require.resolve('./yt')]
delete require.cache[require.resolve('./help')]
}


var dataCallback = function(data) {
  daten = data 
    }




