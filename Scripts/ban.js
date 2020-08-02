const fs = require('fs')

exports.ban = async function (message) {
    bannedNumber = message.body.substring(message.body.indexOf("@") + 1)
    fs.appendFileSync('bans.txt', message.from+' '+bannedNumber+"@c.us\n");
    gclient.sendMentioned(message.from, 'Banned @'+bannedNumber+'!', [bannedNumber]);

}
exports.unban = async function (message) {
    unBannedNumber = message.body.substring(message.body.indexOf("@") + 1)
    fs.readFile('bans.txt', {encoding: 'utf-8'}, function(err, data) {
        if (err) throw error;
    
        let dataArray = data.split('\n'); 
        const searchKeyword = message.from+' '+unBannedNumber+"@c.us"; 
        let lastIndex = -1; 
    
        for (let index=0; index<dataArray.length; index++) {
            if (dataArray[index].includes(searchKeyword)) { 
                lastIndex = index; 
                break; 
            }
        }
        dataArray.splice(lastIndex, 1);
        const updatedData = dataArray.join('\n');
        fs.writeFile('bans.txt', updatedData, (err) => {
            if (err) throw err;
            gclient.sendMentioned(message.from, 'Unbanned @'+unBannedNumber+'!', [unBannedNumber]);
            
        });
    
    });

}