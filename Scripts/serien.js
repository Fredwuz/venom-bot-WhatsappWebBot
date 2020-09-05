var cron = require('node-cron');
const fs = require('fs')
const readline = require('readline')
let Parser = require('rss-parser')
const imageToBase64 = require('image-to-base64');
const config = require('./config.json')

let parser = new Parser();
var serienarray = []
var neu = true
exports.serien = async function () {
        cron.schedule('30 18 * * *', () => {
        console.log('running a task every Day at 19:30');
        sendSerien()
      }, {
        timezone: "Europe/Berlin"
      });
      
}	


async function sendSerien() {
    netflix = ""
    amazonprime = ""
    serienarray = []
    imgURLnetflix = []
    imgURLamazonprime = []
    const serien = fs.createReadStream('serien.txt');
  
    const rl = readline.createInterface({
        input: serien,
        output: process.stdout
    });
    for await (const line of rl) {
        serienarray.push(line)
      }

    let feed = await parser.parseURL('https://www.vodspy.de/rss');
    for (let index = 0; index < feed.items.length; index++) {
        neu = true
        if (feed.items[index].categories[0] == "Netflix") {
            for (let i = 0; i < serienarray.length; i++) {
                if (serienarray[i].includes(feed.items[index].title)) {
                    neu = false
                    i = i + 1000
                }   
            }
            if (neu) {
                fs.appendFileSync('serien.txt', feed.items[index].title+"\n");
                show = feed.items[index].title
                show = show.substring(0, show.indexOf('['));
                netflix = netflix + show +"\n"
                imgURLnetflix.push((""+feed.items[index].content.match(/<img[^>]+src="http([^">]+)/g)).substring(10))

            }

        }
        if (feed.items[index].categories[0] == "Amazon Prime") {
            for (let i = 0; i < serienarray.length; i++) {
                if (serienarray[i].includes(feed.items[index].title)) {
                    neu = false
                    i = i + 1000
                }   
            }
            if (neu) {
                fs.appendFileSync('serien.txt', feed.items[index].title+"\n");
                show = feed.items[index].title
                show = show.substring(0, show.indexOf('['));
                amazonprime = amazonprime + show +"\n"
                imgURLamazonprime.push((""+feed.items[index].content.match(/<img[^>]+src="http([^">]+)/g)).substring(10))
            }

        }
    }
    netflixIMG = netflix.split('\n')
    netflixIMG.splice(-1,1)

    amazonprimeIMG = amazonprime.split('\n')
    amazonprimeIMG.splice(-1,1)


    for (let j = 0; j < config.serien_feed.length; j++) {

        if (netflix != "") {
            gclient.sendText(config.serien_feed[j], '*Neu auf Netflix*\n'+netflix);
        }
        if (amazonprime != "") {
            gclient.sendText(config.serien_feed[j], '*Neu auf Amazon Prime*\n'+amazonprime);
        }
         
    }
    for (let j = 0; j < config.serien_feedIMG.length; j++) {
        if (netflix != "") {
            for (let i = 0; i < netflixIMG.length; i++) {
                await Sleep(100)
                await gclient.sendImage(
                    config.serien_feedIMG[j],
                    imgURLnetflix[i],
                    'image.jpg',
                    netflixIMG[i]+ " [Netflix]"
                  );
            }
        }
        if (amazonprime != "") {
            for (let i = 0; i < amazonprimeIMG.length; i++) {
                await Sleep(100)
                await gclient.sendImage(
                    config.serien_feedIMG[j],
                    imgURLamazonprime[i],
                    'image.jpg',
                    amazonprimeIMG[i] + " [Amazon Prime]"
                  );
            }

        }

        
    }
/*     for (let j = 0; j < config.serien_feedIMGSticker.length; j++) {

        if (netflix != "") {
            for (let i = 0; i < imgURLnetflix.length; i++) {
                await Sleep(100)
                console.log(imgURLnetflix[i])
                img = imageToBase64(imgURLnetflix[i])
                await gclient.sendImageAsSticker(config.serien_feedIMGSticker[j], img);
            }
        }
        if (amazonprime != "") {
            for (let i = 0; i < imgURLamazonprime.length; i++) {
                await Sleep(100)
                console.log(imgURLamazonprime[i])
                img = imageToBase64(imgURLamazonprime[i])
                await gclient.sendImageAsSticker(config.serien_feedIMGSticker[j], imgURLamazonprime[i]);
            }

        }
        
    } */
    delete require.cache[require.resolve('./config.json')]
    
    
    
}

function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }