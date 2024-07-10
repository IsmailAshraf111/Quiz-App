// Get Element into Variable

let countSpan = document.querySelector(
  ".quiz-info .count span                                                                                         "
);
let bullets = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let Sbtn = document.querySelector(".btn");
let Allbullets = document.querySelector(".bullets");
let results = document.querySelector(".results");
let countdown = document.querySelector(".countdown")
// Set Option
let CIndex = 0;
let RightAnswer = 0;
let CoDown;
function getQuestions() {
  let myRequest = new XMLHttpRequest(); 

  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let quObject = JSON.parse(this.responseText);
      let Qcunt = quObject.length;

      // Creat Bullets QC

      CreatB(Qcunt);

      // Add Question Data

      addQuDa(quObject[CIndex], Qcunt);

      // Count Down

      countDown(120, Qcunt);

      // Click On Submit
      Sbtn.onclick = () => {
        // Get Right Answer

        let RAnswer = quObject[CIndex].right_answer;
        CIndex++;

        // Check The Answer
        ChAnswer(RAnswer, Qcunt);

        // Remove Old Question
        quizArea.innerHTML = "";
        answersArea.innerHTML = "";

        // Add Question Data

        addQuDa(quObject[CIndex], Qcunt);

        // Handle Spans Class

        HBullets();

        ShowRe(Qcunt);

      // Count Down
      clearInterval(CoDown)

        countDown(10, Qcunt);

      };
    }
  };

  myRequest.open("GET", "QA.json", true);
  myRequest.send();
}

getQuestions();

function CreatB(num) {
  countSpan.innerHTML = num;

  // Create Spans

  for (let i = 0; i < num; i++) {
    // Creat Span

    let span = document.createElement("span");

    if (i === 0) {
      span.className = "active";
    }

    // Append Span To Bullets

    bullets.appendChild(span);
  }
}
function addQuDa(obj, count) {
  if (CIndex < count) {
    // Creat h2 Question Title

    let QTitle = document.createElement("h2");

    // Create Question Text

    let QText = document.createTextNode(obj.title);

    // Append Text To h2

    QTitle.appendChild(QText);

    // Appind h2 To quizArea

    quizArea.appendChild(QTitle);

    // Creat The Answer

    for (let i = 1; i <= 4; i++) {
      // Creat Div

      let div = document.createElement("div");

      div.className = "answers";

      // Append Div To answersArea

      answersArea.appendChild(div);

      // Creat Input

      let input = document.createElement("input");

      // Add tybe & Name & Id & Date Attribute

      input.name = `questions`;
      input.type = `radio`;
      input.id = `answer_${i}`;
      input.dataset.answer = obj[`answer_${i}`];

      // First Option Selected

      if (i === 1) {
        input.checked = true;
      }

      // Append Input To Answer Div

      div.appendChild(input);

      // Create Label

      let lable = document.createElement("label");

      lable.htmlFor = `answer_${i}`;

      // crate Label text

      let labelText = document.createTextNode(obj[`answer_${i}`]);

      // Append Label To Answer Div

      lable.appendChild(labelText);
      div.appendChild(lable);
    }
  }
}

function ChAnswer(RAnswer, count) {
  let answers = document.getElementsByName("questions");
  let TheChooseA;

  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      TheChooseA = answers[i].dataset.answer;
    }
  }

  if (RAnswer === TheChooseA) {
    RightAnswer++;
  }
}

function HBullets() {
  let BSpans = document.querySelectorAll(".bullets .spans span");
  let ArraySpan = Array.from(BSpans);
  ArraySpan.forEach((span, index) => {
    if (CIndex === index) {
      span.className = "active";
    }
  });
}

function ShowRe(count) {
  let TResults;
  if (CIndex === count) {
    bullets.remove();
    Sbtn.remove();
    quizArea.remove();
    answersArea.remove();
    Allbullets.remove();

    if (RightAnswer > count / 2 && RightAnswer < count) {
      TResults = ` ${RightAnswer} From ${count},<span class="good"> Is Good  </span>`;
    } else if (RightAnswer === count) {
      TResults = `${RightAnswer} Out Of ${count}, <span> Is Excellent </span>`;
    } else {
      TResults = `${RightAnswer} From ${count}, <span class="bad"> Bad </span>`;
    }

    results.innerHTML = TResults;
    results.style.height = "8rem";
    results.style.width = "8rem";
    results.style.display = "flex";
    results.style.alignItems = "center";
  }
}

function countDown(duration, count) {
  if (CIndex < count) {
    let minutes, seconds;

    CoDown = setInterval(function () {
      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);

      minutes = minutes < 10 ? `0${minutes}`: minutes;
      seconds = seconds < 10 ? `0${seconds}`: seconds;


      countdown.innerHTML = `${minutes}:${seconds}`;

      if (--duration < 0){

        clearInterval(CoDown)
        Sbtn.click()

      }

    }, 1000);
  }
}
