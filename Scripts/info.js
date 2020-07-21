exports.info = async function() {
   
    while(true) {

        await gclient.setProfileStatus('Ping');
        await Sleep(60000)
        await gclient.setProfileStatus('Pong');
        await Sleep(60000)
    }

}

function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }
