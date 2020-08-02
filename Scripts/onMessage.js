const reddit = require('./reddit')
const poll = require('./poll')
const yt = require('./yt')
const fs = require('fs')
const readline = require('readline')
const help = require('./help')
const sendSticker = require('./sendSticker')
const config = require('./config.json')
const ban  = require('./ban')
const sauce = require('./sauce')




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
if (message.isMedia) {
  if (allSticker.indexOf(message.from) > -1) {
    message.caption = "Sticker"
}
}

if (message.body.toLowerCase().startsWith("allsticker")) {
  console.log(allSticker)
  if (message.body.substring(message.body.indexOf(" ") + 1) == "on") {
  allSticker.push(message.from)
  gclient.sendText(message.from, 'All Sticker function turned on');
  } else if (message.body.substring(message.body.indexOf(" ") + 1) == "off") {
    for (let i = 0; i < allSticker.length; i++) {
      if (allSticker[i] == message.from) {
        allSticker.splice(i, 1);
      }
    }
    gclient.sendText(message.from, 'All Sticker function turned off');
    
  } else {

    gclient.sendText(message.from, 'Wrong Parameter');
  }
}

if (message.body === 'Hi') {

    gclient.sendText(message.from, '👋 Hello!');

  }


if (message.body.toLowerCase().startsWith('!ban') | message.body.toLowerCase().startsWith('ban') && message.author == config.Admin+"@c.us") {

ban.ban(message)

}

if (message.body.toLowerCase().startsWith('!unban') | message.body.toLowerCase().startsWith('unban') && message.author == config.Admin+"@c.us") {

  ban.unban(message)

}

if (message.body.toLowerCase() === 'ping') {
  gclient.sendText(message.from, 'Pong')
}  

if (message.body.endsWith('?') && message.isGroupMsg == false) {
   if (Math.round(Math.random()) == 1) {
    gclient.sendText(message.from, 'Yes')
  } else {
    gclient.sendText(message.from, 'No')
  } 
}

if (message.body == "🤔") {
  if (Math.round(Math.random()) == 1) {
    gclient.sendText(message.from, 'Yes')
  } else {
    gclient.sendText(message.from, 'No')
  } 
}

if (message.body.toLowerCase().startsWith('!poll') || message.body.toLowerCase().startsWith('poll')) {

  //console.log(message.chat.groupMetadata.creation)
  gclient.sendText(message.from, 'Still in Testing')
  // console.log(polllist)
  // polllist.push(message.chatId)
  
}

if (message.body.toLowerCase().startsWith('help') || message.body.toLowerCase().startsWith('!help')) {

  help.help(message)

}

if (message.body.startsWith('test')) {

/*   console.log(message)
  members = await gclient.getGroupMembersIds(message.chat.id)
  for (let index = 0; index < members.length; index++) {
    console.log(members[index].user)
  }  */
}


if (message.isMedia & message.caption == "Sticker") {


sendSticker.sendSticker(message)

}




if (message.body.toLowerCase().startsWith('!ytdl') || message.body.toLowerCase().startsWith('ytdl')) {

  gclient.sendText(message.from, 'currently disabled')
//  yt.mp4(message)

}


if (message.body.toLowerCase().startsWith('!ytmp3') || message.body.toLowerCase().startsWith('ytmp3')) {

  gclient.sendText(message.from, 'currently disabled')
//  yt.mp3(message)

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

  sauce.sauce(message)

}



delete require.cache[require.resolve('./sendSticker')]
delete require.cache[require.resolve('./reddit')]
delete require.cache[require.resolve('./poll')]
delete require.cache[require.resolve('./yt')]
delete require.cache[require.resolve('./help')]
delete require.cache[require.resolve('./sauce')]
delete require.cache[require.resolve('./config.json')]
}







