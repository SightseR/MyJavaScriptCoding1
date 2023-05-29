function task1(){

var a = Math.floor(Math.random() * 5) + 1;
var b = Math.floor(Math.random() * 5) + 1;

if (a < b) {
  value =  a + " is less than " + b;
}

else if (a > b) {
  value =  a + " is greater than " + b;
}

else {
  value = a + " is equal to " + b;
}

console.log(value);

}

task1();

function task2(min, max){

    for(var i = min; i <= max; i++){

        if (i % 2 == 0){
        console.log(i);
        }
    }

    for(var i = min; i <= max; i++){

        if (i % 2 == 1){
        console.log(i);
        }
    }
}

task2(-3,4);


function task3(min, max){

    const numbers = [];
    var j = 0;

    for(var i = min; i <= max; i++){

        if (i % 2 == 0){

            numbers[j] =  ' ' + i;
            j++;
        }
    }

    for(var i = max; i >= min; i--){

        if (i % 2 == 1){

         numbers[j] = ' ' + i;
         j++;

        }
    }


    console.log ('[' + numbers + ' ]')

}

task3(3,7);


function task4(testString){

    let textLength = testString.length;
    let textStart = testString.substring(0, Math.floor(textLength / 2)).toLowerCase();
    let textEnd = testString.substring(textLength - Math.floor(textLength / 2)).toLowerCase();

    let reverseOrder = textEnd.split('').reverse().join('');
    return (textStart === reverseOrder);

}
console.log(task4('taco cat'));
console.log(task4('radar'));
console.log(task4('step on no pets'));
console.log(task4('REDder'));


