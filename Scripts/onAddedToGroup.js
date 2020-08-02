const fs = require('fs')
const config = require('./config.json')

exports.AddedToGroup = async function (chatEvent) {

console.log(chatEvent)  
gclient.sendText(chatEvent.id, config.onAddedToGroup);

}