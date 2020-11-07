/*
Author: Fredwuz (frederic23.mai@gmail.com)
info.js (c) 2020
Desc: changes info every minute
Created:  10/24/2020
Modified: !date!
*/

exports.info = async function () {
  while (true) {
    await gclient.setProfileStatus('Ping')
    await Sleep(60000)
    await gclient.setProfileStatus('Pong')
    await Sleep(60000)
  }
}

function Sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}
