const sharp = require('sharp')

// sharp('testtt.gif', { pages: -1 }).toFile('x.webp')

sharp('testtt.gif', { pages: -1 }).toFile('x.webp')

/* sharp('testtt.gif', { pages: -1 }).resize(520, 520).toFile('output222.webp'),
  (err, info) => {
    console.log(err), console.log(info)
  } */
