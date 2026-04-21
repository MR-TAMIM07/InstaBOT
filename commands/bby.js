const axios = require("axios");

const mahmud = [
  "baby", "bby", "babu", "bbu", "jan", "bot", "জান", "জানু", "বেবি", "wifey", "marin"
];

const randomMessages = [
  "babu khuda lagse🥺", "Hop beda😾,Boss বল boss😼", "আমাকে ডাকলে ,আমি কিন্তূ কিস করে দেবো😘 ", "🐒🐒🐒", "bye",
  "naw amr boss k message daw m.me/its.x.tamim", "mb ney bye", "meww", "গোলাপ ফুল এর জায়গায় আমি দিলাম তোমায় মেসেজ",
  "বলো কি বলবা, সবার সামনে বলবা নাকি?🤭🤏", "𝗜 𝗹𝗼𝐯𝐞 𝘆𝗼𝘂__😘😘", "𝗜 𝗵𝗮𝘁𝗲 𝘆𝗼𝘂__😏😏", "গোসল করে আসো যাও😑😩",
  "অ্যাসলামওয়ালিকুম", "কেমন আসো", "বলেন sir__😌", "বলেন ম্যাডাম__😌", "আমি অন্যের জিনিসের সাথে কথা বলি না__😏ওকে",
  "বলো কি বলবা, সবার সামনে বলবা নাকি?🤭🤏", "🙂🙂🙂", "এটায় দেখার বাকি সিলো_🙂🙂🙂", "𝗕𝗯𝘆 𝗯𝗼𝗹𝗹𝗮 𝗽𝗮𝗽 𝗵𝗼𝗶𝗯𝗼 😒😒",
  "𝗧𝗮𝗿𝗽𝗼𝗿 𝗯𝗼𝗹𝗼_🙂", "𝗕𝘀𝗵𝗶 𝗱𝗮𝗸𝗹𝗲 𝗮𝗺𝗺𝘂 𝗯𝗼𝗸𝗮 𝗱𝗲𝗯𝗮 𝘁𝗼__🥺", "𝗕𝘆 না জানু, বল 😌", "বেশি bby Bbby করলে leave নিবো কিন্তু 😒😒",
  "__বেশি বেবি বললে কামুর দিমু 🤭🤭", "𝙏𝙪𝙢𝙖𝙧 𝙜𝙛 𝙣𝙖𝙞, 𝙩𝙖𝙮 𝙖𝙢𝙠 𝙙𝙖𝙠𝙨𝙤? 😂😂😂", "bolo baby😒", "তোর কথা তোর বাড়ি কেউ শুনে না ,তো আমি কোনো শুনবো ?🤔😂",
  "আমি তো অন্ধ কিছু দেখি না🐸 😎", "আম গাছে আম নাই ঢিল কেন মারো, তোমার সাথে প্রেম নাই বেবি কেন ডাকো 😒🫣",
  "𝗼𝗶𝗶 ঘুমানোর আগে.! তোমার মনটা কথায় রেখে ঘুমাও.!🤔_নাহ মানে চুরি করতাম 😞😘", "𝗕𝗯𝘆 না বলে 𝗕𝗼𝘄 বলো 😘",
  "দূরে যা, তোর কোনো কাজ নাই, শুধু 𝗯𝗯𝘆 𝗯𝗯𝘆 করis 😉😋🤣", "এই এই তোর পরীক্ষা কবে? শুধু 𝗕𝘆 𝗯𝗯𝘆 করিস 😾",
  "তোরা যে হারে 𝗕𝘆 ডাকছিস আমি তো সত্যি বাচ্চা হয়ে যাবো_☹😑", "আজব তো__😒", "আমাকে ডেকো না,আমি ব্যাস্ত আসি🙆🏻‍♀",
  "𝗕𝘆 বললে চাকরি থাকবে না", "চুপ থাক নাই তো তোর দাত ভেংগে দিবো কিন্তু", "আমার সোনার বাংলা, তারপরে লাইন কি? 🙈",
  "🍺 এই নাও জুস খাও..!𝗕𝘆 বলতে বলতে হাপায় গেছো না 🥲", "হটাৎ আমাকে মনে পড়লো 🙄", "𝗕𝘆 বলে অসম্মান করচ্ছিছ,😰😿",
  "𝗔𝘀𝘀𝗮𝗹𝗮𝗺𝘂𝗹𝗮𝗶𝗸𝘂𝗺 🐤🐤", "আমি তোমার সিনিয়র আপু ওকে 😼সম্মান দেও🙁", "খাওয়া দাওয়া করসো 🙄", "এত কাছেও এসো না,প্রেম এ পরে যাবো তো 🙈",
  "আরে আমি মজা করার mood এ নাই😒", "𝗛𝗲𝘆 𝗛𝗮𝗻𝗱𝘀𝗼𝗺𝗲 বলো 😁😁", "আরে Bolo আমার জান, কেমন আসো? 😚", "একটা BF খুঁজে দাও 😿",
  "ফ্রেন্ড রিকোয়েস্ট দিলে ৫ টাকা দিবো 😗", "oi mama ar dakis na pilis 😿", "🐤🐤", "__ভালো হয়ে  যাও 😑😒",
  "এমবি কিনে দাও না_🥺🥺", "ওই মামা_আর ডাকিস না প্লিজ", "৩২ তারিখ আমার বিয়ে 🐤", "হা বলো😒,কি করতে পারি😐😑?", "বলো ফুলটুশি_😘",
  "amr JaNu lagbe,Tumi ki single aso?", "আমাকে না দেকে একটু পড়তেও বসতে তো পারো 🥺🥺", "তোর বিয়ে হয় নি 𝗕𝘆 হইলো কিভাবে,,🙄",
  "আজ একটা ফোন নাই বলে রিপ্লাই দিতে পারলাম না_🙄", "চৌধুরী সাহেব আমি গরিব হতে পারি😾🤭 -কিন্তু বড়লোক না🥹 😫",
  "আমি অন্যের জিনিসের সাথে কথা বলি না__😏ওকে", "বলো কি বলবা, সবার সামনে বলবা নাকি?🤭🤏", "ভুলে জাও আমাকে 😞😞",
  "দেখা হলে কাঠগোলাপ দিও..🤗", "শুনবো না😼 তুমি আমাকে প্রেম করাই দাও নি🥺 পচা তুমি🥺", "আরে আগে একটা গান বলো, ☹ নাহলে কথা বলবো না 🥺",
  "বলো কি করতে পারি তোমার জন্য 😚", "কথা দেও আমাকে পটাবা...!! 😌", "বার বার Disturb করেছিস কোনো 😾, আমার জানু এর সাথে ব্যাস্ত আসি 😋",
  "আমাকে না দেকে একটু পড়তে বসতেও তো পারো 🥺🥺", "বার বার ডাকলে মাথা গরম হয় কিন্তু 😑😒", "ওই তুমি single না?🫵🤨 😑😒", "বলো জানু 😒", "Meow🐤",
  "আর কত বার ডাকবা ,শুনছি তো 🤷🏻‍♀", "কি হলো, মিস টিস করচ্ছো নাকি 🤣", "Bolo Babu, তুমি কি আমাকে ভালোবাসো? 🙈", "আমি তো অন্ধ কিছু দেখি না🐸",
  "আমি হাজারো মশার Crush😓", "প্রেম করার বয়সে লেখাপড়া করতেছি, রেজাল্ট তো খা/রা'প হবেই.!🙂",
  "আমার ইয়ারফোন চু'রি হয়ে গিয়েছে!! কিন্তু চোর'কে গা-লি দিলে আমার বন্ধু রেগে যায়!'🙂",
  "ছেলেদের প্রতি আমার এক আকাশ পরিমান শরম🥹🫣", "__ফ্রী ফে'সবুক চালাই কা'রন ছেলেদের মুখ দেখা হারাম 😌", "মন সুন্দর বানাও মুখের জন্য তো 'Snapchat' আছেই! 🌚"
];

