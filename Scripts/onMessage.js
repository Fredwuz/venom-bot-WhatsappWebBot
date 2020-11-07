/*
Author: Fredwuz (frederic23.mai@gmail.com)
onMessage.js (c) 2020
Desc: Message handling
Created:  10/24/2020
Modified: 11/7/2020
*/

const reddit = require('./reddit')
const poll = require('./poll')
const yt = require('./yt')
const fs = require('fs')
const axios = require('axios')
const readline = require('readline')
const help = require('./help')
const sendSticker = require('./sendSticker')
const config = require('./config.json')
const ban = require('./ban')
const sauce = require('./sauce')
const whostreams = require('./whostreams')
const kahoot = require('./kahoot')
const nhentai = require('./nhentai')
const Danbooru = require('danbooru')

const booru = new Danbooru()

exports.message = async function (message) {
  // console.log(message)
  //fs.appendFileSync('test.txt', util.inspect(message, { showHidden: false, depth: null }))

  if (message.filehash == 'wSG5psgQhfO0WE6jDtnVr3R04IDpSYbpWFSWyrQfpyg=') {
    await gclient.sendText(message.from, 'Ohh you want to challenge *ME*? The mighty *JÜRGEN M.*!')
    await Sleep(2000)
    await gclient.sendText(message.from, String(fs.readFileSync('everyclone.txt', 'utf8')))
  }

  const bans = fs.createReadStream('bans.txt')

  const rl = readline.createInterface({
    input: bans,
    output: process.stdout,
  })

  for await (const line of rl) {
    if (line.includes(message.from + ' ' + message.author)) {
      //  gclient.sendText(message.from, 'Banned');
      return
    }
  }

  if (message.isMedia) {
    if (allSticker.indexOf(message.from) > -1) {
      message.caption = 'Sticker'
    }
  }

  if (message.body.toLowerCase().startsWith('allsticker')) {
    if (message.isGroupMsg) {
      gclient.sendText(message.from, "All Sticker function can't be used in groups")
      return
    }
    console.log(allSticker)
    if (message.body.substring(message.body.indexOf(' ') + 1) == 'on') {
      allSticker.push(message.from)
      gclient.sendText(message.from, 'All Sticker function turned on')
    } else if (message.body.substring(message.body.indexOf(' ') + 1) == 'off') {
      for (let i = 0; i < allSticker.length; i++) {
        if (allSticker[i] == message.from) {
          allSticker.splice(i, 1)
        }
      }
      gclient.sendText(message.from, 'All Sticker function turned off')
    } else {
      gclient.sendText(message.from, 'Wrong Parameter')
    }
  }

  if (message.body === 'Hi') {
    gclient.sendText(message.from, '👋 Hallo I bims Jürgen M.!')
  }

  if (message.body.toLowerCase().startsWith('kahoot') || message.body.toLowerCase().startsWith('kahoot')) {
    kahoot.kahoot(message)
  }

  if (message.body.toLowerCase() == 'guten tag' && message.body != 'GUTEN TAG') {
    await gclient.sendFile(message.from, 'Mr_geilschwanz.mp3', '', 'Guten Tag')
  }

  if (message.body == 'GUTEN TAG') {
    await gclient.sendFile(message.from, 'Mr_geilschwanzLAUT.mp3', '', 'GUTEN TAG')
  }

  if (message.body.toLowerCase().includes('schwul') && false == message.body.includes('SCHWUL')) {
    await gclient.sendFile(message.from, 'Schwul.mp3', '', 'Schwul')
    await gclient.sendImageAsSticker(message.from, './pierce.jpg')
  }

  if (message.body.includes('SCHWUL')) {
    await gclient.sendFile(message.from, 'SchwulLAUT.mp3', '', 'SCHWUL')
    await gclient.sendImageAsSticker(message.from, './pierceFLIP.jpg')
  }
  if (message.body.toLowerCase().startsWith('!restart') | message.body.toLowerCase().startsWith('restart') && message.from == config.Admin + '@c.us') {
    process.exit(1)
  }
  if (message.body.toLowerCase().startsWith('!ban') | message.body.toLowerCase().startsWith('ban') && message.author == config.Admin + '@c.us') {
    ban.ban(message)
  }

  if (message.body.toLowerCase().startsWith('!unban') | message.body.toLowerCase().startsWith('unban') && message.author == config.Admin + '@c.us') {
    ban.unban(message)
  }

  if (message.body.toLowerCase() === 'ping') {
    gclient.sendText(message.from, 'Pong')
  }

  if (message.body.endsWith('?') && message.isGroupMsg == false) {
    if (Math.round(Math.random()) == 1) {
      gclient.sendText(message.from, 'Ja')
    } else {
      gclient.sendText(message.from, 'Nein')
    }
  }

  if (message.body == '🤔') {
    if (Math.round(Math.random()) == 1) {
      gclient.sendText(message.from, 'Yes')
    } else {
      gclient.sendText(message.from, 'No')
    }
  }

  /*   if (message.body.toLowerCase().startsWith('!danbooru') || message.body.toLowerCase().startsWith('danbooru')) {
    var num = message.body.replace(/^\D+|\D.*$/g, '')
    console.log(num)
    booru
      .posts({
        limit: num,
        tags: 'rating:explicit order:rank',
        page: Math.floor(Math.random() * 10) + 1,
      })
      .then(async (posts) => {
        console.log(posts.length)
        for (let index = 0; index < posts.length; index++) {
          console.log(posts[index].file_url)
          if (posts[index].file_url == undefined || posts[index].file_ext == 'zip') {
          } else {
            const url = booru.url(posts[index].file_url)
            const name = `bilder/${posts[index].md5}.${posts[index].file_ext}`
            await new Promise((resolve) =>
              request(posts[index].file_url)
                .pipe(fs.createWriteStream('bilder/' + `${posts[index].md5}.${posts[index].file_ext}`))
                .on('finish', resolve)
            )
            await gclient.sendImage(message.from, 'bilder/' + `${posts[index].md5}.${posts[index].file_ext}`)
          }
        }
      })
  } */

  if (message.body.toLowerCase().startsWith('!poll') || message.body.toLowerCase().startsWith('poll')) {
    //console.log(message.chat.groupMetadata.creation)
    // gclient.sendText(message.from, 'Still in Testing')
    // console.log(polllist)
    stimmen.push([])
    polllist.push(message.from)
    console.log(choices)
    tmp = message.body.split(/[#%]/)
    tmp2 = []
    for (let k = 2; k < tmp.length; k = k + 2) {
      tmp2.push(tmp[k])
    }
    choices.push(tmp2)
    console.log(choices)
  }
  if (message.body.toLowerCase().startsWith('sankaku') || message.body.toLowerCase().startsWith('!sankaku')) {
    tag = message.body.substring(message.body.indexOf(' ') + 1)
    await gclient.sendText(message.from, 'Searching for Tag/s: *' + tag + '*')
    limit = 10
    response = await axios.get('https://capi-v2.sankakucomplex.com/posts/keyset?lang=en&limit=' + limit + '&tags=' + tag)
    next = response.data.meta.next
    number = Math.floor(Math.random() * Math.floor(7))
    console.log(number)
    console.log(next)
    for (let i = 0; i < number; i++) {
      response = await axios.get('https://capi-v2.sankakucomplex.com/posts/keyset?lang=en&next=' + next + '&limit=' + limit + '&tags=' + tag)
      next = response.data.meta.next
      console.log(next)
    }
    for (let i = 0; i < response.data.data.length; i++) {
      console.log(response.data.data[i].file_url)
      await gclient.sendImage(message.from, response.data.data[i].file_url, '', response.data.data[i].source)
    }
    /*     response.data.data.forEach((element) => {
      console.log(element.file_url)
      gclient.sendImage(message.from, element.file_url, '', '')
    }) */
  }

  if (message.body.toLowerCase().startsWith('help') || message.body.toLowerCase().startsWith('!help')) {
    help.help(message)
  }
  if (message.body.toLowerCase().startsWith('werstreamt') || message.body.toLowerCase().startsWith('!werstreamt')) {
    whostreams.whostreams(message)
  }

  if (message.body.startsWith('test')) {
    console.log('Test Command')
    await gclient
      .sendImageAsSticker(message.from, 'test.jpg')
      .then((result) => {
        console.log('Result: ', result) //return object success
      })
      .catch((erro) => {
        console.error('Error when sending: ', erro) //return object error
      })
    //https://image.tmdb.org/t/p/w500/r8cu4iXoOsoWP6Mg3woyhctxlst.jpg
    /*     await gclient
      .sendImageAsStickerGif(message.from, 'test.gif')
      .then((result) => {
        console.log('Result: ', result) //return object success
      })
      .catch((erro) => {
        console.error('Error when sending:', erro.stack) //return object error
      }) */
  }

  if (message.isMedia & (message.caption == 'Sticker')) {
    if (message.type == 'video') {
      await gclient.sendText(message.from, 'creating Animated Sticker')
      sendSticker.sendAnimatedSticker(message)
    } else {
      await gclient.sendText(message.from, 'creating Sticker')
      sendSticker.sendSticker(message)
    }
  }
  if (message.isMedia & (message.caption == 'tSticker')) {
    //not working on ARM but x86 and x64 should work just uncomment if you have one of the supported types
    if (message.type == 'video') {
      await gclient.sendText(message.from, 'transparent Animated Sticker not Supported')
      // sendSticker.sendAnimatedTSticker(message)
    } else {
      await gclient.sendText(message.from, 'creating transparent Sticker')
      sendSticker.sendTSticker(message)
    }
  }

  if (message.body.toLowerCase().startsWith('!ytdl') || message.body.toLowerCase().startsWith('ytdl')) {
    gclient.sendText(message.from, 'currently disabled')
    // yt.mp4(message)
  }

  if (message.body.toLowerCase().startsWith('!ytmp3') || message.body.toLowerCase().startsWith('ytmp3')) {
    // gclient.sendText(message.from, 'currently disabled')
    console.log(1)
    await yt.mp3(message)
    console.log(2)
  }

  if (message.body.toLowerCase().startsWith('!nhentai') || message.body.toLowerCase().startsWith('nhentai')) {
    nhentai.downloader(message)
  }

  if (message.body.toLowerCase().startsWith('!meme') || message.body.toLowerCase().startsWith('meme')) {
    var anzahlmemes = message.body.split(' ')[1]

    if (anzahlmemes > 0 && anzahlmemes <= 50) {
      reddit.reddit('', anzahlmemes, message)
    } else {
      gclient.sendText(message.from, 'format is "meme count"(max 50)')
    }
  }

  if (message.body.toLowerCase().startsWith('hentai') || message.body.toLowerCase().startsWith('!hentai')) {
    var anzahlmemes = message.body.split(' ')[1]

    if (anzahlmemes > 0 && anzahlmemes <= 50) {
      reddit.reddit('hentai/', anzahlmemes, message)
    } else {
      gclient.sendText(message.from, 'format is "hentai count"(max 50)')
    }
  }

  if (message.body.toLowerCase().startsWith('reddit') || message.body.toLowerCase().startsWith('!reddit')) {
    var num = message.body.replace(/^\D+|\D.*$/g, '')
    var subReddit = message.body.substring(message.body.lastIndexOf(' ') + 1) + '/'

    if (num > 0 && num <= 50) {
      reddit.reddit(subReddit, num, message)
    } else {
      gclient.sendText(message.from, 'format is "reddit count subreddit"(max 50)')
    }
  }

  if (message.isMedia & (message.caption == 'Sauce')) {
    console.log('test')
    sauce.sauce(message)
  }

  delete require.cache[require.resolve('./sendSticker')]
  delete require.cache[require.resolve('./reddit')]
  delete require.cache[require.resolve('./poll')]
  delete require.cache[require.resolve('./yt')]
  delete require.cache[require.resolve('./help')]
  delete require.cache[require.resolve('./sauce')]
  delete require.cache[require.resolve('./whostreams')]
  delete require.cache[require.resolve('./kahoot')]
  delete require.cache[require.resolve('./nhentai')]
  delete require.cache[require.resolve('./config.json')]
}

function Sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}
