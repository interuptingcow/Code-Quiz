const questions = [
    {
        question: "What does HTML stand for?",
        choices: ["Hyper Text Markup Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language"],
        correctAnswer: "Hyper Text Markup Language"
    },
    {
        question: "What is the correct way to include a JavaScript file in an HTML document?",
        choices: ["<script src='script.js'></script>", "<javascript src='script.js'></javascript>", "<js file='script.js'></js>"],
        correctAnswer: "<script src='script.js'></script>"
    },
    // Add more questions as needed
]

let currentQuestionIndex = 0;
let timer;
let timeLeft = 60; // Initial time in seconds

const questionScreen = document.getElementById("question-screen");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");


startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", nextQuestion);
saveButton.addEventListener("click", saveScore);

function startQuiz() {
    startButton.style.display = "none";
    questionScreen.style.display = "block";
    displayQuestion();
    startTimer();
}

function startTimer() {
    timer = setInterval(function () {
        timeLeft--;
        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
}

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
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

function checkAnswer(userChoice) {
    const currentQuestion = questions[currentQuestionIndex];
    if (userChoice === currentQuestion.correctAnswer) {
        resultMessageEl.textContent = "Correct!";
    } else {
        resultMessageEl.textContent = "Incorrect!";
        timeLeft -= 10; // Subtract 10 seconds for incorrect answer
    }

    resultScreen.style.display = "block";
    questionScreen.style.display = "none";
}