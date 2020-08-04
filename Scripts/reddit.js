const axios = require('axios')
const request = require('request')
const fs = require('fs')
const path = require('path')
const nrc = require('node-run-cmd')


exports.reddit = async function (subreddit,anzahl,message) {
  
    try {

        response = await axios.get('https://meme-api.herokuapp.com/gimme/'+subreddit+anzahl)

    } catch (error) {

        gclient.sendText(message.from, 'Subreddit nicht gefunden\n'+error);
        return
    }
    items = response.data.memes
  
    var Array = []
    for (var i = 0; i < items.length; i++) {
        Array.push(items[i])
        console.log(items[i].url)
        var name = items[i].url.substring(items[i].url.lastIndexOf("/") + 1)

        await new Promise(resolve =>request(items[i].url).pipe(fs.createWriteStream("bilder/"+name)).on('finish', resolve));
        var dateiendung = path.extname("bilder/"+name)
        if (dateiendung === ".gif") {


          try {
            await fs.promises.access("bilder/"+name+".mp4");

        } catch (error) {
          await nrc.run("ffmpeg -i "+"bilder/"+name+" -movflags faststart -pix_fmt yuv420p -vf \"scale=trunc(iw/2)*2:trunc(ih/2)*2\" "+"bilder/"+name+".mp4")
        }
        await gclient.sendVideoAsGif(
          message.from,
          "bilder/"+name+".mp4",
          'video.gif',
          items[i].title
        );

        } else {

          await gclient.sendImage(
            message.from,
            "bilder/"+name,
            name,
            items[i].title
          );
          
        }
  

    }
   await Sleep(5000)
   gclient.sendText(message.from, 'Fertig');
  }


  function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }