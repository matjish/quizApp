const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "High Tech Machine Language", correct: false },
      { text: "Hyperlinks and Text Markup Language", correct: false }
    ]
  },
  {
    question: "Which language runs in the browser?",
    answers: [
      { text: "C#", correct: false },
      { text: "JavaScript", correct: true },
      { text: "Python", correct: false }
    ]
  },
  {
    question: "What does CSS control?",
    answers: [
      { text: "Logic", correct: false },
      { text: "Structure", correct: false },
      { text: "Styling", correct: true }
    ]
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    answers: [
      { text: "//", correct: true },
      { text: "<!-- -->", correct: false },
      { text: "**", correct: false }
    ]
  },
    {
    question: "What keyword declares a variable in JavaScript?",
    answers: [
      { text: "var", correct: true },
      { text: "int", correct: false },
      { text: "define", correct: false }
    ]
  },
  {
    question: "What does DOM stand for?",
    answers: [
      { text: "Document Object Model", correct: true },
      { text: "Data Object Method", correct: false },
      { text: "Desktop Oriented Mode", correct: false }
    ]
  },
  {
    question: "Which method adds an element to the end of an array?",
    answers: [
      { text: "push()", correct: true },
      { text: "add()", correct: false },
      { text: "append()", correct: false }
    ]
  },
];

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const scoreElement = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;

function shuffleQuestions(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.addEventListener("click", () => selectAnswer(button, answer.correct));
    answersElement.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  restartButton.style.display = "none";
  answersElement.innerHTML = "";
}

function selectAnswer(button, correct) {
  if (correct) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
  }

  Array.from(answersElement.children).forEach(btn => {
    btn.disabled = true;
  });

  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

restartButton.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  scoreElement.textContent = "";
  shuffleQuestions(questions);
  restartButton.style.display = "none";
  showQuestion();
});

function showScore() {
  resetState();
  questionElement.textContent = "Quiz Finished!";
  scoreElement.textContent = `Your score: ${score} / ${questions.length}`;
  restartButton.style.display = "block";
}

shuffleQuestions(questions);
showQuestion();
