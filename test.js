const { chromium } = require('playwright')
;(async () => {
  const browser = await chromium.launch({ headless: false, executablePath: '/usr/bin/chromium-browser' })
  const context = await browser.newContext({ acceptDownloads: true })
  const page = await context.newPage()

  await page.goto('https://www.unscreen.com/upload')

  await page.setViewportSize({ width: 1920, height: 898 })

  await page.waitForSelector('.mx-auto > .card > .card-body > .mt-2 > .btn')
  await page.click('.mx-auto > .card > .card-body > .mt-2 > .btn')
  const handle = await page.$('input[type="file"]')
  await handle.setInputFiles('test.mp4')

  await page.waitForSelector('.btn-group > button:nth-child(1)', { timeout: 60000 })

  const [download] = await Promise.all([
    page.waitForEvent('download'), // wait for download to start
    page.click('.btn-group > button:nth-child(1)'),
  ])

  // wait for download to complete
  await download.saveAs('asdsadasdasd.gif')

  await browser.close()
})()
