let randRandom = Math.floor(Math.random() * 21);
console.log("randomNumber: " + randRandom);

function storedValue() {
   let input = document.getElementById("numberInput");
   let userGuess = parseInt(input.value);
   input.value = "";

   startGame(userGuess);
}

function startGame(userGuess) {
   if (isNaN(userGuess)) {
      document.getElementById("result").innerHTML = "Enter a valid number"
   }

   else if (userGuess > randRandom) {
      document.getElementById("result").innerHTML = "Incorrect, number too high";


   } else if (userGuess < randRandom) {
      document.getElementById("result").innerHTML = "Incorrect, number too low";

   } else {
      document.getElementById("result").innerHTML = "Well done!!, you guessed the right number " + randRandom;

      // Disable input after correct guess
      document.getElementById("numberInput").disabled = true;
      document.getElementById("btn").disabled = true;
   }
}
