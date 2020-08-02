# venom-bot-WhatsappWebBot

This is a basic WhatsappWebBot using https://github.com/orkestral/venom as a base

# How to install
you have to have node js installed https://nodejs.org/de/download/
first you have to install all the requirements located in the requirements.txt <br>
you also have to change `yourNumber` in `message.author == "yourNumber"` in line 33 and 39 in [onMessage.js](Scripts/onMessage.js) (inside the Scripts Folder) to your Whatsapp Number(with area code e.g. +49 for germany) so only you have excess to the command you can also remove  `&& message.author == "yourNumber"` completely, but it is not recommended <br>
there is a help command but is limited and doesn't contain every command for example the ban and unban command to limit users to use the bot (only works in groups at the moment) <br>
after that you just have to Scan the Qr-Code in the console and it will start 

# How to start

just start the [main.js](Scripts/main.js) with node (node Scripts/main.js)

# Avaliable Commands
**ping** replys with pong<br>
**ytdl** downloads YouTube video and sends it if under 64 mB <br>
**ytmp3** downloads YouTube video as mp3 File and sends if under 100 mB<br>
**reddit** sends given amount of pictures from given subreddit <br>
**meme** sends given amount of pictures from meme, me_irl, dankmemes subreddit<br>
**hentai** sends given amount of pictures from Hentai subreddit <br>
**help** sends help file<br>
**Media + Sauce** checks anime Source via trace.moe<br>
**Image + Sticker** sends image back as sticker<br>
**ban** restricts user from using Bot inside Group<br>
**unban** unbans user inside Group <br>

# Disclaimer
Tested on Raspberry Pi 4b+ with Raspberry Os installed <br>
This script isn't perfect in the slightest sense. Its just a small project I am working on in my free time so yeah maintaince is pretty poor but I try to do my best :D.
