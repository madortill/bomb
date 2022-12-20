// question
let nMultipleCurrentQuestion = 0;
let nMultipleCorrectAnswers = 0;
let arrThisLomdaData = shuffle(DATA.questions)
let strCurrentAns;

// const
const AMOUNT_OF_QUESTION = arrThisLomdaData.length; // how many questions we want out of the array
const DELAY_AFTER_QUESTION = 2000;

/* addContentToQuestion
--------------------------------------------------------------
Description: */
const addContentToQuestion = () => {
    document.querySelector(`.multipleQuestionContainer`).innerHTML = "";
    document.querySelector(`.multipleQuestionContainer`).style.pointerEvents ="all";
    // add question
    let question = El("div", {cls: `multipleQuestion`}, arrThisLomdaData[nMultipleCurrentQuestion].question);
    document.querySelector(`.multipleQuestionContainer`).append(question);
    scaleFontSize(document.querySelector(`.multipleQuestion`));
    // add answeres
    let ansContainer;
    let boxContainer;
    let dropList;
    
    switch (arrThisLomdaData[nMultipleCurrentQuestion].type) {
        case "multiple":
        case "multipleWithPic":
            ansContainer = El("div", {cls: `ansContainer`},);
            document.querySelector(`.multipleQuestionContainer`).append(ansContainer);
            for(let i = 1; i <= 4; i++){
                let answer = El("div", {classes: [`multipleAns`, `ans${i}`, `ans`],}, arrThisLomdaData[nMultipleCurrentQuestion][`ans${i}`]);
                let box = El("div", {classes: [`box`, `ans${i}-box`], listeners: {click : onClickAnswer}},);
                document.querySelector(`.ansContainer`).append(answer);
                document.querySelector(`.ans${i}`).append(box);
            }    
            break;

        case "sixChoices":
        case "sixChoicesWithPic":
            strCurrentAns = [];
            ansContainer = El("div", {cls: `ansContainer`},);
            document.querySelector(`.multipleQuestionContainer`).append(ansContainer);
            for(let i = 1; i <= 6; i++){
                let answer = El("div", {classes: [`sixMultipleAns`, `ans${i}`, `ans`] ,}, arrThisLomdaData[nMultipleCurrentQuestion][`ans${i}`]);
                let box = El("div", {classes: [`box`, `ans${i}-box`], listeners: {click : onClickAnswerSixChoices}},);
                document.querySelector(`.ansContainer`).append(answer);
                document.querySelector(`.ans${i}`).append(box);
            }    
            break;
    
        case "binary":
        case "binaryWithPic":
            ansContainer = El("div", {cls: `ansContainer`},);      
            let ansTrue = El("div", {classes: [`binaryAns1`, `ans`] ,}, "נכון");
            let ansFalse = El("div", {classes: [`binaryAns2`, `ans`] ,}, "לא נכון");
            let boxTrue = El("div", {classes: [`true-box`, `true`, `box`] , listeners: {click : onClickAnswer}},);
            let boxFalse = El("div", {classes: [`false-box`, `false`, `box`] , listeners: {click : onClickAnswer}},);
            document.querySelector(`.multipleQuestionContainer`).append(ansContainer);
            document.querySelector(`.ansContainer`).append(ansTrue);
            document.querySelector(`.ansContainer`).append(ansFalse);
            document.querySelector(`.binaryAns1`).append(boxTrue);
            document.querySelector(`.binaryAns2`).append(boxFalse);
        break;

        case "multipleAllPic":
            ansContainer = El("div", {cls: `ansContainerPic`},);
            document.querySelector(`.multipleQuestionContainer`).append(ansContainer);
            for(let i = 0; i < arrThisLomdaData[nMultipleCurrentQuestion].answers.length ; i++){
                let duoContainer = El("div", {classes: [`duoContainer`, `duoContainer${i + 1}`]},);
                let answer = El("img", {classes: [`question4Pic`, `ans${i + 1}`,] ,attributes: {src: arrThisLomdaData[nMultipleCurrentQuestion].answers[i]},}, arrThisLomdaData[nMultipleCurrentQuestion][`ans${i}`]);
                let box = El("div", {classes: [`box`, `ans${i + 1}-box`], listeners: {click : onClickAnswer},});
                document.querySelector(`.ansContainerPic`).append(duoContainer);
                document.querySelector(`.duoContainer${i + 1}`).append(answer);
                document.querySelector(`.duoContainer${i + 1}`).append(box);

                imgSize(answer);

            }    
            break;
    
      
        case "completeSentence":
            let sentence = El("div", {cls: `sentenceContainer`},
            ansContainerSentence = El("div", {cls: `ansContainerSentence`},),
            El("div", {classes: [`sentence`, `firstPart`]}, arrThisLomdaData[nMultipleCurrentQuestion].sentence[0]),
                // El("span", {classes: [`dropDownTitle`, `selLabel`, `selLabel4`], listeners: {click : controlDropDown}}, "בחר/י..."),
                El("div", {classes: [`currAnswerContainer`]},),
                El("div", {classes: [`line`]},),
                    // El("input", {type: `hidden`, name: `cd-dropdown`}),
                    // El("div", {cls: `containerDropDown`})),
                El("div", {classes: [`sentence`, `secondPart`]}, arrThisLomdaData[nMultipleCurrentQuestion].sentence[1]),

            );
            // document.querySelector(`.containerDropDown`).append(dropList);
            
            document.querySelector(`.multipleQuestionContainer`).append(sentence),
            document.querySelector(`.multipleQuestionContainer`).append(ansContainerSentence);
            for(let i = 0; i < arrThisLomdaData[nMultipleCurrentQuestion].dropDownAns.length; i++){
                let answer = El("div", {classes: [`ans${i}`, `sentenceAns`],}, arrThisLomdaData[nMultipleCurrentQuestion].dropDownAns[i]);
                let box = El("div", {classes: [`box`, `ans${i}-box`], listeners: {click : onClickAnswer}},);
                document.querySelector(`.ansContainerSentence`).append(answer);
                document.querySelector(`.ans${i}`).append(box);
            }  
            // for(let i = 0; i < arrThisLomdaData[nMultipleCurrentQuestion].dropDownAns.length; i++){
            //         let dropDownItem = El("li", {classes: [`dropDownItem`, `ans${i}`, i], listeners: {click : selectAnswer}},arrThisLomdaData[nMultipleCurrentQuestion].dropDownAns[i]);
            //         document.querySelector(`.drop-list4`).append(dropDownItem);
            //     }

            // scaleFontSize(document.querySelector(`.multipleQuestionContainer`));
            break;
    
        default:
            break;
    }
    if (arrThisLomdaData[nMultipleCurrentQuestion].type.includes("WithPic")) {
        img = El("img", {cls: `questionPic`, attributes: {src: arrThisLomdaData[nMultipleCurrentQuestion].src}},);
        document.querySelector(`.ansContainer`).append(img);
    }
    //create check button (without listener)
    let check =  El("div", {cls: `checkButtonSentence`}, "");
    document.querySelector(`.multipleQuestionContainer`).append(check);
}


