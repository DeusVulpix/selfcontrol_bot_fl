
const TelegramApi = require('node-telegram-bot-api');

const axios = require('axios');

const token = '5620225388:AAHT19-VDX4sJ-ukM4b9lytKmNnNUlxh64U';

const bot = new TelegramApi(token,{polling: true});

const weather_key = 'd27b8c763a5bc1d779be089304a3cf15';

const start = () => {

    bot.setMyCommands([
        {command: '/start' , description: 'Приветствие.'},
        {command: '/info' , description: 'О боте.'},
        {command: '/weather', description: 'Погода в твоем городе.'}
    ])

    bot.on('message', async msg => {

        const text = msg.text;
        const chat_id = msg.chat.id;

        if(msg.location){
            const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${msg.location.latitude}&lon=${msg.location.longitude}&appid=${weather_key}&mode=json&units=metric`;
            const response = await axios.get(weather_url);
            bot.sendMessage( chat_id,`В вашем городе около ${Math.round(response.data.main.temp)}°C.` )
            return setInterval(() => {
                bot.sendMessage( chat_id,`В вашем городе около ${Math.round(response.data.main.temp)}°C.` )
            }, 10000);
        }

        if (text === '/start'){
            return bot.sendSticker(chat_id,'https://tlgrm.eu/_/stickers/711/2ce/7112ce51-3cc1-42ca-8de7-62e7525dc332/192/17.webp')
        }
        if (text === '/info'){
            return bot.sendMessage(chat_id,'Я только учусь')
        }
        if (text === '/weather'){
            return bot.sendMessage(chat_id,'Отправь свою геолокацию для получения прогноза погоды.')
        }
        return bot.sendMessage(chat_id,'Спик инглиш')
    })
};

start()
