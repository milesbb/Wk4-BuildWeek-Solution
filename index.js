const questions = [
  {
    questionText: "Which one says dog? (q1 test)",
    correctAnswer: "dog",
    incorrectAnswers: ["cat", "cat", "cat"],
  },
  {
    questionText: "Which one says dog? (q2 test)",
    correctAnswer: "dog",
    incorrectAnswers: ["cat", "cat", "cat"],
  },
  {
    questionText: "Which one says dog? (q3 test)",
    correctAnswer: "dog",
    incorrectAnswers: ["cat", "cat", "cat"],
  },
  {
    questionText: "Which one says dog? (q4 test)",
    correctAnswer: "dog",
    incorrectAnswers: ["cat", "cat", "cat"],
  },
];

const buttons = document.getElementsByClassName("button");
const questionT = document.getElementById("question");
const counterShow = document.getElementById("counter");

let score = 0;
let qLog = 0;

//sets questions and buttons

const checkPosition = function () {
  for (let i = 0; i < questions.length; i++) {
    if (qLog > 3) {
      window.location.href = "results.html";
    } else {
      questionT.innerText = questions[qLog].questionText;
      counterShow.innerText = (qLog + 1).toString();
      let allAnswers = ["", "", "", ""];
      let rand = Math.floor(Math.random() * 3) + 1;
      allAnswers[rand] = questions[qLog].correctAnswer;
      let count1 = 0;
      for (let v = 0; v < 4; v++) {
        if (allAnswers[v] === "") {
          allAnswers[v] = questions[i].incorrectAnswers[count1];
          count1++;
        }
      }
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].value = allAnswers[i];
      }
    }
  }
  startTimer();
};

checkPosition();

let correct_answers = new Array();
for (let i = 0; i < questions.length; i++) {
  correct_answers[i] = questions[i].correctAnswer;
}

//sets even listeners for buttons

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function f(e) {
    if (correct_answers.indexOf(e.target.value) == -1) {
      qLog++;
      counttime = 20;
      checkPosition();
    } else {
      score++;
      qLog++;
      counttime = 20;
      checkPosition();
    }
  });
}

//Timer Code

const timerText = document.getElementById("timerText");
let counttime = 21;

function countdown() {
  counttime--;
  if (counttime < 1) {
    clearInterval(myInterval);
    qLog++;
    counttime = 20;
    checkPosition();
  }
  timerText.innerText = counttime.toString();
}

countdown();
var myInterval;
function startTimer() {
  myInterval = setInterval(countdown, 1000);
}
