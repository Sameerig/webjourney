const qrcode = require('qrcode-terminal');

const { Client } = require('whatsapp-web.js');

const client = new Client();

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED');
    qrcode.generate(qr, {small: true});

});
client.on('ready', () => {
    console.log('Client is ready!');
    client.getChats().then(chats=>{
        const person = chats.find(
            (chat)=>chat.name==="CSE ke chode"
        );
        console.log(person);
        for(var i=0;i<=120;i++){
            client.sendMessage(person.id._serialized,"@Ayush bhai ki jai hooo")
        }
    })
});


client.initialize();
 