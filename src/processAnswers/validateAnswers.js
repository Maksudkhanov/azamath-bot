const correctAnswers = require('../test/correctAnswers')

function validateAnswer(answer) {
    if(!areLettersOnly(answer) || answer === undefined) {
        return {
            state: false,
            message: 'Отправьте ответы в текстовом формате'
        }
    }

    if(!isLengthEqual(answer)) {
       
        return {
            state: false,
            message: 'Неправильное количество ответов. Попробуйте снова'
        }
    }

    return {state: true}
}

function areLettersOnly(answer) {
    return (/[a-zA-Z]/).test(answer);
}

function isLengthEqual(answer) {
    const correctAnswersLength = correctAnswers.length;
    return correctAnswersLength === answer.length;
}

module.exports = validateAnswer


