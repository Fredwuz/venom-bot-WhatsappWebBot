/*
Author: Fredwuz (frederic23.mai@gmail.com)
whostreams.js (c) 2020
Desc: whostreams logic using JustWatch
Created:  10/24/2020
Modified: !date!
*/

const JustWatch = require('justwatch-api')

exports.whostreams = async function (message) {
  jw = new JustWatch({ locale: 'de_DE' })

  suchwort = message.body.substring(message.body.indexOf(' ') + 1)
  request = await jw.search({ query: suchwort })
  provider = await jw.getProviders()

  if (request.items[0] == undefined) {
    await gclient.sendText(message.from, 'Leider konnte der Film/die Serie nicht gefunden werden :(')
  }

  if (request.items[0].offers === undefined) {
    providers = ''
    for (let i = 0; i < provider.length; i++) {
      providers = providers + provider[i].clear_name + '\n'
    }
    await gclient.sendText(message.from, 'Leider kein Angebot zu *' + request.items[0].title + '* zum Streamen/Leihen/Kaufen bei diesen Providern gefunden :(\n\n' + providers)
    return
  }

  flaterate = 'Ergebnisse für *' + request.items[0].title + '*\n\nIn einer Flatrate:\n\n'
  rent = 'Ergebnisse für *' + request.items[0].title + '*\n\nZum Leihen:\n\n'
  buy = 'Ergebnisse für *' + request.items[0].title + '*\n\nZum Kaufen:\n\n'

  for (let i = 0; i < request.items[0].offers.length; i++) {
    if (request.items[0].offers[i].monetization_type == 'flatrate' && request.items[0].offers[i].presentation_type == 'sd') {
      for (let j = 0; j < provider.length; j++) {
        if (request.items[0].offers[i].provider_id == provider[j].id) {
          if (request.items[0].object_type == 'show') {
            flaterate = flaterate + provider[j].clear_name + '  ' + request.items[0].offers[i].element_count + '. Staffel/en\nLink: ' + request.items[0].offers[i].urls.standard_web + '\n\n'
          } else {
            flaterate = flaterate + provider[j].clear_name + '\nLink: ' + request.items[0].offers[i].urls.standard_web + '\n\n'
          }
        }
      }
    }
    if (request.items[0].offers[i].monetization_type == 'rent' && request.items[0].offers[i].presentation_type == 'sd') {
      for (let j = 0; j < provider.length; j++) {
        if (request.items[0].offers[i].provider_id == provider[j].id) {
          if (request.items[0].object_type == 'show') {
            rent = rent + provider[j].clear_name + '  ' + request.items[0].offers[i].element_count + '. Staffel/en \nPreis: ' + request.items[0].offers[i].retail_price + ' €\nLink: ' + request.items[0].offers[i].urls.standard_web + '\n\n'
          } else {
            rent = rent + provider[j].clear_name + '\nPreis: ' + request.items[0].offers[i].retail_price + ' €\nLink: ' + request.items[0].offers[i].urls.standard_web + '\n\n'
          }
        }
      }
    }
    if (request.items[0].offers[i].monetization_type == 'buy' && request.items[0].offers[i].presentation_type == 'sd') {
      for (let j = 0; j < provider.length; j++) {
        if (request.items[0].offers[i].provider_id == provider[j].id) {
          if (request.items[0].object_type == 'show') {
            buy = buy + provider[j].clear_name + '  ' + request.items[0].offers[i].element_count + '. Staffel/en \nPreis: ' + request.items[0].offers[i].retail_price + ' €\nLink: ' + request.items[0].offers[i].urls.standard_web + '\n\n'
          } else {
            buy = buy + provider[j].clear_name + '\nPreis: ' + request.items[0].offers[i].retail_price + ' €\nLink: ' + request.items[0].offers[i].urls.standard_web + '\n\n'
          }
        }
      }
    }
  }
  if (flaterate == 'Ergebnisse für *' + request.items[0].title + '*\n\nIn einer Flatrate:\n\n') {
    flaterate = flaterate + 'Leider nichts :('
  }
  if (rent == 'Ergebnisse für *' + request.items[0].title + '*\n\nZum Leihen:\n\n') {
    rent = rent + 'Leider nichts :('
  }
  if (buy == 'Ergebnisse für *' + request.items[0].title + '*\n\nZum Kaufen:\n\n') {
    buy = buy + 'Leider nichts :('
  }
  await gclient.sendText(message.from, flaterate)
  await gclient.sendText(message.from, rent)
  await gclient.sendText(message.from, buy)
}
