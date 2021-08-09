const correctAnswers = require('../test/correctAnswers').module
const ids = [];

function checkAnswer(answer, userId) {
    let result = 'Результат \n'
    
    if(ids.includes(userId)) {
        return 'Вы уже отправили ответы'
    }

    ids.push(userId);

    let numberOfCorrect = 0
    for(let i = 0; i < correctAnswers.length; i++) {
        if(correctAnswers[i] === answer[i].toLowerCase()) {
            result += [i+1] + '. ✅ \n';
            numberOfCorrect++;
        } else {
            result += [i+1] + '. ❌\n';
        }
    }
    result+= '\nКоличество правильных: ' + numberOfCorrect
    
    return result.bold()
}

exports.module = checkAnswer;