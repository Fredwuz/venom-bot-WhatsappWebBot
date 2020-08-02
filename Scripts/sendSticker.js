const mime = require('mime-types')
const nrc = require('node-run-cmd')
const sizeOf = require('image-size');
const fs = require('fs')
const queuejs = require('./queue')

exports.sendSticker = async function (message) {
    console.log(sendingSticker)
    if (sendingSticker.indexOf(message.from) > -1) {
        queueSticker.push(message)
        return;
    } else {
    }
    sendingSticker.push(message.from)  
    const buffer = await gclient.decryptFile(message);
    const fileName = `Sticker/temp${message.from}.${mime.extension(message.mimetype)}`; 
    fs.writeFile(fileName, buffer, function (err) {})
    await nrc.run('convert Sticker/temp'+message.from+'.jpeg Sticker/'+message.from+'.png')
    var dimensions = await sizeOf('Sticker/'+message.from+'.png');
    console.log(dimensions.width+"  "+dimensions.height)
    if (dimensions.width < dimensions.height) {
    await nrc.run('mogrify -bordercolor transparent -border '+((dimensions.height-dimensions.width)/2)+'x0 Sticker/'+message.from+'.png')
    }else if (dimensions.width > dimensions.height) {
    await nrc.run('mogrify -bordercolor transparent -border 0x'+((dimensions.width-dimensions.height)/2)+' Sticker/'+message.from+'.png')
    } else {
    }
    gclient.sendImageAsSticker(message.from, 'Sticker/'+message.from+'.png');
    for (let index = 0; index < sendingSticker.length; index++) {
        if (sendingSticker[index] == message.from) {
            sendingSticker.splice([index], 1)
        }
    }
    if (queueSticker.length != 0) {
        queuejs.sendSticker(message)
    }
    delete require.cache[require.resolve('./queue')]
  }