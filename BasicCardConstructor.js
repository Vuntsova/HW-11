/**
 * Created by webohweb on 4/22/17.
 */
var inquirer = require("inquirer");

var fs = require("fs");

var cardData = require("./BasicCards.json");
// console.log(cardData);

function BasicCards(frontSide, backSide){
    this.front = frontSide;
    this.back = backSide;

}

function CreateNewCard(){
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
        var card = new BasicCards(inputs.frontSide, inputs.backSide);
        cardData.push(card);

        var newCardData = JSON.stringify(cardData,null, "\t");
        fs.writeFile('./BasicCards.json',newCardData,function (err) {
            if(err)throw err;
            console.log("Done!");
        })

    })
}
CreateNewCard();