// Quiz questions
const questions = [
    {
        question: "What does HTML stand for?",
        choices: ["Hyperlink and Text Markup Language", "Hyper Text Markup Language", "Home Translate Maintenance Linkup", "Home Tool Markup Language"],
        correctAnswer: "Hyper Text Markup Language"
    },
    {
        question: "Which of the following is NOT considered a logical operator?",
        choices: ["#", "!", "||", "&&"],
        correctAnswer: "#"
    },
    {
        question: "What is the correct way to include a JavaScript file in an HTML document?",
        choices: ["<script src='script.js'></script>", "<javascript src='script.js'></javascript>", "<js file='script.js'></js>", "<script src='javascript.js'></script>"],
        correctAnswer: "<script src='script.js'></script>"
    },
    {
        question: "In the setInterval() method, how would you denote a delay of 10 seconds between each execution of the function?",
        choices: ["10", "100", "1000", "10000"],
        correctAnswer: "10000"
    },
    {
        question: "Which one of the following is NOT a way to define a variable?",
        choices: ["var", "let", "const", "init"],
        correctAnswer: "init"
    },
];


let currentQ = 0;
let timer;
let timeLeft = 60; // Initial time in seconds

// DOM elements
const startBtn = document.getElementById("start-button");
const playAgainBtn = document.getElementById("play-again-btn");
const nextButton = document.getElementById("next-button");
const saveButton = document.getElementById("save-button");
const questionScreen = document.getElementById("question-screen");
const resultScreen = document.getElementById("result-screen");
const endScreen = document.getElementById("end-screen");
const finalScoreEl = document.getElementById("final-score");
const resultMessageEl = document.getElementById("result-message");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");

// Event listeners
startBtn.addEventListener("click", startQuiz);
nextButton.addEventListener("click", nextQuestion);
saveButton.addEventListener("click", saveHighScore);
playAgainBtn.addEventListener("click", playAgain);

// Function to start the quiz
function startQuiz() {
    startBtn.style.display = "none";
    questionScreen.style.display = "block";
    displayQuestion();
    startTimer();
}

// Function to start the timer
function startTimer() {
    timer = setInterval(function () {
        timeLeft--;
        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
}

// Function to display a question
function displayQuestion() {
    const currentQuestion = questions[currentQ];
    questionEl.textContent = currentQuestion.question;
    choicesEl.innerHTML = "";
    currentQuestion.choices.forEach(function (choice) {
        const li = document.createElement("li");
        li.textContent = choice;
        li.addEventListener("click", function () {
            checkAnswer(choice);
        });
        choicesEl.appendChild(li);
    });
}

// Function to check the user's answer
function checkAnswer(userChoice) {
    const currentQuestion = questions[currentQ];
    if (userChoice === currentQuestion.correctAnswer) {
        resultMessageEl.textContent = "Correct!";
    } else {
        resultMessageEl.textContent = "Incorrect!";
        timeLeft -= 10; // Subtract 10 seconds for an incorrect answer
    }

    resultScreen.style.display = "block";
    questionScreen.style.display = "none";
}

// Function to move to the next question
function nextQuestion() {
    resultScreen.style.display = "none";
    currentQ++;

    if (currentQ < questions.length) {
        displayQuestion();
        questionScreen.style.display = "block";
    } else {
        endQuiz();
        saveHighScore();
    }
}

// Function to end the quiz
function endQuiz() {
    clearInterval(timer);
    questionScreen.style.display = "none";
    endScreen.style.display = "block";
    finalScoreEl.textContent = timeLeft;
}

// Function to save the high score
function saveHighScore() {
    var initials = prompt("Enter your initials to save your score!");

    if (initials === "") {
        initials = "Anonymous";
    }

    var highScore = {
        initials: initials,
        score: timeLeft,
    };

    // Pull any existing high scores from local storage and parse them into an array or if there are none, create an empty array
    var highScoresHistArray = JSON.parse(localStorage.getItem("highScores")) || [];
    console.log(highScoresHistArray);

    // Add the new high score to the array
    highScoresHistArray.push(highScore);

    // Sort the high scores by score in descending order
    highScoresHistArray.sort(function (a, b) {
        return b.score - a.score;
    });

    // Display the high scores
    localStorage.setItem("highScores", JSON.stringify(highScoresHistArray));

    for (var i = 1; i < 11; i++) {
        var highScorer = document.getElementById(`li-${i}`);
        highScorer.textContent = highScoresHistArray[i - 1].initials + " - " + highScoresHistArray[i - 1].score;
    }
}

// Event listener for the clear button to clear local storage and reload the page
var clearButton = document.getElementById("clear-btn");

clearButton.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

function playAgain() {
    window.location.reload();
    
}