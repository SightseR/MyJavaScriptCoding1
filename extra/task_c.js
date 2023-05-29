function setValues() {
    var num1 = parseInt(document.getElementById("num1").value);
    var num2 = parseInt(document.getElementById("num2").value);
    var outputDiv = document.getElementById("output");
    var totalHip = document.getElementById("totalHip");
    var totalHop = document.getElementById("totalHop");
    var totalInt = document.getElementById("totalInt");
    var extra = document.getElementById("extra");
    var countHip = 0;
    var countHop = 0;
    var countInt = 0;
    outputDiv.innerHTML = "";
    var lowerNum = Math.min(num1, num2);
    var higherNum = Math.max(num1, num2);
    for (var i = lowerNum; i <= higherNum; i++) {
        var line = "";
        if (i % 3 === 0) {
            line += "hip";
            countHip++
        }
        if (i % 7 === 0) {
            line += "hop";
            countHop++
        }
        if (line === "") {
            line = i;
            countInt++
        }
        var newLine = document.createElement("p");
        newLine.innerHTML = line;
        outputDiv.appendChild(newLine);


    }

    extra.innerHTML = "Extra information: (Not required in the Task)";
    totalHip.innerHTML = "hip count: " + countHip;
    totalHop.innerHTML = "hop count: " + countHop;
    totalInt.innerHTML = "Integer count: " + countInt;
}
