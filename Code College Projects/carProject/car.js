// Controls how fast the car animation runs (lower = faster)
var carSpeed = 250;

// Keeps track of the car's current horizontal position
var carPosition = 0;

// Will store the interval ID for the animation
var animation;

// Get the car element from the HTML
var car = document.getElementById("car");

// When the car is clicked, increase its speed
car.addEventListener("click", speedUp);

// Get the stop button element
var stopButton = document.getElementById("stopButton");

// When the stop button is clicked, stop the car
stopButton.addEventListener("click", stopCar);

// Function that speeds up the car and starts the animation
function speedUp() {

   // Make sure the speed does not go below 10
   if (carSpeed > 10) {
      carSpeed -= 10;
   }

   // Log the current speed to the console
   console.log("BMW speed: " + carSpeed);

   // Stop any previous animation
   clearInterval(animation);

   // Start a new animation interval with the updated speed
   animation = setInterval(frame, carSpeed);

   // Moves the car forward on each interval tick
   function frame() {
      // Move the car 2 pixels to the right
      carPosition += 2;

      // Update the car's position on the screen
      car.style.left = carPosition + 'px';

      // Log the current position
      console.log(carPosition);

      // Check if the car has reached a crash position
      checkPosition(carPosition);
   }
}

// Checks whether the car has reached the crash point
function checkPosition(currentPosition) {

   // If the car reaches exactly 260px, trigger a crash
   if (currentPosition === 860) {
      alert("OOOOO!");
      console.log("Crash!");

      // Stop the animation
      clearInterval(animation);
   }
}

// Stops the car if it hasn't crashed yet
function stopCar() {

   // Only stop the car if it hasn't reached the crash position
   if (carPosition < 860) {
      clearInterval(animation);
     
   }
}
