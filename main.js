/**
 * Created by webohweb on 4/23/17.
 */
/**
 * Created by Ariel on 4/8/2017.
 */

// require inquirer and fs to run the app, basic and cloze constructors in separate js files
var inquirer = require('inquirer');
var fs = require('fs');
    // basic = require('./BasicCardConstructor'),
    // cloze = require('./clozeCardsConstructor'),



function askUser(){
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: ['Make Flashcard', 'Take Quiz'],
            name: 'action'
        }
    ]).then(function (data) {
        switch (data.action) {
            // if user selects to make flashcard, prompt which type of flashcard to make
            case 'Make Flashcard':
                console.log('Hey good');
        }
    })
}