const baseApiUrl = async () => {
  const base = await axios.get("https://raw.githubusercontent.com/mahmudx7/HINATA/main/baseApiUrl.json");
  return base.data.mahmud;
};

module.exports = {
  config: {
    name: "baby",
    aliases: ["hinata", "bby", "bbu", "jan", "marin", "wifey", "bot"],
    version: "1.7",
    author: "—͟͞͞𝐓𝐀𝐌𝐈𝐌",
    countDown: 5,
    role: 0,
    category: "chat",
    guide: "{p}baby [message]"
  },

  // 'onStart' er bodole ekhane 'run' use kora holo
  run: async function ({ api, event, args, usersData }) {
    const { threadID, messageID, senderID } = event;
    const msg = (args && args.length > 0) ? args.join(" ").toLowerCase() : "";
    
    try {
      const baseUrl = await baseApiUrl();

      // Manual Teach Commands
      if (args[0] === "teach") {
        const content = msg.replace("teach ", "");
        const [trigger, ...responsesArr] = content.split(" - ");
        const responses = responsesArr.join(" - ");
        if (!trigger || !responses) return api.sendMessage("❌ | teach [q] - [r]", threadID, messageID);
        await axios.post(`${baseUrl}/api/jan/teach`, { trigger, responses, userID: senderID });
        return api.sendMessage(`✅ Replies added!`, threadID, messageID);
      }

      // Random reply checking
      if (!msg || mahmud.some(word => msg === word)) {
        const randomMsg = randomMessages[Math.floor(Math.random() * randomMessages.length)];
        return api.sendMessage(randomMsg, threadID, messageID);
      }

      // Default AI Response
      const res = await axios.post(`${baseUrl}/api/hinata`, { text: msg, style: 3 });
      return api.sendMessage(res.data.message || "error janu🥹", threadID, messageID);

    } catch (err) {
      console.error(err);
      api.sendMessage("Error: " + err.message, threadID, messageID);
    }
  }
};
