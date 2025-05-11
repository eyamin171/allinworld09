const TelegramBot = require('node-telegram-bot-api');

// BotFather থেকে পাওয়া টোকেন
const token = '7779616467:AAHFD9psuEFXBlnbMixNSVJnupnV8MRHaEY';
const CHANNEL_USERNAME = '@allinworldbackup'; // চ্যানেলের username

const bot = new TelegramBot(token, { polling: true });

// চ্যানেল সাবস্ক্রিপশন চেক করার ফাংশন
async function isSubscribed(chatId) {
  try {
    const res = await bot.getChatMember(CHANNEL_USERNAME, chatId);
    return ['member', 'creator', 'administrator'].includes(res.status);
  } catch (e) {
    return false;
  }
}

// /start command
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const welcomeText = `Welcome To WP Checker All In World\n\nPlease Subscribe Our Channel 👇
https://t.me/+cg8iR1s-C79hZjU1
https://t.me/allinworldbackup
https://t.me/otpreciveallinworld`;

  const subscribed = await isSubscribed(chatId);

  if (!subscribed) {
    bot.sendMessage(chatId, welcomeText);
  } else {
    bot.sendMessage(chatId, 'Send phone numbers (space separated):');
  }
});

// নাম্বার মেসেজ এলে
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text.startsWith('/')) return; // কমান্ড স্কিপ

  const subscribed = await isSubscribed(chatId);
  if (!subscribed) {
    bot.sendMessage(chatId, 'Please subscribe to our channel first!');
    return;
  }

  // নাম্বার আলাদা করি
  const numbers = text.match(/\d{7,15}/g);
  if (!numbers) {
    bot.sendMessage(chatId, 'Please send valid phone numbers.');
    return;
  }

  // একে একে সব নাম্বার চেক করি (এখানে আমরা শুধু ডেমো আউটপুট দিব, আসল API দরকার বাস্তব চেক করতে)
  for (const number of numbers) {
    // আসল API ব্যাবহার করলে এখানে ফেচ করতে হবে
    bot.sendMessage(chatId, `${number} is on WhatsApp (demo).`);
  }
});