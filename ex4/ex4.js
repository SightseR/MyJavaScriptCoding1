function task5(a, b, p){            //Task 5

    let calc = a/b;

    let value = calc.toFixed(p);

    //console.log(value);


    return value;

    }




    function getEncryptor(alphabet, shift1, shift2, shift2freq) {            //Task 6

        const alp1= new Map();

        const alp2 = new Map();

        for (let i = 0; i < alphabet.length; i++) {

            alp1.set(alphabet[i], alphabet[(shift1 + i) % alphabet.length]);
            alp2.set(alphabet[i], alphabet[(shift2 + i) % alphabet.length]);

        }

        return function (msgText) {

            let encrypted = '';

            for (let i = 0; i < msgText.length; i++) {

                if (i % shift2freq === shift2freq - 1) {

                    encrypted = encrypted + alp2.get(msgText[i]);

                } else {

                    encrypted = encrypted + alp1.get(msgText[i]);

                }
            }

            return encrypted;

        }


      }

    const abc = '0123456789abcdefghijklmnopqrstuvwxyz ';
    const encode = getEncryptor(abc, 1, -3, 4); //expected output only get with +1 for shift1 value and -3 for shift2 value.
    console.log(encode('javascript'));