/* imgSize
--------------------------------------------------------------
Description: checks if pic has a larger width than height*/

const imgSize = (img) => {
    // img 
    // if (img.offsetWidth >= img.offsetHeight) {
        console.log(img.offsetWidth);
        console.log(img.offsetHeight);
    // }
}

/* onClickAnswer hi
--------------------------------------------------------------
Description: */
const onClickAnswer = (event) => {
    if(document.querySelector(`.${strCurrentAns}`)) {
        document.querySelector(`.${strCurrentAns}`).style.backgroundImage = "url('assets/media/gray_checkbox.svg')";
    }
    
    strCurrentAns = event.currentTarget.classList[1];
    event.currentTarget.style.backgroundImage = "url('assets/media/blue_checkbox.svg')";
    document.querySelector(`.checkButtonSentence`).addEventListener("click", checkAnswer);
    if(arrThisLomdaData[nMultipleCurrentQuestion].type.includes("completeSentence")) {
        document.querySelector(`.currAnswerContainer`).innerText = arrThisLomdaData[nMultipleCurrentQuestion].dropDownAns[strCurrentAns.substring(3, 4)];
    }
}

/* onClickAnswerSixChoices
--------------------------------------------------------------
Description: */
const onClickAnswerSixChoices = (event) => {
    let currAns = event.currentTarget.classList[1];
    if(document.querySelector(`.${currAns}`).style.backgroundImage === 'url("assets/media/blue_checkbox.svg")') {
        document.querySelector(`.${currAns}`).style.backgroundImage = "url('assets/media/gray_checkbox.svg')";
        strCurrentAns = strCurrentAns.filter(e => e !== currAns);
    } else if(strCurrentAns.length < arrThisLomdaData[nMultipleCurrentQuestion].correctAns.length) {
        strCurrentAns.push(event.currentTarget.classList[1]);
        document.querySelector(`.${currAns}`).style.backgroundImage = "url('assets/media/blue_checkbox.svg')";
    }
    if(strCurrentAns.length === arrThisLomdaData[nMultipleCurrentQuestion].correctAns.length){
        document.querySelector(`.checkButtonSentence`).addEventListener("click", checkAnswer);
    } else {
        document.querySelector(`.checkButtonSentence`).removeEventListener("click", checkAnswer);
    }
}

