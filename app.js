
var btnColor = ['green', 'red', 'yellow', 'blue'];
var level = 0;
var colorGenerated = [];
var colorChosen = [];

//KEY PRESS FUNCTIONS

$("#start").click(function () {
    if (level === 0)
        generateRandomNum();
});

function generateRandomNum() {
    level++;
    $("#level-title").text("Level " + level);

    while (colorGenerated.length < level) {

        var randomNum = Math.floor(Math.random() * 4);

        //ASSIGN A RANDOM COLOR
        var randomColor = btnColor[randomNum];
        colorGenerated.push(randomColor);

        //SYSTEM ANIMATES BUTTON
        $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
        var sound = new Audio("sounds/" + randomColor + ".mp3");
        sound.play();
        setTimeout(function () { $("#" + randomColor).removeClass("pressed"); }, 100);

    } colorChosen = [];
}

//BUTTON PRESS FUNCTIONS

$(".btn").click(function (userClick) {
    if (level !== 0)
        clickBtn(userClick);
});

function clickBtn(userClick) {

    if (colorChosen.length < colorGenerated.length) {
        //USER CLICK BUTTON
        var btnClicked = userClick.target.id;
        colorChosen.push(btnClicked);

        //SYSTEM ANIMATES USER BUTTON
        $("#" + btnClicked).addClass("pressed");
        var sound = new Audio("sounds/" + btnClicked + ".mp3");
        sound.play();
        setTimeout(function () { $("#" + btnClicked).removeClass("pressed"); }, 100);

        check();
    }
}

//CONDITION CHECKING

function check() {
    var tmpCount = 0;
    for (var tmpNum = 0; tmpNum < colorChosen.length; ++tmpNum) {
        if (colorGenerated[tmpNum] === colorChosen[tmpNum])
            tmpCount++;
    }

    if (tmpCount === colorGenerated.length) {
        game = "start";
        setTimeout(function () { generateRandomNum(); }, 1000);
    }

    else if (tmpCount === colorChosen.length) {
        //WAITING FOR A BTN CLICK
    }

    else {
        $("#level-title").html("Game Over. <span id='start'>Refresh</span>");

        $("body").addClass("game-over");
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        setTimeout(function () { $("body").removeClass("game-over"); }, 500);

        colorGenerated = [];
        level = 0;
    }
}
