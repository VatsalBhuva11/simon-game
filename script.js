let tiles = ["green", "red", "yellow", "blue"];
let generatedTiles = [];
let userClickedTiles = [];
let started = 0, level = 1;
let currHighScore = parseInt($('.score').text());

$(document).keypress(function(){
    if(!started){
        $(".level-heading").text("Level " + level);
        started = 1;
        nextSequence();
    }
})

//assign corresponding sound to every tile
function playSound(tileColor){
    let audio = new Audio('./sounds/' + tileColor + '.mp3');
    audio.play();
}


$('.tile').click(function(event){

    let userChosenColor = event.target.id;
    playSound(userChosenColor);
    userClickedTiles.push(userChosenColor);
    checkSequence(userClickedTiles.length-1);
    animatePress(userChosenColor);
})

function generateRandomTile(){
    let newTile = Math.floor(Math.random()*4);
    return newTile;
}

function nextSequence(){
    let rand = generateRandomTile();
    if (generatedTiles.length >= 1){
        do{
            rand = generateRandomTile();
        }while(tiles[rand] == generatedTiles.slice(-1));
    }

    generatedTiles.push(tiles[rand]);

    playSound(generatedTiles.slice(-1));
    $("#"+generatedTiles.slice(-1)).fadeOut(150).fadeIn(150);

}

function gameOver(){
    started = 0;
    level = 1;
    generatedTiles = [];
    userClickedTiles = [];
    $('.level-heading').text('Game over, press any key to restart');
    $('body').css("background-color", "red");
    let audio = new Audio("./sounds/wrong.mp3");
    audio.play();
    setTimeout(function(){
        $('body').css("background-color", "#011F3F");
    }, 200);
    if (currHighScore > 0){
        $('.score').text(currHighScore-1);
    }
    
}

function checkSequence(currentLevel){
    if (generatedTiles[currentLevel] !== userClickedTiles[currentLevel]){
        gameOver();
        return;
    }
    if (generatedTiles.length === userClickedTiles.length){
        setTimeout(function(){
            nextSequence()
        }, 1000);
        level += 1;
        if (level > currHighScore){
            currHighScore = level;
        }
        $(".level-heading").text("Level " + level);
        userClickedTiles = [];
    }
  
}


function animatePress(userChosenColor){
    $("#"+userChosenColor).addClass("clicked");
    setTimeout(function(){
        $("#"+userChosenColor).removeClass("clicked");
    }, 100);
}





