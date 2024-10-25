const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUlaNFBxZ2ZiMk1OeDJoQ000a3lqQ3BsN01peXdncXVyMjZMa2ZyR3YyQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZGFwV1lWaWR0bEZvSjFsSklha0h4WjJ6dE51ckJ6S2lNdENiS010TTVXND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFTVdHYVp0MlAvVm1kdXptRWtQcjZJM09zNVc1WG9WOXdoQ2NKNVBNQTJnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJOUDhkSllXZnVxUFExbjRVU0FPekhoQ21ZMGRhc3I5RzhaU2JYS2MyTDFRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVOaXpUTW5UcGIvTWdEckI0ZVZjVEVQNlBSc3FLYlA5anFLelVucFpwWFk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVwaUE1TjhwUldSTk54aVk0MXFMbkdtMlljSFEyeiswL2FmNmIrOGFEMHc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0VKZ0k1TUJRaU13L09CckQrdkRMLzJ6TVh2YkNMNlg3Sm5QQWtCOUIxYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibzByOHF2YjBFZ0ZFUFNPUmVqR2k5UG5CSGlNT2l4NnNiZVY5Q21BT25TYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImcrQVI1enBacXZxeER4aUVsaEdlTTZSQnVyZlE5TkhrM1BjNmhaRXJpbkZGLzVjTGt0V2NXUE1rM1lPUnN3em5OVGRGZ3cra1p1Qnk3akNGNklRWGdnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTI4LCJhZHZTZWNyZXRLZXkiOiJpNmhVM3I5MklRWFM0MFlLVWJ0WXExR3dyNEtXRmxsYjByMVJDcy8vdFlrPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJnYlNuSHMwd1RrZW9aVXpLc1NRV3p3IiwicGhvbmVJZCI6ImE1MjlhMzA4LWE3ODEtNDk3OC1iNzg0LTI4MjhkNGQ4ZTUxZiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYV1RmcXIwOXVscCtPSGdsUHJ4SWtEdnNPRTg9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiamNhUkhRaUxSaVZuSytLNHNBQmVmTnJ2NTJzPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkJQSFRBM1Y0IiwibWUiOnsiaWQiOiI5NDc2NjAzNDk0MzoyMkBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTXlwemRrQkVNQ3Q3N2dHR0FRZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoidnFBb3ZoQ2NtQ05mMGVXWUYvbGtMQUJsaVlmS014S0h0d3llaTNFeUpDOD0iLCJhY2NvdW50U2lnbmF0dXJlIjoiVUk0dldYMXlmQk4wY1BqQzZreGVXMTZOWHNNWWoyWm9kb3pwMWpZbndUbTZ3NFFCemdnNlFaK3N3ZG9JSHExT2Jad1REQ0ZXOFZpTU54dzNUMnlDQmc9PSIsImRldmljZVNpZ25hdHVyZSI6InVxdHp3WXdQZ0gybEFBcTdFTDVWMlBOV0Z6dnBlVnVacUczLzMxWDUvVWgvRkxYVE82VjFXSys2MGxib0RlQnBaVWE0Uk5lbmhWNC8vaXJqa1NrUWlnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTQ3NjYwMzQ5NDM6MjJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYjZnS0w0UW5KZ2pYOUhsbUJmNVpDd0FaWW1IeWpNU2g3Y01ub3R4TWlRdiJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyOTg3NzcxMCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFHRGoifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "keithkeizzah",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " keithkeizzah",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '𝐀𝐋𝐏𝐇𝐀-𝐌𝐃',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0c351a67f1dffd1f34cf5.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
