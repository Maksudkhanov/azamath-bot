const correctAnswers = require('../test/correctAnswers').module

function validateAnswer(answer) {
    if(!areLettersOnly(answer) || answer === undefined) {
        return 'Отправьте ответы в текстовом формате';
    }

    if(!isLengthEqual(answer)) {
       
        return 'Неправильное количество ответов. Попробуйте снова'
    }

    return true
}

function areLettersOnly(answer) {
    return (/[a-zA-Z]/).test(answer);
}

function isLengthEqual(answer) {
    const correctAnswersLength = correctAnswers.length;
    return correctAnswersLength === answer.length;
}

exports.module = validateAnswer


