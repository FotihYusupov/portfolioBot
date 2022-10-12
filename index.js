import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import keyboard from "./helpers/keyboard.js";
import { read } from "./utils/FS.js";
import { geo } from "./utils/geoFinder.js";

dotenv.config();

const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true,
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(
    chatId,
    `Assalomu aleykum ${msg.from.first_name} mening portfolio botimga xush kelibsiz`,
    {
      reply_markup: {
        keyboard: keyboard.menu,
        resize_keyboard: true,
      },
    }
  );
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  if (msg.text == "My projects") {
    bot.sendMessage(chatId, "My Portfolio", {
      reply_markup: {
        keyboard: keyboard.projects,
        resize_keyboard: true,
      },
    });
  }

  if (msg.text === "Send the number") {
    bot.sendMessage(chatId, "Kontaktingizni ulashing", {
      reply_markup: JSON.stringify({
        keyboard: [
          [
            {
              text: "Kontaktni ulashish 📞",
              request_contact: true,
            },
            { text: "Back 🔙" },
          ],
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
      }),
    });
  }

  if(msg.text === 'Contact me'){
    bot.sendMessage(chatId, `
        Fotih Yusupov
Tel: +998 (93) 572-45-35
Telegramm: https://t.me/fot1h
Gmail: yusupovfotih158@gmail.com
    `)
  }

  if (msg.text == "Back 🔙") {
    bot.sendMessage(chatId, "Menyu", {
      reply_markup: {
        keyboard: keyboard.menu,
        resize_keyboard: true,
      },
    });
  }
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  const foundProject = read("projects.json").find((e) => e.name == msg.text);

  if (foundProject) {
    bot.sendPhoto(chatId, foundProject.image, {
      caption: `
            <b>Name 🪩</b>: ${foundProject.name}
            
⚒ Technologies:
    ${foundProject.technologies}
            `,
      parse_mode: "HTML",
    });
  }
});
