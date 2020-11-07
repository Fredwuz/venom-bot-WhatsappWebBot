/*
Author: Fredwuz (frederic23.mai@gmail.com)
nhentai.js (c) 2020
Desc: nhentai doujinshi downloader
Created:  10/24/2020
Modified: !date!
*/

const nhentaijs = require('nhentai-js')
const request = require('request')
const imgToPDF = require('image-to-pdf')
const fs = require('fs')

exports.downloader = async function (message) {
  let id = message.body.split(' ')[1]
  let download_count = 0
  let PDFpages = []
  try {
    const dojin = await nhentaijs.getDoujin(id)
    pages_array = dojin.pages
    title = dojin.title
    gclient.sendText(message.from, 'Downloading: \n*' + title + '*')
    gclient.sendText(message.from, 'This can take up some time so please be patient')

    for (let index = 0; index < pages_array.length; index++) {
      image_name = 'nhentai/' + title + index + '.jpg'
      await new Promise((resolve) => request(pages_array[index]).pipe(fs.createWriteStream(image_name)).on('finish', resolve))
      PDFpages.push(image_name)
      download_count++
      //  console.log(`Downloading: ${download_count} out of ${pages_array.length}`)
    }
    //converts them to pdf
    await new Promise((resolve) =>
      imgToPDF(PDFpages, 'A4')
        .pipe(fs.createWriteStream('nhentai/' + title + '.pdf'))
        .on('finish', resolve)
    )
    //  imgToPDF(PDFpages, 'A4').pipe(fs.createWriteStream('nhentai/' + title + '.pdf'))
    for (let index = 0; index < pages_array.length; index++) {
      fs.unlink('nhentai/' + title + index + '.jpg', (err) => {
        if (err) throw err
      })
    }
    pdfsize = await fs.statSync('nhentai/' + title + '.pdf').size
    if (pdfsize < 95000000) {
      gclient.sendText(message.from, 'Uploading')
      await gclient
        .sendFile(message.from, 'nhentai/' + title + '.pdf', title + '.pdf', 'There you go')
        .then((result) => {
          fs.unlink('nhentai/' + title + '.pdf', (err) => {
            if (err) throw err
          })
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro) //return object error
        })
    } else {
      gclient.sendText(message.from, 'Uploading to anonfiles because file size to large for Whatsapp')
      const options = {
        method: 'POST',
        url: 'https://api.anonfiles.com/upload',
        formData: {
          file: fs.createReadStream('nhentai/' + title + '.pdf'),
        },
      }

      request(options, function (err, res, body) {
        if (err) console.log(err)
        fs.unlink('nhentai/' + title + '.pdf', (err) => {
          if (err) throw err
        })
        gclient.sendText(message.from, 'Link to File: ' + JSON.parse(body).data.file.url.full)
      })
    }
  } catch (error) {
    if (error.status == 404) {
      gclient.sendText(message.from, 'No Dōjinshi found')
      console.log('No Dōjinshi found')
    } else {
      console.log(error)
    }
  }
}
