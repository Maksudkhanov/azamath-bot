const { Telegraf, HttpError } = require('telegraf')
const validateAnswer = require('./processAnswers/validateAnswers');
const checkAnswer = require('./processAnswers/checkTest');
const token = require('./token');
const adminId = 525652830;

const bot = new Telegraf(token)

bot.start(async (ctx) => {
  const userId = ctx.message.chat.id;
  const firstName = ctx.message.chat.first_name

  const message = 'Здравствуйте, ' + firstName + '\nВыберите команду';
  ctx.telegram.sendMessage(userId, message, startOptions);
})

bot.action('checkTest', async (ctx) => {
  await ctx.reply('Отправьте мне ответы\n');
  ctx.reply('Lifehack: Можно отправить четные номера заглавными, а нечетные строчными');

  bot.on('message', async (ctx) => {

    const userName = ctx.message.chat.username || '';;
    const firstName = ctx.message.chat.first_name || '';;
    const secondName = ctx.message.chat.last_name || '';  
    const userId = ctx.message.chat.id;
    const answer = ctx.message.text;
    
    const answerValidated = validateAnswer(answer);

    if(answerValidated.state === false) {
      ctx.reply(answerValidated.message)
    }

    if (answerValidated.state === true) {
      const result = checkAnswer(answer, userId)
      const resultForAdmin = (`Имя: ${firstName} Фамилия: ${secondName} \nUsername: @${userName}\n${result}`).bold() 
      
      ctx.telegram.sendMessage(adminId, resultForAdmin, { parse_mode: 'HTML' } )
      ctx.reply(result, { parse_mode: 'HTML' })
    }
  });
});


bot.action('getTest', async (ctx) => {
  const user = ctx.update.callback_query.message.chat;
  const firstName = user.first_name || '';
  const secondName = user.last_name || '';

  await ctx.replyWithDocument({source: 'src/test/Онлайн тест II AzaMath.pdf'});
  ctx.reply('Вы получили тесты! \nУдачи при решении😊');
  ctx.telegram.sendMessage(adminId, `${firstName} ${secondName} получил тесты`)
});

bot.catch((err) => {
  console.log('Ooops', err)
  if (err instanceof HttpError) {
    console.error("Could not contact Telegram:", err);
  }
})


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
