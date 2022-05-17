const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

function playSound(name) {
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Create the random color and increment the level counter
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

// Function to check the answer against the current click position and array position
// If the answer is correct call nextSequence
// If the answer is incorrect call startOver
function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length)
      setTimeout(function () {
        nextSequence();
      }, 1000);
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

// Restart the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}


// User chosen color, play right sound with animation and check answer
$(".btn").on("click", function (e) {
  let userChosenColour = e.target.id;

  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});


// Listen for user keypress events
$(document).keypress(() => {
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});