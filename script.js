
const ANSWERS = ["קסדה", "פלייר", "קאטר", "מברג", "red"];

let falseAnswer = false;
let chosenColor = "";
let firstChosen = "";
let secondChosen = "";
let thirdChosen = "";
let cordCounter = 1;
let isCorrect = false;
let timerSec = 0;
let timerMin = 10;
let timerHour = 0;
let timerInterval;
let imgArry = [
    "assets/media/bomb_1.svg",
    "assets/media/bomb_1_glow.svg",
    "assets/media/bomb_2.svg",
    "assets/media/bomb_2_glow.svg",
    "assets/media/bomb_3.svg",
    "assets/media/bomb_3_glow.svg",
    "assets/media/bomb_4.svg",
    "assets/media/bomb_4_glow.svg",
    "assets/media/bomb_5.svg",
    "assets/media/bomb_5_glow.svg",
];

window.addEventListener("load", () => {
    document.getElementById("start-btn").addEventListener("click", beginGame);
    document.getElementById("blue").addEventListener("click", sendBlue);
    document.getElementById("red").addEventListener("click", sendRed);
    document.getElementById("yellow").addEventListener("click", sendYellow);
    document.getElementById("check-btn").addEventListener("click", checkInputs);
    activeDropDown();
    document.getElementById(`cord${cordCounter}`).addEventListener("click", activeCords);
    preloadImages(imgArry);
});

function preloadImages(array) {
    if (!preloadImages.list) {
        preloadImages.list = [];
    }
    var list = preloadImages.list;
    for (var i = 0; i < array.length; i++) {
        var img = new Image();
        img.onload = function() {
            var index = list.indexOf(this);
            if (index !== -1) {
                // remove image from the array once it's loaded
                // for memory consumption reasons
                list.splice(index, 1);
            }
        }
        list.push(img);
        img.src = array[i];
    }
}

  
const beginGame = () => {
    document.getElementById("quiz-screen").style.display = "block";
    document.getElementById("open-screen").style.display = "none";
}

const startTimer = () => {
    if (timerSec === 0) {
        timerSec = 60;
        timerMin--;
    } 
    if(timerMin === 0 && timerSec === 0) {
        clearInterval(timerInterval); 
        alert("time's out!");
    }
    timerSec--;
    if (timerSec <= 9) {
        document.getElementById("timer").innerText = `0${timerHour}:0${timerMin}:0${timerSec}`;
    } else {
        document.getElementById("timer").innerText = `0${timerHour}:0${timerMin}:${timerSec}`;
    }
}

const activeDropDown = () => {
    for (let i = 1; i <= 3; i++) {
        document.getElementById(`selLabel${i}`).addEventListener("click", () => {
            document.getElementById(`dropdown${i}`).classList.toggle("active");
        });
    }
    for (let j = 1; j <= 9; j++) {
        document.getElementById(`option${j}`).addEventListener("click", (event) => {
            document.getElementById(`selLabel${Math.ceil(j / 3.0)}`).innerText = event.currentTarget.innerText;
            document.getElementById(`dropdown${Math.ceil(j / 3.0)}`).classList.remove('active');
            // if (ANSWERS[Math.ceil(j / 3.0)] !== event.currentTarget.innerText) {
                if (j <= 3) {
                    firstChosen = event.currentTarget.innerText;
                } else if (j > 3 && j <= 6) {
                    secondChosen = event.currentTarget.innerText;
                } else {
                    thirdChosen = event.currentTarget.innerText;
                }
                // falseAnswer = true;
            // }
        });
    }
}

const sendBlue = () => {
    chosenColor = "blue";
    checkRadioAnswer("blue");
}

const sendRed = () => {
    chosenColor = "red";
    checkRadioAnswer("red");
}

const sendYellow = () => {
    chosenColor = "yellow";
    checkRadioAnswer("yellow");
}

const checkRadioAnswer = () => {
    document.getElementById("blue").style.backgroundImage = `url("assets/media/blue_battery.svg")`;
    document.getElementById("red").style.backgroundImage = `url("assets/media/red_battery.svg")`;
    document.getElementById("yellow").style.backgroundImage = `url("assets/media/yellow_battery.svg")`;
    // document.getElementById(chosenColor).className = "radioChosen";
    document.getElementById(chosenColor).style.backgroundImage = `url("assets/media/${chosenColor}_battery_glow.svg")`;
}

