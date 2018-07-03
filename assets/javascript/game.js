$(function () {
    $('[data-toggle="popover"]').popover()
  })

var database = {"Guilty Pleasure Food" : ["HAMBURGER","PIZZA","HOTDOG","BROWNIES","POTATO CHIPS","FRIED CHICKEN","TWINKIES","ICECREAM","FRENCH FRIES","HOT POCKET"],
                "Common Cooking Term" : ["CARAMELIZE","SAUTE","BISQUE","BRAISE","DRESSING","FILLET","CONFIT","DEGLAZE","FRENCHING","INFUSION"],
                "Kitchen Utility" : ["GRATER","SPATULA","MEASURING SPOON","THERMOMETER","CUTTING BOARD","MIXING BOWL","WHISK","SKILLET","SAUCEPAN","CASSEROLE DISH"],
                "Fast Food Joint" : ["ARBYS","DEL TACO","MCDONALDS","BURGER KING","PANDA EXPRESS","WHITE CASTLE","CHIPOTLE","WIENERSCHNITZEL","DOMINOS","WENDYS"],
                "Obscure Cooking Term" : ["SOUS VIDE","AERATE","EMULSIFY","JULIENNE","AL DENTE","ROUX","ANDOUILLE","BOUILLON","CARPACCIO","HOLLANDAISE"],
                "Famous Chef/TV Personality" : ["GORDON RAMSAY","ANTHONY BOURDAIN","BOBBY FLAY","RACHAEL RAY","EMERIL LAGASSE","ALTON BROWN","MASAHARU MORIMOTO","GUY FIERI","WOLFGANG PUCK","MARTHA STEWART"],
                "All American Classic" : ["POT ROAST","CORNBREAD","CHICKEN FRIED STEAK","BISCUITS N GRAVY","JAMBALAYA","MEATLOAF","MAC N CHEESE","BUFFALO WINGS","APPLE PIE","BARBECUE RIBS"]
}

var tried = [];
var tries = 10;
var points = 0;

// Resets page.
function reset(){
tried = [];
tries = 10;
$(guessed).empty();
$(puzzle).empty();
document.querySelector("#tries").innerHTML = tries;
document.querySelector("#guessed").innerHTML = tried;
}

function play(){

var letterInput = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
't', 'u', 'v', 'w', 'x', 'y', 'z'];

// Computer choose random category.
var keys = Object.keys(database)
console.log(keys);
var category = keys[Math.floor(Math.random() * keys.length)];
document.querySelector("#category").innerHTML = category;
var question = database[category][Math.floor(Math.random() * 10)];
console.log("Category is " + category);
var answer = Array.from(question);
console.log("Question is " + question);
console.log(answer);
$(puzzle).empty();
var count = answer.length;

// Create guesses ul
for (i=0 ; i< answer.length ; i++){
    var node = document.createElement("li");
    var letter;
    if (answer[i] === " "){
        letter = document.createTextNode("-");
        node.appendChild(letter);
        document.getElementById("puzzle").appendChild(node).className = "box".id = "invis";
        count = count - 1;
    }else{
        letter = document.createTextNode(" _ ");
        node.appendChild(letter);
        document.getElementById("puzzle").appendChild(node).className = "box";
    }
}

// This function is run whenever the user presses a key.
document.onkeyup = function(event) {
    //Argument limits input to 26 letters only
    if (letterInput.includes(event.key)){
    // Determines which key was pressed.
    var userGuess = event.key.toUpperCase();
    // Adds new pressed key to array "tried".
    tried.push(userGuess);
    // Checks if user has guessed a letter right.
    if (question.includes(userGuess)){
        console.log("yay!")
    // Fills Blanks with correct guesses
        var idx = [], i = -1;
        while ((i = answer.indexOf(userGuess, i+1)) != -1){
            idx = i;
            var textnode = document.createTextNode(userGuess);
            var item = document.getElementById("puzzle").childNodes[idx];
            item.replaceChild(textnode, item.childNodes[0]);
            count = count - 1;
            }
        if (count === 0){
            reset();
            play();
            alert("YOU WIN!!! THE WORD IS " + question + "!")
        }
        
    }else{
        tries--
        console.log("wrong!")
        document.querySelector("#guessed").innerHTML = tries;
        if (tries < 1){
            alert("YOU LOST! THE WORD IS " + question + "! BETTER LUCK NEXT TIME!");
            reset();
            play();
        }
    }
    document.querySelector("#guessed").innerHTML = tried;
    document.querySelector("#tries").innerHTML = tries;
    letterInput=letterInput.filter(item => item !== event.key);

}  
}
}