/* controlDropDown
--------------------------------------------------------------
Description: */
const controlDropDown = () => {
    document.querySelector(`.dropDownTitle`).removeEventListener("click" , controlDropDown);
    document.querySelector(`.selLabel4`).addEventListener("click", () => {
        document.querySelector(`.dropdown4`).classList.toggle("active");
    });

    if(strCurrentAns) {
        document.querySelector(`.${strCurrentAns}`).style.backgroundColor = "gray";
    }
}

/* selectAnswer
--------------------------------------------------------------
Description: */
const selectAnswer = (event) => {
    let currAns = event.currentTarget.classList[2];
    strCurrentAns = event.currentTarget.classList[1];
    document.querySelector(`.dropDownTitle`).innerHTML = arrThisLomdaData[nMultipleCurrentQuestion].dropDownAns[currAns];
    document.querySelector(`.containerDropDown`).innerHTML = ``;
    document.querySelector(`.dropDownTitle`).addEventListener("click", controlDropDown);
    document.querySelector(`.checkButtonSentence`).addEventListener("click", checkAnswer);
}

/* compareOutOfOrder
--------------------------------------------------------------
Description: */
const compareOutOfOrder = (arr1, arr2) => {
    if(arr1.length !== arr2.length){ return false; } 
    const counts = new Map();
    arr1.forEach((value) => counts.set(value, (counts.get(value) ?? 0) + 1)); 
    arr2.forEach((value) => counts.set(value, (counts.get(value) ?? 0) - 1));
    return Array.from(counts.values()).every((count) => count === 0);
};

