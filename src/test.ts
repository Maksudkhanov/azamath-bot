const tests: string[] = [
    /*1*/ 'c',
    /*2*/ 'c',
    /*3*/ 'c',
    /*4*/ 'd',
    /*5*/ 'b',
    /*6*/ 'd',
    /*7*/ 'a',
    /*8*/ 'c',
    /*9*/ 'b',
    /*10*/ 'b',
    /*11*/ 'c',
    /*12*/ 'b',
    /*13*/ 'a',
    /*14*/ 'c',
    /*15*/ 'a',
    /*16*/ 'b',
    /*17*/ 'c',
    /*18*/ 'a',
    /*19*/ 'b',
    /*20*/ 'd'  
 ];


//     const results = 
// `Результат
// 1. ${result[0]}     6. ${result[5]}     11. ${result[10]}     16. ${result[15]}
// 2. ${result[1]}     7. ${result[6]}     12. ${result[11]}     17. ${result[16]}
// 3. ${result[2]}     8. ${result[7]}     13. ${result[12]}     18. ${result[17]}
// 4. ${result[3]}     9. ${result[8]}     14. ${result[13]}     19. ${result[18]}
// 5. ${result[4]}   10. ${result[9]}     15. ${result[14]}     20. ${result[19]}
// \nКоличество правильных: ${numberOfCorrect}`

 function format(tests: string[]): string {
    const columns = 4;
    const rows = Math.floor(tests.length/columns);
    let str = 'Результат\n';
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < columns; j++) {
            const number = i+j*5 + 1
            const numberResult = tests[i+j*5]
            str+= `${number}. ${numberResult}`;
            str+= '    '; // problems with \t
            if(number > 0 && number < 5) {
                str+= ' '
            }
        }
        str+='\n'
    } 
    console.log(str);
    return str; 
 }

 format(tests);
 