const checkInputs = () => {
    if (document.getElementById("input-protect").value !== ANSWERS[0]) {
        falseAnswer = true;
    } else if (chosenColor !== ANSWERS[4]) {
        falseAnswer = true;
    } else if (firstChosen !== ANSWERS[1]) {
        falseAnswer = true;
    } else if (secondChosen !== ANSWERS[2]) {
        falseAnswer = true;
    } else if (thirdChosen !== ANSWERS[3]) {
        falseAnswer = true;
    }
    if (!falseAnswer) {
        document.getElementById("try-again").style.display = "block";
        document.getElementById("close-try-again").addEventListener("click", () => {
            document.getElementById("try-again").style.display = "none";
            falseAnswer = false;
        });
    } else {
        document.getElementById("quiz-screen").style.display = "none";
        document.getElementById("bomb-screen").style.display = "block";
        document.getElementById("timer").style.display = "flex";
        document.getElementById(`cord${cordCounter}`).addEventListener("mouseover", () => {
            document.getElementById(`cord${cordCounter}`).style.backgroundImage = `url("assets/media/bomb_${cordCounter}_glow.svg")`;
        });
        document.getElementById(`cord${cordCounter}`).addEventListener("mouseout", () => {
            document.getElementById(`cord${cordCounter}`).style.backgroundImage = `url("assets/media/bomb_${cordCounter}.svg")`;
        });
        document.getElementById("timer").innerText = `0${timerHour}:${timerMin}:0${timerSec}`;
        setTimeout(() => {
            timerInterval = setInterval(startTimer, 1000);
        }, 1500);
    }
}

const activeCords = () => {
    document.getElementById(`cord${cordCounter}`).style.pointerEvents = "none";
    document.getElementById("riddle").style.display = "block";
    document.getElementById(`cord${cordCounter}`).removeEventListener("click", activeCords);
    document.getElementById("riddle").style.animation = "popIn 0.5s ease-out forwards";
    addContentToQuestion();
    document.getElementById("try").style.display = "none";
    // for(let i = 1; i <= 4; i++) {
    //     document.getElementById(`ans${i}`).innerText = DATA[cordCounter - 1][`ans${i}`];
    //     document.getElementById(`ans${i}`).addEventListener("click", checkChosenAnswer);
    // }
    // document.getElementById("riddle-text").innerText = DATA[cordCounter - 1]["question"];
    // document.getElementById("close-riddle").addEventListener("click", () => {
    //     // document.getElementById("riddle").style.display = "none";
    //     document.getElementById("riddle").style.animation = "popOut 0.5s ease-out forwards";
    //     document.getElementById("try").style.display = "none"; 
    // });

    // check button
    // document.getElementById("check-ans").addEventListener("click", checkQuestion);
}

// const checkQuestion = (event) => {
//     if(isCorrect) {
//         // document.getElementById(`cord${cordCounter}`).style.display = "none";
//         if(cordCounter < 5) {
//             cordCounter++;
//             document.getElementById(`cord${cordCounter}`).style.cursor = "pointer";
//             document.getElementById(`cord${cordCounter}`).addEventListener("click", activeCords);
//         }
//         // document.getElementById("riddle").style.display = "none";
//         // document.getElementById(`cord${cordCounter - 1}`).style.display = "none";
//         document.getElementById(`cord${cordCounter}`).style.backgroundImage = `url("assets/media/bomb_${cordCounter}.svg")`;
//         document.getElementById("riddle").style.animation = "popOut 0.5s ease-out forwards";
//         document.getElementById(`cord${cordCounter - 1}`).style.animation = "fadeOutAni 2s forwards";
//         document.getElementById(`cord${cordCounter - 1}`).addEventListener("animationend", () => {
//             document.getElementById(`cord${cordCounter - 1}`).style.display = "none";
//         });
        
//         // document.getElementById("bomb").addEventListener("animationend", () => {
            
//             // document.getElementById("bomb").style.animation = "fadeInAni 1s forwards";
//         // });
//         isCorrect = false;
//     } else {
//         document.getElementById("try").style.display = "block";
//     }
// }

const closePopUp = () => {
    if(cordCounter < 5) {
        cordCounter++;
        document.getElementById(`cord${cordCounter}`).style.cursor = "pointer";
        document.getElementById(`cord${cordCounter}`).addEventListener("click", activeCords);
        // change events listeners
        document.getElementById(`cord${cordCounter}`).addEventListener("mouseover", () => {
            document.getElementById(`cord${cordCounter}`).style.backgroundImage = `url("assets/media/bomb_${cordCounter}_glow.svg")`;
        });
        document.getElementById(`cord${cordCounter}`).addEventListener("mouseout", () => {
            document.getElementById(`cord${cordCounter}`).style.backgroundImage = `url("assets/media/bomb_${cordCounter}.svg")`;
        });
    }
    // document.getElementById("riddle").style.display = "none";
    // document.getElementById(`cord${cordCounter - 1}`).style.display = "none";
    document.getElementById(`cord${cordCounter}`).style.backgroundImage = `url("assets/media/bomb_${cordCounter}.svg")`;
     document.getElementById(`cord${cordCounter - 1}`).style.pointerEvents = "none";
    document.getElementById("riddle").style.animation = "popOut 0.5s ease-out forwards";
    document.getElementById(`cord${cordCounter - 1}`).style.animation = "fadeOutAni 2s forwards";
    document.getElementById(`cord${cordCounter - 1}`).addEventListener("animationend", () => {
        document.getElementById(`cord${cordCounter}`).style.pointerEvents = "auto";
    });
}

const checkChosenAnswer = (event) => {
    if(DATA[cordCounter - 1]["correctAns"] === event.currentTarget.id) {
        isCorrect = true;
        console.log("true");
    } else {
        isCorrect = false;
        console.log("false");
    }
}