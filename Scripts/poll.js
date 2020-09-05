exports.poll = async function (message) {
  if (message.isGroupMsg && (message.body !== '!result') & (message.body !== '!poll')) {
    for (let i = 0; i < polllist.length; i++) {
      if (polllist[i] == message.from) {
        console.log(stimmen)
        for (let j = 0; j < stimmen[i].length; j++) {
          if (message.author == stimmen[i][j].split(' ')[1]) {
            stimmen[i].splice([j], 1)
          }
        }

        if (choices[i].indexOf(message.body) > -1) {
          stimmen[i].push(message.body + ' ' + message.author)
        }
        console.log(1)
      }
    }
  } else if (message.body === '!result') {
    for (let i = 0; i < polllist.length; i++) {
      if (polllist[i] == message.from) {
        stimmenString = ''
        console.log(2)
        for (let j = 0; j < stimmen[i].length; j++) {
          stimmenString = stimmenString + '\n' + stimmen[i][j].split(' ')[0]
        }

        console.log(stimmenString)
        gclient.sendText(message.from, stimmenString)
        stimmen.splice([i], 1)
        polllist.splice([i], 1)
        choices.splice([i], 1)
      }
    }
  }
}
