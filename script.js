// document.querySelector("#")
const ANSWERS = ["קסדה", "פלייר", "קאטר", "מברג", "red"];
// let DATA = [{
//     type: `multiple`,
//     question: `שאלה ראשונה`,
//     ans1: `תשובה1`,
//     ans2: `תשובה2`,
//     ans3: `3תשובה`,
//     ans4: `תשובה4`,
//     correctAns: `ans1`
// }, {
//     type: `multiple`,
//     question: `שאלה שניה`,
//     ans1: `תשובה1`,
//     ans2: `תשובה2`,
//     ans3: `תשובה3`,
//     ans4: `תשובה4`,
//     correctAns: `ans1`
// }, {
//     type: `multiple`,
//     question: `שאלה שלישית`,
//     ans1: `תשובה1`,
//     ans2: `תשובה2`,
//     ans3: `תשובה3`,
//     ans4: `תשובה4`,
//     correctAns: `ans1`
// }, {
//     type: `multiple`,
//     question: ``,
//     ans1: `תשובה1`,
//     ans2: `תשובה2`,
//     ans3: `תשובה3`,
//     ans4: `תשובה4`,
//     correctAns: `ans1`
// }, {
//     type: `multiple`,
//     question: `שאלה רביעית`,
//     ans1: `תשובה1`,
//     ans2: `תשובה2`,
//     ans3: `תשובה3`,
//     ans4: `תשובה4`,
//     correctAns: `ans1`
// }];
let falseAnswer = false;
let chosenColor = "";
let firstChosen = "";
let secondChosen = "";
let thirdChosen = "";
let cordCounter = 1;
let isCorrect = false;
let timerSec = 0;
let timerMin = 0;
let timerHour = 1;
let timerInterval;

window.addEventListener("load", () => {
    document.getElementById("start-btn").addEventListener("click", beginGame);
    document.getElementById("blue").addEventListener("click", sendBlue);
    document.getElementById("red").addEventListener("click", sendRed);
    document.getElementById("yellow").addEventListener("click", sendYellow);
    document.getElementById("check-btn").addEventListener("click", checkInputs);
    activeDropDown();
    // document.getElementById(`cord1`).addEventListener("mouseover", () => {
    //     document.getElementById("bomb").style.backgroundImage = `url("assets/media/bomb_2.svg")`;
    // });
    // document.getElementById(`cord1`).addEventListener("mouseout", () => {
    //     document.getElementById("bomb").style.backgroundImage = `url("assets/media/bomb_1.svg")`;
    // });
    document.getElementById(`cord${cordCounter}`).addEventListener("click", activeCords);

});

const beginGame = () => {
    document.getElementById("quiz-screen").style.display = "block";
    document.getElementById("open-screen").style.display = "none";
    timerInterval = setInterval(startTimer, 1000);
}

const startTimer = () => {
    if(timerHour === 1) {
        timerHour--;
        timerMin = 60;
    }
    if (timerSec === 0) {
        timerSec = 60;
        timerMin--;
    } 
    if(timerMin === 0) {
        clearInterval(timerInterval); 
        alert("time's out!");
    }
    timerSec--;
    if (timerSec <= 9) {
        document.getElementById("timer").innerText = `${timerHour}:${timerMin}:0${timerSec}`;
    } else {
        document.getElementById("timer").innerText = `${timerHour}:${timerMin}:${timerSec}`;
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
            console.log(`option${j}`);
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
        document.getElementById("timer").style.display = "block";
        for (let i = 1; i <= 5; i++) {
            document.getElementById(`cord${i}`).addEventListener("mouseover", () => {
                document.getElementById(`cord${i}`).style.backgroundImage = `url("assets/media/bomb_${i}_glow.svg")`;
            });
            document.getElementById(`cord${i}`).addEventListener("mouseout", () => {
                document.getElementById(`cord${i}`).style.backgroundImage = `url("assets/media/bomb_${i}.svg")`;
            });
        }
    }
}

const activeCords = () => {
    // for (let i = 1; i <= 4; i++) {
    //     document.getElementById(`circle${i}`).classList.remove("circle-clicked");
    // }
    // for (let i = 1; i <= 4; i++) {
    //     document.getElementById(`circle${i}`).addEventListener("click", () => {
    //         for (let i = 1; i <= 4; i++) {
    //             document.getElementById(`circle${i}`).classList.remove("circle-clicked");
    //         }
    //         document.getElementById(`circle${i}`).classList.toggle("circle-clicked");
    //     });
    // }
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

const checkQuestion = (event) => {
    if(isCorrect) {
        // document.getElementById(`cord${cordCounter}`).style.display = "none";
        if(cordCounter < 5) {
            cordCounter++;
            document.getElementById(`cord${cordCounter}`).style.cursor = "pointer";
            document.getElementById(`cord${cordCounter}`).addEventListener("click", activeCords);
        }
        // document.getElementById("riddle").style.display = "none";
        // document.getElementById(`cord${cordCounter - 1}`).style.display = "none";
        document.getElementById(`cord${cordCounter}`).style.backgroundImage = `url("assets/media/bomb_${cordCounter}.svg")`;
        document.getElementById("riddle").style.animation = "popOut 0.5s ease-out forwards";
        document.getElementById(`cord${cordCounter - 1}`).style.animation = "fadeOutAni 2s forwards";
        document.getElementById(`cord${cordCounter - 1}`).addEventListener("animationend", () => {
            document.getElementById(`cord${cordCounter - 1}`).style.display = "none";
        });
        
        // document.getElementById("bomb").addEventListener("animationend", () => {
            
            // document.getElementById("bomb").style.animation = "fadeInAni 1s forwards";
        // });
        isCorrect = false;
    } else {
        document.getElementById("try").style.display = "block";
    }
}

const closePopUp = () => {
    if(cordCounter < 5) {
        cordCounter++;
        document.getElementById(`cord${cordCounter}`).style.cursor = "pointer";
        document.getElementById(`cord${cordCounter}`).addEventListener("click", activeCords);
    }
    // document.getElementById("riddle").style.display = "none";
    // document.getElementById(`cord${cordCounter - 1}`).style.display = "none";
    document.getElementById(`cord${cordCounter - 1}`).removeEventListener;
    document.getElementById(`cord${cordCounter}`).style.backgroundImage = `url("assets/media/bomb_${cordCounter}.svg")`;
     document.getElementById(`cord${cordCounter - 1}`).style.pointerEvents = "none";
    document.getElementById("riddle").style.animation = "popOut 0.5s ease-out forwards";
    document.getElementById(`cord${cordCounter - 1}`).style.animation = "fadeOutAni 2s forwards";
    // document.getElementById(`cord${cordCounter - 1}`).addEventListener("animationend", () => {
       
    // });
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