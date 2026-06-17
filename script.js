const questions = [
  {
    question: "Qual é o resultado de 8 x 7?",
    answers: ["54", "56", "58", "60"],
    correct: 1
  },
  {
    question: "Qual planeta é conhecido como planeta vermelho?",
    answers: ["Vênus", "Marte", "Júpiter", "Saturno"],
    correct: 1
  },
  {
    question: "Quem escreveu 'Dom Casmurro'?",
    answers: ["Machado de Assis", "José de Alencar", "Carlos Drummond", "Monteiro Lobato"],
    correct: 0
  },
  {
    question: "Qual é a capital do Brasil?",
    answers: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
    correct: 2
  },
  {
    question: "Qual é a fórmula da água?",
    answers: ["CO2", "H2O", "O2", "NaCl"],
    correct: 1
  }
];

let current = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result");
const scoreEl = document.getElementById("score");

function loadQuestion() {
  answersEl.innerHTML = "";

  let q = questions[current];
  questionEl.textContent = q.question;

  q.answers.forEach((ans, index) => {
    const btn = document.createElement("button");
    btn.textContent = ans;
    btn.classList.add("answer");

    btn.onclick = () => checkAnswer(index);

    answersEl.appendChild(btn);
  });
}

function checkAnswer(index) {
  if (index === questions[current].correct) {
    score++;
  }
  nextBtn.style.display = "block";
}

nextBtn.onclick = () => {
  current++;

  if (current < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }

  nextBtn.style.display = "none";
};

function showResult() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreEl.textContent = `Você acertou ${score} de ${questions.length} perguntas!`;
}

loadQuestion();
nextBtn.style.display = "none";
