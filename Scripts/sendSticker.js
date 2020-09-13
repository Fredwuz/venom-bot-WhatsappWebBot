const mime = require('mime-types')
const nrc = require('node-run-cmd')
const sizeOf = require('image-size')
const fs = require('fs')
const gifFrames = require('gif-frames')
const Jimp = require('jimp')
const { GifFrame, GifUtil, GifCodec } = require('gifwrap')
const queuejs = require('./queue')

exports.sendSticker = async function (message) {
  console.log(sendingSticker)
  if (sendingSticker.indexOf(message.from) > -1) {
    queueSticker.push(message)
    return
  } else {
  }
  sendingSticker.push(message.from)
  const buffer = await gclient.decryptFile(message)
  const fileName = `Sticker/temp${message.from}.${mime.extension(message.mimetype)}`
  fs.writeFile(fileName, buffer, function (err) {})
  await nrc.run('convert Sticker/temp' + message.from + '.jpeg Sticker/' + message.from + '.png')
  var dimensions = await sizeOf('Sticker/' + message.from + '.png')
  console.log(dimensions.width + '  ' + dimensions.height)
  if (dimensions.width < dimensions.height) {
    await nrc.run('mogrify -bordercolor transparent -border ' + (dimensions.height - dimensions.width) / 2 + 'x0 Sticker/' + message.from + '.png')
  } else if (dimensions.width > dimensions.height) {
    await nrc.run('mogrify -bordercolor transparent -border 0x' + (dimensions.width - dimensions.height) / 2 + ' Sticker/' + message.from + '.png')
  } else {
  }
  gclient.sendImageAsSticker(message.from, 'Sticker/' + message.from + '.png')
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

exports.sendAnimatedSticker = async function (message) {
  console.log(sendingAnimatedSticker)
  if (sendingAnimatedSticker.indexOf(message.from) > -1) {
    queueAnimatedSticker.push(message)
    return
  } else {
  }
  sendingAnimatedSticker.push(message.from)
  const buffer = await gclient.decryptFile(message)
  const fileName = `Sticker/temp${message.from}.${mime.extension(message.mimetype)}`
  fs.writeFile(fileName, buffer, function (err) {})
  await nrc.run('ffmpeg -y -i Sticker/temp' + message.from + '.mp4 Sticker/' + message.from + '.gif')
  await gifFrames({ url: 'Sticker/' + message.from + '.gif', frames: 0 }).then(function (frameData) {
    frameData[0].getImage().pipe(fs.createWriteStream('Sticker/firstframe' + message.from + '.png'))
  })
  await Jimp.read('Sticker/firstframe' + message.from + '.png')
    .then((image) => {
      image.brightness(0.04)
      image.write('Sticker/firstframe' + message.from + '.png')
      console.log(3)
    })
    .catch((err) => {
      // Handle an exception.
    })
  //await nrc.run('convert ' + 'Sticker/' + message.from + '.gif -delete 0 Sticker/' + message.from + '.gif')
  var dimensions = await sizeOf('Sticker/' + message.from + '.gif')
  console.log(dimensions.width + '  ' + dimensions.height)
  if (dimensions.width < dimensions.height) {
    await nrc.run('mogrify -bordercolor transparent -border ' + (dimensions.height - dimensions.width) / 2 + 'x0 Sticker/' + message.from + '.gif')
    await nrc.run('mogrify -bordercolor transparent -border ' + (dimensions.height - dimensions.width) / 2 + 'x0 Sticker/firstframe' + message.from + '.png')
  } else if (dimensions.width > dimensions.height) {
    await nrc.run('mogrify -bordercolor transparent -border 0x' + (dimensions.width - dimensions.height) / 2 + ' Sticker/' + message.from + '.gif')
    await nrc.run('mogrify -bordercolor transparent -border 0x' + (dimensions.width - dimensions.height) / 2 + ' Sticker/firstframe' + message.from + '.png')
  } else {
  }
  console.log(1)
  await nrc.run('convert ' + 'Sticker/firstframe' + message.from + '.png' + ' Sticker/' + message.from + '.gif' + ' Sticker/' + message.from + '.gif')
  try {
    await gclient.sendImageAsStickerGif(message.from, 'Sticker/' + message.from + '.gif')
  } catch (error) {
    console.log(error)
    if (String(error) == 'Error: Processed image is too large for the WebP format') {
      gclient.reply(message.from, String(error), message.id.toString()) //Error: Processed image is too large for the WebP format
    }
  }

  for (let index = 0; index < sendingAnimatedSticker.length; index++) {
    if (sendingAnimatedSticker[index] == message.from) {
      sendingAnimatedSticker.splice([index], 1)
    }
  }
  if (queueAnimatedSticker.length != 0) {
    queuejs.sendAnimatedSticker(message)
  }
  delete require.cache[require.resolve('./queue')]
}
