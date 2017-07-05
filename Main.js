var newBasic = require("./basicCard.js");
var newCloze = require("./clozeCard.js");
var inquirer = require("inquirer");

var cardDeck = [];
var cardCount = 0;
var deckSize = 0;

//  Prompt user for the type of flashcard they would like to make
function newCardQuestion() {
    inquirer.prompt([
    {
        name: "cardtype",
        type: "list",
        message: "Are you trying to make BASIC or CLOZE flashcards?",
        choices: ["Basic", "Cloze"]
    }, 
    
    {
        name: "numCards",
        type: "input",
        message: "How many cards are you wanting to make?",
// Make sure user inputs a number
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
// If statement to call close or basic functions based on user's input
    }]).then(function(answer) {

        if (answer.cardtype === "Basic") {
            deckSize = answer.numCards;
            deckOfBasic();
        } else {
            deckSize = answer.numCards;
            deckOfCloze();
        }
    });
};
// Function for creating basic flashcard deck
function deckOfBasic() {
    if (cardCount < deckSize) {
        console.log("\nNew basic card" + "\n-------------------------");
        inquirer.prompt([
            {
                name: "question",
                type: "input",
                message: "What is the question for the front of the card?"
            }, {
                name: "answer",
                type: "input",
                message: "What is the answer for the back of the card?"
            }]).then(function(cardinfo) {
                var newCard = new newBasic(cardinfo.question, cardinfo.answer);
                cardDeck.push(newCard);
                cardCount++;
                deckOfBasic();
            });
// Print the basic deck once card count has been reached by the user
    } else {
        console.log("\nHere's your deck of basic cards!" + "\n-------------------------");
        for (var x = 0; x < cardDeck.length; x++) {
            cardDeck[x].printInfo();
        }
    }
}
//function for creating cloze clashcard deck
function deckOfCloze() {
    if (cardCount < deckSize) {
        console.log("\nNew cloze card" + "\n-------------------------");
//user inputs the full and cloze strings
        inquirer.prompt([
            {
                name: "full",
                type: "input",
                message: "Enter your FULL card statement."
            }, {
                name: "cloze",
                type: "input",
                message: "Enter the portion of the sentence that you would like hidden from the flashcard."
            }
//Check to make sure the cloze string is included within the full string. output error message if false
        ]).then(function(cardinfo) {
            var newCard = new newCloze(cardinfo.full, cardinfo.cloze);
            if ((cardinfo.full).includes(cardinfo.cloze)) {
                cardDeck.push(newCard);
                cardCount++;
                deckOfCloze();                
            } else {
                console.log("\nSorry, the cloze statement doesn't match the full sentence, please try again");
                deckOfCloze();
            }
        });
// Prints the set of cloze flashcards for the user
    } else {
        console.log("\nHere's your deck of cloze cards!" + "\n-------------------------");
        for (var x = 0; x < cardDeck.length; x++) {
            cardDeck[x].printInfo();
        }
    }
}
newCardQuestion();
