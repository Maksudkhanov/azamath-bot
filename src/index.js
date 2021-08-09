const { Telegraf } = require('telegraf')
const validateAnswer = require('./processAnswers/validateAnswers').module;
const checkAnswer = require('./processAnswers/checkTest').module;

const bot = new Telegraf('1918945423:AAG_AH6Bp3bNw7ib2Zj9Msw28Aq0aFsMbQM')

bot.start(async (ctx) => {
  const userId = ctx.message.chat.id;
  const message = 'Здравствуйте, ' + ctx.message.chat.first_name + '\nВыберите команду';
  ctx.telegram.sendMessage(userId, message, startOptions);
})

bot.action('checkTest', async (ctx) => {
  ctx.reply('Отправьте мне ответы');
  const userId = ctx.from.id;

  bot.on('message', async (ctx) => {
    const answer = ctx.message.text;
   
    const resultOfValidating = validateAnswer(answer)

    if (resultOfValidating === true) {
      const result = checkAnswer(answer, userId)
      ctx.reply(result, { parse_mode: 'HTML' })
      return
    }

    ctx.reply(resultOfValidating)
  });
});


bot.action('getTest', async (ctx) => {
  await ctx.replyWithPhoto({ source: 'src/test/test.jpg' });
  ctx.reply('Вы получили тесты! \nУдачи при решении 😊');
});


const startOptions = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'Проверка тестов', callback_data: 'checkTest' },
        { text: 'Получение тестов', callback_data: 'getTest' },
      ],
    ],
  }
};

const { telegram: tg } = bot

tg.callApi('getUpdates', { offset: -1 })
  .then(updates => updates.length && updates[0].update_id + 1)
  .then(offset => { if (offset) return tg.callApi('getUpdates', { offset }) })
  .then(() => bot.launch())
  .then(() => console.info('The bot is launched'))
  .catch(err => console.error(err))
