//array to hold colors
var buttonColours = ["red", "blue", "green", "yellow"];

//empty array 
var gamePattern = [];
//stores user's click pattern
var userClickedPattern = [];
var startToggle = false;
var level = 0;



function startOver() {
    level = 0;
    gamePattern = [];
    startToggle = false;
}

//checks the users pattern vs. game pattern 
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");

        //when the user gets one of the answers wrong and then remove it after 200 milliseconds.
        $("body").addClass("game-over");

        //Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}


//toggle if game started 
$(document).keydown(function () {
    if (!startToggle) {
        $("#level-title").text("Level" + level);
        nextSequence();
        startToggle = true;
    }
});

//detect when any of button clicked
$(".btn").on("click", function () {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    //plays sound according to the color user clicked on
    playSound(userChosenColour);
    animatePress(userChosenColour);

    //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length - 1);
});

//function returns random no. between 0-3
function nextSequence() {

    //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];

    //increase the level by 1 every time nextSequence() is called.
    level++;

    //update the h1 with this change in the value of level.
    $("#level-title").text("Level " + level);

    //generates random no.
    var randomNumber = Math.floor(Math.random() * 4);

    //choosing random no. from array 
    var randomChosenColour = buttonColours[randomNumber];

    //pushing chosen colour to the end of empty array
    gamePattern.push(randomChosenColour);

    // selecting chosen random color with same id 
    // then animating it with fade-in-out
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

//function plays sound
function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//animates the pressed button
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}
