const questions = [
    {
        question: "What is the correct syntax to print a message in the console?",
        answers: [
            { text: "console.print()", correct: false },
            { text: "console.log()", correct: true },
            { text: "log.console()", correct: false },
            { text: "print.console()", correct: false },
        ]
    },
    {
        question: "Which of the following is not a JavaScript data type?",
        answers: [
            { text: "Number", correct: false },
            { text: "String", correct: false },
            { text: "Boolean", correct: false },
            { text: "Float", correct: true },
        ]
    },
    {
        question: "How do you declare a JavaScript variable?",
        answers: [
            { text: "let varName;", correct: true },
            { text: "variable varName;", correct: false },
            { text: "declare varName;", correct: false },
            { text: "def varName;", correct: false },
        ]
    },
    {
        question: "Which of the following is a correct comment in JavaScript?",
        answers: [
            { text: "&lt;!-- This is a comment --&gt;", correct: false },
            { text: "// This is a comment", correct: true },
            { text: "/* This is a comment */", correct: false },
            { text: "# This is a comment", correct: false },
        ]
    },
    {
        question: "How do you create a function in JavaScript?",
        answers: [
            { text: "function = myFunction()", correct: false },
            { text: "function myFunction()", correct: true },
            { text: "def myFunction()", correct: false },
            { text: "myFunction function()", correct: false },
        ]
    },
    {
        question: "How do you call a function named 'myFunction' in JavaScript?",
        answers: [
            { text: "call function myFunction()", correct: false },
            { text: "myFunction()", correct: true },
            { text: "call myFunction()", correct: false },
            { text: "execute myFunction()", correct: false },
        ]
    },
    {
        question: "How do you add a single-line comment in JavaScript?",
        answers: [
            { text: "// This is a comment", correct: true },
            { text: "&lt;!-- This is a comment --&gt;", correct: false },
            { text: "/* This is a comment */", correct: false },
            { text: "# This is a comment", correct: false },
        ]
    },
    {
        question: "What is the correct way to check if two variables are equal in value and type?",
        answers: [
            { text: "a == b", correct: false },
            { text: "a === b", correct: true },
            { text: "a != b", correct: false },
            { text: "a !=!= b", correct: false },
        ]
    },
    {
        question: "Which built-in method combines the elements of an array into a single string?",
        answers: [
            { text: "concat()", correct: false },
            { text: "join()", correct: true },
            { text: "split()", correct: false },
            { text: "combine()", correct: false },
        ]
    },
    {
        question: "How do you round the number 4.7 to the nearest integer in JavaScript?",
        answers: [
            { text: "Math.round(4.7)", correct: true },
            { text: "Math.ceil(4.7)", correct: false },
            { text: "Math.floor(4.7)", correct: false },
            { text: "round(4.7)", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("time");

let currentQuestionIndex = 0;
let score = 0;
let timer;
const timeLimit = 30;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    startTimer();
    showQuestion();
}

function startTimer() {
    let timeLeft = timeLimit;
    timerElement.innerHTML = timeLeft;
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerHTML = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeUp();
        }
    }, 1000);
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
        Array.from(answerButtons.children).forEach(button => {
            if (button.dataset.correct === "true") {
                button.classList.add("correct");
            }
        });
    }

    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
    });
    
    clearInterval(timer);
    nextButton.style.display = "block";
}

function handleTimeUp() {
    resetState();
    const timeUpMessage = document.createElement("div");
    timeUpMessage.innerHTML = "Time's up!";
    timeUpMessage.classList.add("incorrect");
    answerButtons.appendChild(timeUpMessage);
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        startTimer();
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Restart";
    nextButton.style.display = "block";

    nextButton.addEventListener("click", () => {
        window.location.href = "start.html";
    });
}

startQuiz();
