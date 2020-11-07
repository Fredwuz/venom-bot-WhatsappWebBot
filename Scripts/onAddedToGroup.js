/*
Author: Fredwuz (frederic23.mai@gmail.com)
onAddedToGroup.js (c) 2020
Desc: Actions when added to group
Created:  10/24/2020
Modified: !date!
*/

const fs = require('fs')
const config = require('./config.json')

exports.AddedToGroup = async function (chatEvent) {
  console.log(chatEvent)
  gclient.sendText(chatEvent.id, 'Bip Bop Jürgen ist am Start 🥰')
  gclient.sendText(chatEvent.id, config.onAddedToGroup)
}
