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

 function format(tests: string[]): string {
    const columns = 4;
    const rows = Math.floor(tests.length/columns);
    let str = 'Результат\n';
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < columns; j++) {
            str+= `${i+j*5 + 1}. ${tests[i+j*5]}`;
            str+= '    '; // problems with \t
        }
        str+='\n'
    } 
    console.log(str);
    return str; 
 }

 format(tests);
 