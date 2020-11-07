/*
Author: Fredwuz (frederic23.mai@gmail.com)
sendSticker.js (c) 2020
Desc: Sticker sending logic and pre editing
Created:  10/24/2020
Modified: 11/2/2020
*/

const mime = require('mime-types')
const nrc = require('node-run-cmd')
const sizeOf = require('image-size')
const fs = require('fs')
const gifFrames = require('gif-frames')
const Jimp = require('jimp')
const { GifFrame, GifUtil, GifCodec } = require('gifwrap')
const request = require('request-promise')
const trimImage = require('trim-image')
const sharp = require('sharp')
const { promisify } = require('util')
const { firefox } = require('playwright')
const queuejs = require('./queue')
const config = require('./config.json')

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

exports.sendTSticker = async function (message) {
  console.log(sendingSticker)
  if (sendingSticker.indexOf(message.from) > -1) {
    queueSticker.push(message)
    return
  } else {
  }
  sendingSticker.push(message.from)
  const buffer = await gclient.decryptFile(message)
  const fileName = `Sticker/temp${message.from}.${mime.extension(message.mimetype)}`
  fs.writeFileSync(fileName, buffer, function (err) {})
  await request.post(
    {
      url: 'https://api.remove.bg/v1.0/removebg',
      formData: {
        image_file: fs.createReadStream('Sticker/temp' + message.from + '.jpeg'),
        size: 'auto',
      },
      headers: {
        'X-Api-Key': config.removebgToken,
      },
      encoding: null,
    },
    function (error, response, body) {
      if (error) return console.error('Request failed:', error)
      if (response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'))
      fs.writeFileSync('Sticker/' + message.from + '.png', body)
    }
  )
  const cropImage = promisify(trimImage)
  await cropImage('Sticker/' + message.from + '.png', 'Sticker/' + message.from + '.png', {
    left: true,
    right: true,
    top: true,
    bottom: true,
  })

  await Sleep(1000)

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
  await gifFrames({ url: 'Sticker/' + message.from + '.gif', frames: 'all' }).then(function (frameData) {
    frameData[0].getImage().pipe(fs.createWriteStream('Sticker/firstframe' + message.from + '.png'))
    frames = frameData
  })
  //  console.log(frames.length)

  if (frames.length < 7) {
    await nrc.run('convert ' + 'Sticker/' + message.from + '.gif Sticker/' + message.from + '.gif  Sticker/' + message.from + '.gif')
  }

  await nrc.run('convert ' + 'Sticker/' + message.from + '.gif -coalesce -delete 0 Sticker/' + message.from + '.gif')
  var dimensions = await sizeOf('Sticker/' + message.from + '.gif')
  success = true
  while (success) {
    await Jimp.read('Sticker/firstframe' + message.from + '.png')
      .then((image) => {
        for (let i = 1; i < dimensions.width; i++) {
          for (let j = 1; j < dimensions.height; j++) {
            Sleep(1)
            colors = Jimp.intToRGBA(image.getPixelColor(i, j))
            if (colors.r > 155) {
              colors.r = colors.r - 5
            } else {
              colors.r = colors.r + 5
            }
            if (colors.g > 155) {
              colors.g = colors.g - 5
            } else {
              colors.g = colors.g + 5
            }
            if (colors.b > 155) {
              colors.b = colors.b - 5
            } else {
              colors.b = colors.b + 5
            }
            if (colors.a > 155) {
              colors.a = colors.a - 5
            } else {
              colors.a = colors.a + 5
            }

            hex = Jimp.rgbaToInt(colors.r, colors.g, colors.b, colors.a)

            //     console.log(hex)
            image.setPixelColor(hex, i, j) // sets the colour of that pixel
            success = false
          }
        }
        image.write('Sticker/firstframe' + message.from + '.png')
      })
      .catch((err) => {
        console.log('ERROR: ' + err)
      })
  }
  await Sleep(1000)
  console.log(dimensions.width + '  ' + dimensions.height)
  if (dimensions.width < dimensions.height) {
    await nrc.run('mogrify -bordercolor transparent -border ' + (dimensions.height - dimensions.width) / 2 + 'x0 Sticker/' + message.from + '.gif')
    await nrc.run('mogrify -bordercolor transparent -border ' + (dimensions.height - dimensions.width) / 2 + 'x0 Sticker/firstframe' + message.from + '.png')
  } else if (dimensions.width > dimensions.height) {
    await nrc.run('mogrify -bordercolor transparent -border 0x' + (dimensions.width - dimensions.height) / 2 + ' Sticker/' + message.from + '.gif')
    await nrc.run('mogrify -bordercolor transparent -border 0x' + (dimensions.width - dimensions.height) / 2 + ' Sticker/firstframe' + message.from + '.png')
  } else {
  }
  await nrc.run('convert ' + 'Sticker/firstframe' + message.from + '.png' + ' Sticker/' + message.from + '.gif -resize 256x256' + ' Sticker/' + message.from + '.gif')
  stats = fs.statSync('Sticker/' + message.from + '.gif')
  console.log(stats['size'])
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

//not working on ARM but x86 and x64 should work just uncomment if you have one of the supported types
/* exports.sendAnimatedTSticker = async function (message) {
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
  await downloadAnimatedTSticker(message)
  await nrc.run('ffmpeg -y -i Sticker/temp' + message.from + '.mp4 Sticker/' + message.from + '.gif')
  await gifFrames({ url: 'Sticker/' + message.from + '.gif', frames: 0 }).then(function (frameData) {
    frameData[0].getImage().pipe(fs.createWriteStream('Sticker/firstframe' + message.from + '.png'))
  })
  await Jimp.read('Sticker/firstframe' + message.from + '.png')
    .then((image) => {
      image.brightness(0.04)
      image.write('Sticker/firstframe' + message.from + '.png')
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
} */

//not working on ARM but x86 and x64 should work just uncomment if you have one of the supported types
/* async function downloadAnimatedTSticker(message) {
  const browser = await firefox.launch({ headless: false })
  const context = await browser.newContext({ acceptDownloads: true })
  const page = await context.newPage()

  await page.goto('https://www.unscreen.com/upload')

  await page.setViewportSize({ width: 1920, height: 898 })

  await page.waitForSelector('.mx-auto > .card > .card-body > .mt-2 > .btn')
  await page.click('.mx-auto > .card > .card-body > .mt-2 > .btn')
  const handle = await page.$('input[type="file"]')
  await handle.setInputFiles('Sticker/temp' + message.from + '.mp4')

  await page.waitForSelector('.btn-group > button:nth-child(1)', { timeout: 1200000 })

  const [download] = await Promise.all([
    page.waitForEvent('download'), // wait for download to start
    page.click('.btn-group > button:nth-child(1)'),
  ])

  // wait for download to complete
  await download.saveAs('Sticker/' + message.from + '.gif')

  await browser.close()
} */

function Sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}
