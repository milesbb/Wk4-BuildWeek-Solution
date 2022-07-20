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
  // const congrats1 = document.getElementById("con_P_in_text");
  // const congrats2 = document.getElementById("colored_P_in_text");
  // const congrats3 = document.getElementById("notcoloted_P_in_text");

  let correctAnswers =
    finalScore.toString() + "/" + questions.length.toString();
  let incorrectAnswers =
    (questions.length - finalScore).toString() +
    "/" +
    questions.length.toString();
  let correctPercentage1 =
    ((finalScore * 100) / questions.length).toString() + "%";
  let incorrectPercentage1 =
    (((questions.length - finalScore) * 100) / questions.length).toString() +
    "%";

  incorrectAnswersPercentage.innerText = incorrectPercentage1;
  correctAnswersPercentage.innerText = correctPercentage1;
  amountAnswered1.innerText = correctAnswers + " questions";
  amountUnAnswered1.innerText = incorrectAnswers + " questions";

  // if (((finalScore * 100)/questions.length) >= 60) {
  //   congrats1.innerText = "Congratulations!";
  //   congrats2.innerText = "You passed the exam";
  //   congrats3.innerText = "we will send you the certificate <br />in few minutes. Check your email(including <br />promotion / spam folder)"
  // } else {
  //   congrats1.innerText = "Unfortunately";
  //   congrats2.innerText = "You did not pass the exam";
  //   congrats3.innerText = "You will be contacted by a teacher <br />in few minutes. Prepare for a meeting <br />next week"
  // }
  // console.log("PERCENTAGES CALCULATED");
}



