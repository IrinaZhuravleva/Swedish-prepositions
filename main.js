var answers = ["-", "på", "i", "om"];
var button = document.querySelector('button');
button.disabled = true;

var tralivali = [{
        question: `Mariann tränar sig tre gånger _______ veckan.`,
        answers: answers,
        correct: 2
    },
    {
        question: 'Varje gång tränar hon _______ två timmar ungefär.',
        answers: answers,
        correct: 2
    }, {
        question: 'Hon springer snabbt, 5 kilometer _______ 15 minuter.',
        answers: answers,
        correct: 1,
    }, {
        question: 'Bengt lyssnar på sportnyheter flera gånger _______ dagen.',
        answers: answers,
        correct: 3,
    }, {
        question: 'I dag talar de om en man som har sprungit 100 meter _______ 9 sekunder.',
        answers: answers,
        correct: 1,
    }, {
        question: 'Örjan har tränat karate _______ 3 år.',
        answers: answers,
        correct: 0,
    }, {
        question: 'Han tränar 4 gånger _______ veckan.',
        answers: answers,
        correct: 2,
    }, {
        question: 'Eva rider. Hon rider två gånger _______ veckan på en ridskola.',
        answers: answers,
        correct: 2,
    }, {
        question: 'Några gånger _______ månader rider hon en kompis häst.',
        answers: answers,
        correct: 2,
    }, {
        question: 'Minst två gånger _______ året åker hon på ridresa till något exotiskt ställe.',
        answers: answers,
        correct: 3,
    }, {
        question: '_______ vintern åker jag skidor.',
        answers: answers,
        correct: 1,
    }, {
        question: 'Jag vare jätteduktig _______ styrketräning.',
        answers: answers,
        correct: 1,
    }, {
        question: 'Om du vill gå ner _______ vikt bör du gå på gympa.',
        answers: answers,
        correct: 2,
    }, {
        question: 'Man kan försöka skära ner på fettet _______ maten ock röra på sig mer.',
        answers: answers,
        correct: 2,
    }, {
        question: 'På morgonen är hans barn så långsamma. Han säger: Skynda _______! , men de lyssnar inte.',
        answers: answers,
        correct: 1,
    }, {
        question: 'Jag tycker inte att gå _______ simhallen.',
        answers: answers,
        correct: 2,
    }, {
        question: 'Jag har blivit kär _______ min bäst väns flickvän.',
        answers: answers,
        correct: 2,
    }, {
        question: 'Bry dig inte _______ att han luktar.',
        answers: answers,
        correct: 3,
    }, {
        question: 'Har du gott _______ pengar?',
        answers: answers,
        correct: 3,
    },
    {
        question: 'Min kompis och jag har känt varandra _______ mer än tjugo år.',
        answers: answers,
        correct: 2,
    }
];

var currentQuestionIndex = 0;
var expressionNumber = document.querySelector('.expression-number');
expressionNumber.innerText = `Номер вопроса: ${currentQuestionIndex + 1} из ${tralivali.length}`;


var correctAnswer = 0;
var result = {
    correct: 0,
    incorrect: 0
}

function showQuestion() {
    var questionToShow = selectQuestion();
    addQuestionToSite(questionToShow);
}

//тасование фишера-йетса
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
        [array[i], array[j]] = [array[j], array[i]];
    };
    return array;
}

var tralivaliShuffled = shuffle(tralivali);

function selectQuestion() {
    return tralivaliShuffled[currentQuestionIndex];
}

var nextButton = document.querySelector('button.nextButton')

function nextQuestion(correct, index) {
    checkVisibility();

    var str = tralivaliShuffled[currentQuestionIndex].question.split('_______');
    var nextButton = document.querySelector('button.nextButton')
    str.splice(1, 0, answers[index].toUpperCase());
    var readyStr = str.join(' ');
    document.querySelector('.question').innerHTML = readyStr;

    if (correct == index) {
        document.querySelector('.checking-correct').style.display = 'block';
        if (nextButton.disabled) {
            nextButton.disabled = false;
        }
    } else {
        document.querySelector('.checking-incorrect').style.display = 'block';
        if (!nextButton.disabled) {
            nextButton.disabled = true;
        }
    }
}


function addQuestionToSite(item) {
    document.querySelector('.question').innerHTML = item.question;
    item.answers.forEach(function (answer, index) {
        document.querySelector('.answers').insertAdjacentHTML("beforeend", "<button onClick='nextQuestion(" + item.correct + ", " + index + ")'>" + answer + "</button> &nbsp;")
    })
}

function checkVisibility() {
    document.querySelectorAll('.checking').forEach(function (item) {
        if (item.style.display == 'block') {
            item.style.display = 'none';
        }
    });
}

function nextButtonClickHandler() {
    if (currentQuestionIndex === tralivali.length - 1) {
        clearAnswersHTML();
        if (document.querySelector('.checking-correct').style.display == 'block') {
            document.querySelector('.checking-correct').style.display = 'none';
        }
        document.querySelector('.nextButton').style.display = 'none';

        document.querySelector('.question').innerHTML = `Поздравляем!!! Вы справились))). Хотите продолжить?<button style="color: black; background-color: #ffffff;  " onClick="location.reload()">Повторить</button>`;
    } else {
        clearAnswersHTML();
        currentQuestionIndex++;
        document.querySelector('.expression-number').innerText = `Номер вопроса: ${currentQuestionIndex + 1} из ${tralivali.length}`;
        checkVisibility();
        showQuestion();
    }
}

function clearAnswersHTML() {
    document.querySelector('.answers').innerHTML = "";
}

nextButton.addEventListener('click', function () {
    nextButtonClickHandler();
})

showQuestion();
