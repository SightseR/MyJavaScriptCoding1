//JS code for 10 x 10 hecker board layoout with numbered squares.
//Numbers started from 00 and ended with 99
//Theme - Blue


window.onload = function() {
var flag = true;
var num = 0;

var heading = document.createElement("h1");
heading.innerHTML = "Content Created by JavaScript Code";
heading.style = "color:#000099; margin: 50px 0 0 100px; font-size: 31px; ";
document.body.insertBefore(heading, document.body.firstChild);

for (var i = 100; i<600; i+=50){
flag = !flag;
for (var j = 100; j<600; j+=50){

var elem = document.createElement("div");

if(flag == true){
    color = "#ccffff";
    numText = "#000099"
}
else {
    color = "blue";
    numText = "white"
}

flag = !flag;
var style_string = "display: flex; justify-content: center; align-items: center; font-size: 18px; font-weight: bold; color: " + numText + "; border:2px solid blue; position:absolute; background-color:" + color + "; height:50px; width:50px;top:" + i + "px;left:" + j + "px";
elem.setAttribute("style",style_string);
elem.innerHTML = num.toString().padStart(2, "0");
num++;
document.body.append(elem);

}
}
};