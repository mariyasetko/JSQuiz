let currentTimer;
let timePenalty = 10;
let timePerQuestion = 30;
let timerEl = document.getElementById('timer');
let currentQuestion = 0;
let questionPlaceholder = document.getElementById('questionPlaceholder');
let score = 0;
let savedScores = document.getElementById('saved-scores');
let playAgainBtn = document.getElementById('play-again');
let startBtn = document.getElementById("start");
let submitBtn = document.getElementById("submit-initials");


let questions = [
    {question:"Which JavaScript method is used to access an HTML element by id?", answers : ["getElementById()", "getElement(id)", "getElementById(id)", "elementById(id)"], correctAnswerIndex:2},
    {question:"In JavaScript, multi-line comments start with __ and end with ___", answers : ["/* and */", "<!—and -->", "## and ##", "// and //"], correctAnswerIndex:0},
    {question:"JavaScript ignores?", answers : ["newlines", "tabs", "spaces", "All of the above"], correctAnswerIndex:3},    
];


startBtn.addEventListener("click", startQuiz);
playAgainBtn.addEventListener("click", playAgain);
submitBtn.addEventListener("click", saveInitials);

function startQuiz(){

    startBtn.style.display = "none";

    let timeInterval = setInterval(function () {
        if (currentQuestion>=questions.length){
            return;
        };

        currentTimer--;
        timerEl.textContent = currentTimer + " seconds left";
    
        if(currentTimer === 0) {
          clearInterval(timeInterval);
          highScore();
        }
        return
      }, 1000);
    
    showQuestion(currentQuestion);

}; 

function showQuestion (q){

    if (q>=questions.length){
        highScore();
        return;
    }


    let currentQuestion = questions[q]; 
    console.log(currentQuestion.question);

    let h1Tag = document.createElement("h1");
    h1Tag.textContent = currentQuestion.question;
    questionPlaceholder.appendChild(h1Tag);

    for(let a=0; a<currentQuestion.answers.length; a++){
        let currentAnswer = currentQuestion.answers[a];
    
        let buttonTag = document.createElement("button");
        buttonTag.textContent = currentAnswer;
        questionPlaceholder.appendChild(buttonTag);
        buttonTag.classList.add("block-answers");

        if(a == currentQuestion.correctAnswerIndex) {
            buttonTag.classList.add("youAreRight");
        }
    };

    let blockAnswers = document.getElementsByClassName("block-answers");
    for(let ba=0; ba<blockAnswers.length; ba++){
        blockAnswers[ba].addEventListener("click", onclickAnswers);
    }

};

function onclickAnswers (e){
    if (e.currentTarget.classList.contains("youAreRight")) {
        alert("Great job!");
        score++;
    } else {
        currentTimer = currentTimer - timePenalty;
        alert("Not quite...");
    };
    questionPlaceholder.innerHTML = "";
    showQuestion(++currentQuestion);

};

function onLoad(){
    currentTimer = timePerQuestion * questions.length;
    timerEl.textContent = currentTimer + " seconds left";
};

function highScore(){
    document.getElementById("highscore").style.display = "block";
    document.getElementById("score").innerHTML = score;    

};




function saveInitials(){
    let players = [];
    let playerId = 0;
    while(localStorage.getItem("initials"+ playerId) != null) {
        players.push( {"initials": localStorage.getItem("initials" + playerId) , score: localStorage.getItem("score" + playerId) } );

        playerId++;
        
    }
        //TODO: display previous players' results1
    showScore(players);


    localStorage.setItem("initials" + playerId, document.getElementById("initials").value);
    localStorage.setItem("score" + playerId, score);
};

function showScore (players){

    savedScores.innerHTML = "";
   
    let headerHighscore = document.createElement("h1");
    headerHighscore.textContent = "Highscores";
    savedScores.appendChild(headerHighscore);

    for(let p=0; p<players.length; p++){
        let player = players[p];
        
        let playerScores = document.createElement("div");
        playerScores.textContent = player.initials+ " " + player.score;
        savedScores.appendChild(playerScores);
    }

    playAgainBtn.style.display = "block";

};

function playAgain (){
    
    document.getElementById("highscore").style.display = "none";
    document.getElementById("saved-scores").innerHTML = "";
    document.getElementById("play-again").style.display = "none";
    document.getElementById("start").style.display = "block";
    currentQuestion = 0;
    onLoad();    
};

onLoad();