const questions = [
  {
    questionText: "something1",
    correctAnswer: "dog",
    incorrectAnswers: ["cat", "cat", "cat"],
  },
  {
    questionText: "something2",
    correctAnswer: "dog",
    incorrectAnswers: ["cat", "cat", "cat"],
  },
  {
    questionText: "something3",
    correctAnswer: "dog",
    incorrectAnswers: ["cat", "cat", "cat"],
  },
  {
    questionText: "something4",
    correctAnswer: "dog",
    incorrectAnswers: ["cat", "cat", "cat"],
  },
];

const buttons = document.getElementsByClassName("button");

let score = 0;
let qLog = 0;

const checkPosition = function () {
  for (let i = 0; i < questions.length; i++) {
    if (qLog > 4) {
      window.location.href = "results.html";
    } else {
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
};

checkPosition();

let correct_answers = new Array();
for (let i = 0; i < questions.length; i++) {
  correct_answers[i] = questions[i].correctAnswer;
}

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function f(e) {
    if (correct_answers.indexOf(e.target.value) == -1) {
      qLog++;
      checkPosition();
    } else {
      score++;
      qLog++;
      checkPosition();
    }
  });
}
