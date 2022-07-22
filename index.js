const questions = [
  {
    questionText: "What does CPU stand for?",
    correctAnswer: "Central Processing Unit",
    incorrectAnswers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    questionText:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
    correctAnswer: "Final",
    incorrectAnswers: ["Static", "Private", "Public"],
  },
  {
    questionText:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correctAnswer: ".svg",
    incorrectAnswers: [".png", ".jpeg", ".gif"],
  },
  {
    questionText: "In web design, what does CSS stand for?",
    correctAnswer: "Cascading Style Sheet",
    incorrectAnswers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    questionText:
      "What is the code name for the mobile operating system Android 7.0?",
    correctAnswer: "Nougat",
    incorrectAnswers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    questionText: "On Twitter, what is the character limit for a Tweet?",
    correctAnswer: "140",
    incorrectAnswers: ["120", "160", "100"],
  },
  {
    questionText:
      "Which programming language shares its name with an island in Indonesia?",
    correctAnswer: "Java",
    incorrectAnswers: ["Python", "C", "Jakarta"],
  },
  {
    questionText:
      "Dennis M. Ritchie, an employee of AT&T, came up with which single letter computer programming language?",
    correctAnswer: "C",
    incorrectAnswers: ["X", "R", "J"],
  },
  {
    questionText:
      "What is the name of the language that was named after a famous French mathematician?",
    correctAnswer: "Pascal",
    incorrectAnswers: ["Euler", "Decartes", "Gauss"],
  },
  {
    questionText: "Which corporation released Visual Basic?",
    correctAnswer: "Microsoft",
    incorrectAnswers: ["Oracle", "Nokia", "Motorola"],
  },
];

const buttons = document.getElementsByClassName("button");
const questionT = document.getElementById("question");
const counterShow = document.getElementById("counter");
const counterQuestions = document.getElementById("counterQuestions");
counterQuestions.innerText = "/" + questions.length.toString();

const timerMask = document.getElementById("timerFront");
const timerBack = document.getElementById("timerBack");

function resetAnimation() {
  timerMask.classList.remove("mask");
  void timerMask.offsetWidth;
  timerMask.classList.add("mask");

  timerBack.classList.remove("timer");
  void timerBack.offsetWidth;
  timerBack.classList.add("timer");
}

//sets questions and buttons
var score = 0;
var qLog = 0;

const checkPosition = function () {
  for (let i = 0; i < questions.length; i++) {
    console.log(qLog.toString());
    if (qLog > questions.length - 1) {
      sessionStorage.setItem("score", score);
      window.location.href = "results.html";
      calculatePercentages(score);
    } else {
      questionT.innerText = questions[qLog].questionText;
      counterShow.innerText = (qLog + 1).toString();
      let allAnswers = ["", "", "", ""];
      let rand = Math.floor(Math.random() * 3) + 1;
      allAnswers[rand] = questions[qLog].correctAnswer;
      let count1 = 0;
      for (let v = 0; v < questions.length; v++) {
        if (allAnswers[v] === "") {
          allAnswers[v] = questions[qLog].incorrectAnswers[count1];
          count1++;
        }
      }
      for (let x = 0; x < buttons.length; x++) {
        buttons[x].value = allAnswers[x];
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
      counttime = 0;
    } else {
      score++;
      counttime = 0;
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
    resetAnimation();
    checkPosition();
  }
  timerText.innerText = counttime.toString();
}

countdown();
var myInterval;
function startTimer() {
  myInterval = setInterval(countdown, 1000);
}

function calculatePercentages(finalScore) {
  const amountAnswered1 = document.getElementById("amountAnswered");
  const amountUnAnswered1 = document.getElementById("amountUnAnswered");
  const correctAnswersPercentage = document.getElementById("correctPercentage");
  const incorrectAnswersPercentage = document.getElementById(
    "incorrectPercentage"
  );
  const congrats1 = document.getElementById("con_P_in_text");
  const congrats2 = document.getElementById("colored_P_in_text");
  const congrats3 = document.getElementById("notcoloted_P_in_text");

  let correctAnswers =
    finalScore.toString() + "/" + questions.length.toString();
  let incorrectAnswers =
    (questions.length - finalScore).toString() +
    "/" +
    questions.length.toString();
  let correctPercentage1 =
    ((finalScore * 100) / questions.length).toString() + "%";
  let precantge = (finalScore * 100) / questions.length;
  let incorrectPercentage1 =
    (((questions.length - finalScore) * 100) / questions.length).toString() +
    "%";

  incorrectAnswersPercentage.innerText = incorrectPercentage1;
  correctAnswersPercentage.innerText = correctPercentage1;
  amountAnswered1.innerText = correctAnswers + " questions";
  amountUnAnswered1.innerText = incorrectAnswers + " questions";

  let diagramPrecantges = (document.getElementsByClassName(
    "pie"
  )[0].style.cssText = "--p: " + precantge.toString());

  if ((finalScore * 100) / questions.length >= 60) {
    congrats1.innerText = "Congratulations!";
    congrats2.innerText = "You passed the exam";
    congrats3.innerText =
      "We will send you the certificate in few minutes. Check your email (including promotion / spam folder)";
  } else {
    congrats1.innerText = "Unfortunately";
    congrats2.innerText = "You did not pass the exam";
    congrats3.innerText =
      "You will be contacted by a teacher in few minutes. Prepare for a meeting next week";
  }
  console.log("PERCENTAGES CALCULATED");
}