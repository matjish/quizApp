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
  }
];

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;

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

function showScore() {
  resetState();
  questionElement.textContent = "Quiz Finished!";
  scoreElement.textContent = `Your score: ${score} / ${questions.length}`;
  nextButton.style.display = "none";
}

showQuestion();
