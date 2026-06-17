// =======================
// Declare variables
// =======================

// Main story text area
var story = document.getElementById("story");

// Footer of the site (not used yet, but stored)
var siteFooter = document.getElementById("siteFooter");

// Where questions are displayed
var question = document.getElementById("question");

// Container that holds the input and button
var answer = document.getElementById("answer");

// Text input where the user types their answer
var yourAnswer = document.getElementById("yourAnswer");

// Submit button
var submit = document.getElementById("submit");

// Array to store all user answers
var answers = [];

// =======================
// Event listeners
// =======================

// Listen for clicks on the submit button and call getAnswer()
submit.addEventListener("click", getAnswer);

// =======================
// Start the story
// =======================

// Ask the first question (question 0)
askQuestion(0);

// =======================
// Functions
// =======================

/*
 askQuestion()
 Displays a question based on the question number passed in
*/
function askQuestion(questionNumber) {

   // Make sure the answer area is visible
   answer.style.display = "block";

   // Reset answers array to the current question number
   answers.length = questionNumber;

   // Choose which question to ask
   switch (questionNumber) {
      case 0:
         question.innerHTML = "Are you ready to play?";
         break;
      case 1:
         question.innerHTML = "Go to Earth, or stay in Asgard?";
         break;
      case 2:
         question.innerHTML = "Fight Loki, or save the people?";
         break;
      default:
         break;
   }
}

/*
 getAnswer()
 Gets user input, stores it, and moves the story forward
*/
function getAnswer() {

   // Convert input to uppercase to make comparisons easier
   var cleanInput = yourAnswer.value.toUpperCase();

   // Store the user's answer
   answers.push(cleanInput);

   // Clear the input field
   yourAnswer.value = "";

   // Continue the story based on the number of answers given
   continueStory(answers.length - 1);
}

/*
 continueStory()
 Controls the story flow based on the user's answers
*/
function continueStory(answerNumber) {

   switch (answerNumber) {

      // First answer
      case 0:
         if (answers[0] === "YES") {
            story.innerHTML = document.getElementById("answer01").innerHTML;
            askQuestion(1);
         } else if (answers[0] === "NO") {
            story.innerHTML = document.getElementById("answer02").innerHTML;
            askQuestion(0);
         } else {
            story.innerHTML = document.getElementById("err0").innerHTML;
            askQuestion(0);
         }
         break;

      // Second answer
      case 1:
         if (answers[1] === "EARTH" || answers[1] === "GO TO EARTH") {
            story.innerHTML = document.getElementById("answer11").innerHTML;
            askQuestion(2);
         } else if (answers[1] === "ASGARD" || answers[1] === "STAY IN ASGARD") {
            story.innerHTML = document.getElementById("answer12").innerHTML;
            theEnd();
         } else {
            story.innerHTML = document.getElementById("err1").innerHTML;
            askQuestion(1);
         }
         break;

      // Third answer
      case 2:
         if (answers[2] === "FIGHT" || answers[2] === "FIGHT LOKI") {
            story.innerHTML = document.getElementById("answer21").innerHTML;
            theEnd();
         } else if (answers[2] === "SAVE" || answers[2] === "SAVE THE PEOPLE") {
            story.innerHTML = document.getElementById("answer22").innerHTML;
            theEnd();
         } else {
            story.innerHTML = document.getElementById("err2").innerHTML;
            askQuestion(2);
         }
         break;

      // Any unexpected case
      default:
         story.innerHTML = "The story is over!";
         break;
   }
}

/*
 theEnd()
 Ends the story and hides the input area
*/
function theEnd() {

   // Add "The End" to the story
   story.innerHTML += "<p>The End.</p>";

   // Clear the question text
   question.innerHTML = "";

   // Hide the answer input section
   answer.style.display = "none";
}
