let buttonColors = {1:"green", 2:"red", 3:"yellow", 4:"blue"}
let gameOn = false

let lastColor
let correctColor
let currentSequence
let lastNumInSequence 
let currentLevel
let inLevelCount

function gameSetup() {
    gameOn = false
    lastColor = ""
    correctColor = ""
    currentSequence = []
    lastNumInSequence = 0
    currentLevel = 1
    inLevelCount = 1
}

gameSetup()

$(document).on("keydown", function (event) {
    if (gameOn == false) {
        gameOn = true
        gameStart()
    }
});

$("body").on("click", ".here", function (event) {
    if (gameOn == false) {
        console.log("clicked here")
        gameOn = true
        gameStart()
    }
});

$(".btn").on("click", function () {
    if (gameOn) {
        correctColor = buttonColors[currentSequence[inLevelCount-1]]
        clickedColor = $(this).attr("id")
        
        console.log(inLevelCount + ", "+currentSequence[currentSequence.length-1])
    
        if (isWrongClick()) {
            buttonAnimation('wrong')
            backgroundAnimation()
            console.log("Wrong!, correct color was " + correctColor +", current sequence: "+currentSequence+", in level count: "+inLevelCount)
            changeTitle("You lost! Press any key or click <span class='here'>here</span> to start again")
            gameSetup()
        }
        else {
            buttonAnimation(clickedColor)
            console.log("correcte! Sequencia: "+currentSequence+". Longitud sequencia: "+currentSequence.length+". InLevelCount: "+inLevelCount+". ")
            if (inLevelCount === currentSequence.length) {
                console.log("pas al seguent nivell")
                currentLevel ++
                inLevelCount = 1
                currentSequence = addStep(currentSequence)
                setTimeout(() => {
                    changeTitle("Level "+ currentLevel)
                    executeRound(currentSequence)
                  }, 500);
            }
            else {
                console.log("segueix")
                inLevelCount ++
            }
        }
    }
    else {
        alert("Alerta!")
    }
})

function addStep(sequence) {
    let step = Math.floor(Math.random()*4)+1
    sequence.push(step)
    return sequence
}

function buttonAnimation(color) {
    let sound = new Audio("https://github.com/octopicaste/simongame/blob/main/sounds/"+color+".mp3?raw=true")

    $("."+color).addClass("pressed")
    sound.play()

    setTimeout(() => {
        $("."+ color).removeClass("pressed")
      }, 100);
}

function backgroundAnimation() {
    $("body").css("background-color", "red") 
    setTimeout(() => {
        $("body").css("background-color", " #011F3F")
      }, 100);
}

function executeRound(sequence) {
    lastNumInSequence = sequence[sequence.length-1]
    lastColor = buttonColors[lastNumInSequence]
    buttonAnimation(lastColor)
}

function isWrongClick() {
    return (currentSequence === []) || (clickedColor !== correctColor)
}

function gameStart() {
    $("h1").html("Level l")
    currentSequence = addStep(currentSequence)
    setTimeout(() => {
        executeRound(currentSequence)
      }, 400);
}

function changeTitle(string) {
    $("h1").html(string)
}