/* checkAnswer
--------------------------------------------------------------
Description: */
const checkAnswer = () => {
    document.querySelector(`.checkButtonSentence`).removeEventListener("click", checkAnswer);
    document.querySelector(`.multipleQuestionContainer`).style.pointerEvents ="none";
    if (arrThisLomdaData[nMultipleCurrentQuestion].type.includes("sixChoices")) {
        // color the answers acordingly
        strCurrentAns.forEach(e => {
            document.querySelector(`.${e}`).style.backgroundImage = "url('assets/media/red_checkbox.svg')";   
            arrThisLomdaData[nMultipleCurrentQuestion].correctAns.forEach(correctAns => {
                if (e === `${correctAns}-box`) {
                    nMultipleCurrentQuestion++;
                    document.querySelector(`.${e}`).style.backgroundImage = "url('assets/media/green_checkbox.svg')";   
                }
            })
        })
        
        // create new array with ans-box
        let correctAnsBox = [];
        for (i = 0; i < arrThisLomdaData[nMultipleCurrentQuestion].correctAns.length; i++) {
            correctAnsBox[i] = `${arrThisLomdaData[nMultipleCurrentQuestion].correctAns[i]}-box`;
        }

        // compare arrays
        if(compareOutOfOrder(strCurrentAns, correctAnsBox)) {
            nMultipleCorrectAnswers++;
            setTimeout(() => {
                if(nMultipleCurrentQuestion <  AMOUNT_OF_QUESTION) {
                    closePopUp();
                } else {
                    questionsEnd();
                }
                }, DELAY_AFTER_QUESTION);
        } else {
            setTimeout(() => {
                if(nMultipleCurrentQuestion <  AMOUNT_OF_QUESTION) {
                    addContentToQuestion();
                } else {
                    questionsEnd();
                }
            }, DELAY_AFTER_QUESTION);
        }
        
    // } else {
    //     if (arrThisLomdaData[nMultipleCurrentQuestion].type.includes("multipleAllPic")) {
    //         if (strCurrentAns === String(arrThisLomdaData[nMultipleCurrentQuestion].correctAns)){
    //             nMultipleCorrectAnswers++;
    //             if(document.querySelector(`.dropDownTitle`)) {
    //                 document.querySelector(`.dropDownTitle`).style.backgroundColor = "green"; 
    //             } else {
    //                 document.querySelector(`.${strCurrentAns}-box`).style.backgroundImage = "url('assets/media/green_checkbox.svg')";  
    //             }
    //         nMultipleCurrentQuestion++;
    //         strCurrentAns = undefined;
    //         setTimeout(() => {
    //             if(nMultipleCurrentQuestion <  AMOUNT_OF_QUESTION) {
    //                     closePopUp();
    //             } else {
    //                 questionsEnd();
    //             }
    //         }, DELAY_AFTER_QUESTION);
    //     }
    // } else if (arrThisLomdaData[nMultipleCurrentQuestion].type.includes("completeSentence")){
    //     if (document.querySelector(`.dropDownTitle`)){
    //         document.querySelector(`.dropDownTitle`).style.backgroundColor = "red"; 
    //     } else {
    //         document.querySelector(`.${strCurrentAns}`).style.backgroundImage = "url('assets/media/red_checkbox.svg')";   
    //     }
    //     strCurrentAns = undefined;
    //     setTimeout(() => {
    //         if(nMultipleCurrentQuestion <  AMOUNT_OF_QUESTION) {
    //                 addContentToQuestion();
    //         } else {
    //             questionsEnd();
    //         }
    //     }, DELAY_AFTER_QUESTION);

    } else {
        if (arrThisLomdaData[nMultipleCurrentQuestion].type.includes("multipleAllPic") || arrThisLomdaData[nMultipleCurrentQuestion].type.includes("multipleWithPic") || arrThisLomdaData[nMultipleCurrentQuestion].type.includes("multiple") || arrThisLomdaData[nMultipleCurrentQuestion].type.includes("completeSentence")) {
            if (strCurrentAns === `${String(arrThisLomdaData[nMultipleCurrentQuestion].correctAns)}-box`){
                nMultipleCorrectAnswers++;
                // if(arrThisLomdaData[nMultipleCurrentQuestion].type.includes("completeSentence")) {
                //     document.querySelector(`.currAnswerContainer`).innerText =  strCurrentAns;

                // }
                 document.querySelector(`.${strCurrentAns}`).style.backgroundImage = "url('assets/media/green_checkbox.svg')";  
                nMultipleCurrentQuestion++;
                strCurrentAns = undefined;
                setTimeout(() => {
                if(nMultipleCurrentQuestion <  AMOUNT_OF_QUESTION) {
                    closePopUp();
                } else {
                    questionsEnd();
                }
                }, DELAY_AFTER_QUESTION);
            } else {
                document.querySelector(`.${strCurrentAns}`).style.backgroundImage = "url('assets/media/red_checkbox.svg')";
                strCurrentAns = undefined;
                setTimeout(() => {
                    if(nMultipleCurrentQuestion <  AMOUNT_OF_QUESTION) {
                        addContentToQuestion();
                    } else {
                        questionsEnd();
                    }
                }, DELAY_AFTER_QUESTION);
            }
        } else {      
            if (strCurrentAns === String(arrThisLomdaData[nMultipleCurrentQuestion].correctAns)){
                nMultipleCorrectAnswers++;
                document.querySelector(`.${strCurrentAns}-box`).style.backgroundImage = "url('assets/media/green_checkbox.svg')";  
            
                nMultipleCurrentQuestion++;
                strCurrentAns = undefined;
                setTimeout(() => {
                if(nMultipleCurrentQuestion <  AMOUNT_OF_QUESTION) {
                    closePopUp();
                } else {
                    questionsEnd();
                }
                }, DELAY_AFTER_QUESTION);
            } else {
                document.querySelector(`.${strCurrentAns}`).style.backgroundImage = "url('assets/media/red_checkbox.svg')";
                strCurrentAns = undefined;
                setTimeout(() => {
                    if(nMultipleCurrentQuestion <  AMOUNT_OF_QUESTION) {
                        addContentToQuestion();
                    } else {
                        questionsEnd();
                    }
                }, DELAY_AFTER_QUESTION);
            }
        }
    }
}


/* questionsEnd
--------------------------------------------------------------
Description:  */
const questionsEnd = () => {
    console.log("סיימתי");
    console.log(nMultipleCorrectAnswers);
    closePopUp();
}

function scaleFontSize(element) {
    // We only want to scale down long text, so first we reset
    element.style.fontSize = "1.8em";
    let fontSize =  Number(element.style.fontSize.replace("em", ""));
    while (element.scrollHeight > element.clientHeight) {  
        element.style.fontSize = `${fontSize - 0.2}em`;
        fontSize =  Number(element.style.fontSize.replace("em", ""));
    }
}