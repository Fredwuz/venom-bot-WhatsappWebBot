const sharp = require('sharp')

path = 'testt.gif'

inputBuffer = sharp('testt.gif').toBuffer()

sharp(inputBuffer).toFile('output.webp', (err, info) => {})
