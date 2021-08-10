const correctAnswers = require('../test/correctAnswers').module
const ids = [];

function checkAnswer(answer, userId) {
    let result = []

    if(ids.includes(userId)) {
        return 'Вы уже отправили ответы'
    }
   
    ids.push(userId);
  

    let numberOfCorrect = 0
    for(let i = 0; i < correctAnswers.length; i++) {
        if(correctAnswers[i] === answer[i].toLowerCase()) {
            result[i] = '✅';
            numberOfCorrect++;
        } else {
            result[i] = '❌';
        }
    }

    const results = 
`Результат
1. ${result[0]}     6. ${result[5]}     11. ${result[10]}     16. ${result[15]}
2. ${result[1]}     7. ${result[6]}     12. ${result[11]}     17. ${result[16]}
3. ${result[2]}     8. ${result[7]}     13. ${result[12]}     18. ${result[17]}
4. ${result[3]}     9. ${result[8]}     14. ${result[13]}     19. ${result[18]}
5. ${result[4]}   10. ${result[9]}     15. ${result[14]}     20. ${result[19]}
\nКоличество правильных: ${numberOfCorrect}`
    
    return results.bold()
}

exports.module = checkAnswer;