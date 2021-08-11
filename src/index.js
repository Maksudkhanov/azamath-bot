const { Telegraf } = require('telegraf')
const validateAnswer = require('./processAnswers/validateAnswers').module;
const checkAnswer = require('./processAnswers/checkTest').module;
const token = require('./token');

const bot = new Telegraf(token)

bot.start(async (ctx) => {
  const userId = ctx.message.chat.id;
  const firstName = ctx.message.chat.first_name

  const message = 'Здравствуйте, ' + firstName + '\nВыберите команду';
  ctx.telegram.sendMessage(userId, message, startOptions);
})

bot.action('checkTest', async (ctx) => {
  ctx.reply('Отправьте мне ответы\n');
  ctx.reply('Lifehack: Можно отправить четные номера заглавными, а нечетные строчными');

  bot.on('message', async (ctx) => {
  
    const userId = ctx.message.chat.id;
    const answer = ctx.message.text;
    
    const resultOfValidating = validateAnswer(answer);

    if (resultOfValidating === true) {
      const result = checkAnswer(answer, userId)
      console.log(ctx.message.from);
      return ctx.reply(result, { parse_mode: 'HTML' })
    }

    ctx.reply(resultOfValidating);
  });
  return
});


bot.action('getTest', async (ctx) => {
  await ctx.replyWithDocument({source: 'src/test/Тесты_нового_формата_часть_IV_с_ответами_AzaMath.pdf'});
  ctx.reply('Вы получили тесты! \nУдачи при решении😊');
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

bot.launch({dropPendingUpdates: true})
