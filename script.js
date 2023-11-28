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