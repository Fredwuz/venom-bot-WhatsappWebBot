exports.help = async function (message) {

gclient.sendText(message.from, 
`*ping* replys with pong\n
*ytdl* ~downloads YouTube video and sends it if under 64 mB~ currently disabled\n
*ytmp3* ~downloads YouTube video as mp3 File and sends if under 100 mB~ currently disabled\n
*reddit* sends given amount of pictures from given subreddit\n
*meme* sends given amount of pictures from meme, me_irl, dankmemes subreddit\n
*hentai* sends given amount of pictures from Hentai subreddit\n 
*help* sends help file\n
*Media + Sauce* checks anime Source via trace.moe\n
*Image + Sticker* sends image back as sticker\n
*ban* restricts user from using Bot inside Group\n
*unban* unbans user inside Group\n
*allSticker* Every Image send will be send back as Sticker, can be Turn on and off\n`)
}
