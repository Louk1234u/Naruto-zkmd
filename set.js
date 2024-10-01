const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUlkcFB5Umk0a1FUem8xR0ZtYVpIMk5md055MUdmZUx5OGdQU1h2UmVHTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiN0dUd1UwdkhqVHkvVXIwdi9SNWswSDNqS2wrTEJVdWFxdFRLcERGQlJYYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5RndOQzBNRjl3WFJISlZ3bXp6S0VjcFZPU1VvMERMNlZ4ekNzOXRxVWw0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBM2N1cUJRTWdkODUweWZKbTdZbFJmM2d5OEEwNUlSZ1ZEZDhXVWJHdGh3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhMazZoVVFkK1hlZ3JEeDRBYlZZQTFOc3BBdmk0Ynl3aS9PQmNjWTVZbWc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFnUVA2cE5uL3htOFpSS3UyRnNXWXBmMUhQZ0RxU1FlSUpzYmk5TUVtQjg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0VoZHViVWJrMkZCOHdCVGt0NHMwNzdESHFqelZWR1hYRWcwanZnT3YyTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQWV0TmNNYVdvWno0dUJMYUpwL3U5aXZjRjY2Q2VHa0RxUUw3eS90cDNBST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImkraS8zQTRJNmM0RHV5RnQ3Z0tTTXpJMUFKQUUxTWNmUDh3WUhtWE9DNkdFb1FmTlFueEhOWlF3TjZLTzNZczNLMlZyTk5SMitOMEx0cTYzZzlsSUF3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjIwLCJhZHZTZWNyZXRLZXkiOiJqN1dYb2lHemwxazFKVDhDMGxoUWhPSUJTQjFqZ2VCSVZLMW40SUtINThvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiaUwwUXp2RlFTVktVS1o1eWZtd1ZNUSIsInBob25lSWQiOiI1YmExY2ZhYy0zZTFkLTRmMzYtOTRkZS0wNGU2OTVjMzZhYmEiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWGlSUUd5RWZCdmtpWkd4d2IvYk8wMnVLOERZPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImU3am12Q2NwYjhZVU11elhLQ1FhYzRIdEptOD0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJTRjM4OFNOUiIsIm1lIjp7ImlkIjoiMjI1MDIzMzE5ODg6NzNAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi4LyGyp/htI/htJzhtItz4bSPybQg4bWY4ba74bWY4bWQ4bWD4bWP4oGx4LySIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMVGN6NG9ERU9MNDhiY0dHQXdnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJTcVNCSS9NdzFLWE91bW1uUFlkUGZkNytYQkozWHByUUhieGJJaHhweVg4PSIsImFjY291bnRTaWduYXR1cmUiOiJQdUs3dmU2MmhaZjVjWmtQclVmVW1OWEFpQ3J2enlSZlE1MHJuSWtyRFM5RDQ5eDRKS2Y1bE91YUhUdlR3UFhvak03WlNjMGF0UWNvYTJCWkY0VlVDdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiZU55MUlzd0Q0YVRPZ1AyNHV0cVVKWks3aUc4cU9SZndST0JEekRCOXJiT0xGUVFUMlBxZjQ1SXVxRHBsRkpKa1BjWU1oNkJIZFBxRmpJT3NHc0V1QVE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMjUwMjMzMTk4ODo3M0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJVcWtnU1B6TU5TbHpycHBwejJIVDMzZS9sd1NkMTZhMEIyOFd5SWNhY2wvIn19XSwicGxhdGZvcm0iOiJzbWJhIn0=',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE,
    NOM_OWNER: process.env.NOM_OWNER || "✮✮✮ʟᴏᴜᴋsᴏɴ ᵘᶻᵘᵐᵃᵏⁱ₊ ͟͟͞͞➳",
    NUMERO_OWNER : process.env.NUMERO_OWNER,              
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "non",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PUBLIC,
    PM_PERMIT: process.env.PM_PERMIT || 'non',
    BOT : process.env.NOM_BOT || 'NARUTO-MD',
    URL : process.env.LIENS_MENU || 'https://telegra.ph/file/085c4b1068f0f4f8db970.mp4',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    //GPT : process.env.OPENAI_API_KEY,
    DP : process.env.STARTING_BOT_MESSAGE || 'oui',
    ATD : process.env.ANTI_DELETE_MESSAGE || 'non',            
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
