/*
Author: Fredwuz (frederic23.mai@gmail.com)
kahoot.js (c) 2020
Desc: kahoot joiner module
Created:  10/24/2020
Modified: !date!
*/

const Kahoot = require('kahoot.js-updated')

exports.kahoot = async function (message) {
  name = ['Mike Oxlong', 'Nick Gurr', 'Coquimash Schwan-Slang', 'Sakma Deek']
  var ID = message.body.split(' ')[1]
  client = []
  // kahootid = 9295122

  for (let index = 0; index < name.length; index++) {
    client[index] = new Kahoot()
    console.log('Joining kahoot...')
    client[index].join(ID /* Or any other kahoot game pin */, name[index])
    client[index].on('Joined', () => {
      console.log('I joined the Kahoot!')
      gclient.sendText(message.from, 'Joined kahoot with ID ' + ID + ' as *' + name[index] + '*')
    })
    await Sleep(1000)
    client[index].on('QuizStart', () => {
      console.log('The quiz has started!')
    })
    client[index].on('QuestionStart', (question) => {
      console.log('A new question has started, answering the first answer.')
      question.answer(0)
    })
    client[index].on('QuizEnd', () => {
      console.log('The quiz has ended.')
    })
  }

  function Sleep(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds))
  }
}
