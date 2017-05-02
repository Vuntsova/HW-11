//inquirer
var inquirer = require("inquirer");
//base connection
var base = require('./base.js');

//cloze connection
var cloze = require('./cloze.js');
//BasicCards.json connection
var cardData = require("./BasicCards.json");
//FS
var fs = require("fs");
// console.log(cardData);
var cardArray = [];
// Current Question
var index = 0;
// Correct Answers
var correctAnswers = 0;
// Incorrect Answers
var incorrectAnswers = 0;
// console.log(cardData.length);
// console.log(cardArray);

//Asking the user which game they want to play
function askUser(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Do you want to create a question or play a game?',
            choices:['create a question', 'play a game']
        }
    ])
        .then(function(answer){
            //If the users choice is basic....
            if(answer.choice === 'create a question'){
                CreateClozeCard();
            }
            // If users answer is cloze.......
            else if(answer.choice === 'play a game'){
                ask();
            }
        });
}
askUser();

//Creating a (...) question and pushing it to clozeCards.json
function ClozeCard(fullText,answer) {
    var clozePositions = clozeDelete(fullText,answer);

    this.partial = getPartial(fullText,clozePositions);
    this.answer=answer;

    function clozeDelete(fullText, answer) {
        var start = fullText.indexOf(answer);
        if(start !== -1){
            return [start, start+answer.length];
        }
        throw new Error("Could not find in fullText");
    }
    function getPartial(fullText, clozePositions) {
        var start = fullText.slice(0, clozePositions[0]);
        var end = fullText.slice(clozePositions[1], fullText.length);
        return start + " ... "+end;
    }

}

ClozeCard.prototype.displayCard = function displayCard() {
    console.log(this.partial.replace(this.answer," ... "));
}

ClozeCard.prototype.displayAnswer = function displayAnswer() {
    console.log(this.answer);
}

function CreateClozeCard(){
    inquirer.prompt([{
        type: "input",
        name: "fullText",
        message: "What is the question you want to create?\n(Your Question needs to contain the right answer.)"
    },{
        type: "input",
        name: "answer",
        message: "What is the answer you want to the give?"
    }
    ]).then(function (inputs) {
        var card = new ClozeCard(inputs.fullText, inputs.answer);
        // console.log(card);
        cardDataCloze.push(card);
        card.displayCard();
        card.displayAnswer();

        var newcardDataCloze = JSON.stringify(cardDataCloze,null, "\t");
        fs.writeFile('./clozeCards.json',newcardDataCloze,function (err) {
            if(err)throw err;
            console.log("Done!");
            askUser();
        })

    })
}

//Creating a function for quiz

for (var i = 0; i < cardData.length; i++) {
    var newCard = new base(cardData[i].front, cardData[i].back);
    cardArray.push(newCard);
}
// console.log(newCard);

function ask() {
    inquirer.prompt([
        {
            type: "input",
            message: cardArray[index].front + '\nAnswer: ',
            name: "userAnswer"

        }
    ]).then(function (answers) {
        console.log("\n");
        if (answers.userAnswer === cardArray[index].back) {
            console.log("'"+cardArray[index].back+"'" + " is the correct answer! Great job!" + "\n<><><><><><><><><><><><><><><><><><><><><><>\n");
            // console.log('Your score: ' + "\nCorrect Answers: "+correctAnswers+"\nIncorrect Answers: " + incorrectAnswers + "\n===================\n");
            // // console.log(index);
            correctAnswers++;
        } else {
            console.log("Incorrect answer!");
            // console.log('Your score: ' + "\nCorrect Answers: "+correctAnswers+"\nIncorrect Answers: " + incorrectAnswers + "\n===================\n");
            // // console.log(index);

            incorrectAnswers++;
            // Show the correct answer
            console.log('Correct answer is: ' + cardArray[index].back);
            console.log("\n<><><><><><><><><><><><><><><><><><><><><><>\n");
        }

        // Next question
        if (index < cardData.length - 1) {
            index++;
            ask();
        }else {
            //Game over and start from beginning
            console.log('Your score: ' + "\nCorrect Answers: "+correctAnswers+"\nIncorrect Answers: " + incorrectAnswers + "\n===================\n");
            askUser();
        }


})
}

//This is a function that creates basic cards and push them to BasicCards.json

function CreateBasicCard(){
    inquirer.prompt([{
        type: "input",
        name: "frontSide",
        message: "What is the question you want to ask?"
    },{
        type: "input",
        name: "backSide",
        message: "What is the answer to the question?"
    }
    ]).then(function (inputs) {
        var card = new base(inputs.frontSide, inputs.backSide);
        cardData.push(card);

        var newCardData = JSON.stringify(cardData,null, "\t");
        fs.writeFile('./BasicCards.json',newCardData,function (err) {
            if(err)throw err;
            console.log("Done!");
        })

    })
}

var cardDataCloze = require("./clozeCards.json");

