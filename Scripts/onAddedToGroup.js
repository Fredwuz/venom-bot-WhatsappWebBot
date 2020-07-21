const fs = require('fs')

exports.AddedToGroup = async function (chatEvent) {

console.log(chatEvent)  
gclient.sendText(chatEvent.id, 'Bip Bop Bot joined');
gclient.sendText(chatEvent.id, "ヽ༼ ಠ益ಠ ༽ﾉ");
}