// DOM Elements
const quizScreen = document.getElementById("quiz-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answer-buttons");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");
const quizHeader = document.querySelector(".quiz-header");
const resultScreen = document.getElementById("result-screen");

// GK Questions
const quizQuestions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false }
        ]
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        answers: [
            { text: "William Shakespeare", correct: true },
            { text: "Charles Dickens", correct: false },
            { text: "Jane Austen", correct: false },
            { text: "Mark Twain", correct: false }
        ]
    },
    {
        question: "What is the largest mammal in the world?",
        answers: [
            { text: "African Elephant", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Giraffe", correct: false },
            { text: "Polar Bear", correct: false }
        ]
    },
    {
        question: "Which country gifted the Statue of Liberty to the USA?",
        answers: [
            { text: "France", correct: true },
            { text: "England", correct: false },
            { text: "Spain", correct: false },
            { text: "Italy", correct: false }
        ]
    },
    {
        question: "Which is the smallest continent by land area?",
        answers: [
            { text: "Australia", correct: true },
            { text: "Europe", correct: false },
            { text: "Antarctica", correct: false },
            { text: "South America", correct: false }
        ]
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: [
            { text: "Au", correct: true },
            { text: "Ag", correct: false },
            { text: "Gd", correct: false },
            { text: "Go", correct: false }
        ]
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: [
            { text: "Vincent van Gogh", correct: false },
            { text: "Leonardo da Vinci", correct: true },
            { text: "Pablo Picasso", correct: false },
            { text: "Claude Monet", correct: false }
        ]
    },
    {
        question: "In which year did World War II end?",
        answers: [
            { text: "1945", correct: true },
            { text: "1939", correct: false },
            { text: "1918", correct: false },
            { text: "1950", correct: false }
        ]
    },
    {
        question: "Which organ purifies our blood?",
        answers: [
            { text: "Liver", correct: false },
            { text: "Heart", correct: false },
            { text: "Lungs", correct: false },
            { text: "Kidney", correct: true }
        ]
    }
];

// Quiz State Vars
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// Hide quiz area at start
quizHeader.style.display = "none";
answersContainer.style.display = "none";
progressBar.style.width = "0%";

// Event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = score;
    quizHeader.style.display = "block";
    answersContainer.style.display = "flex";
    startButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    answersDisabled = false;
    const currentQuestion = quizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = ((currentQuestionIndex) / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";
    questionText.textContent = currentQuestion.question;

    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");
        button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
        answersContainer.appendChild(button);
    });
}

function selectAnswer(event) {
    if (answersDisabled) return;
    answersDisabled = true;
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    Array.from(answersContainer.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else if (button === selectedButton) {
            button.classList.add("incorrect");
        }
        button.disabled = true;
    });

    if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1000);
}

function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");
    finalScoreSpan.textContent = score;
    maxScoreSpan.textContent = quizQuestions.length;
    const scorePercent = (score / quizQuestions.length) * 100;
    if (scorePercent === 100) {
        resultMessage.textContent = "Perfect Score! 🎉";
    } else if (scorePercent >= 70) {
        resultMessage.textContent = "Well Done! 👍";
    } else if (scorePercent >= 40) {
        resultMessage.textContent = "Good Effort! 🙂";
    } else {
        resultMessage.textContent = "Better Luck Next Time! 🍀";
    }
    // Reset for next attempt
    startButton.style.display = "block";
    quizHeader.style.display = "none";
    answersContainer.style.display = "none";
    progressBar.style.width = "0%";
}

function restartQuiz() {
    resultScreen.classList.remove("active");
    quizScreen.classList.add("active");
    startQuiz();
}