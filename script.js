let questions = [
    {
        "question": 'Das 1999 erschienenene "Medal of Honor"-Spiel wurde von einem berühmten Filmproduzenten begleitet. Wer war es?',
        "answer_1": 'Quentin Tarantino',
        "answer_2": 'Peter Jackson',
        "answer_3": 'Steven Spielberg',
        "answer_4": 'George Lucas',
        "right_answer": '3'
    },
    {
        "question": 'Wie wird "Counter-Strike" noch genannt?',
        "answer_1": 'Crysis',
        "answer_2": 'Half-Life',
        "answer_3": 'TTT',
        "answer_4": 'Gooseman',
        "right_answer": '2'
    },
    {
        "question": 'Welches dieser bekannten Aufbauspiele stammt von einem deutschen Entwickler und veröffentlichte 2019 einen neuen Titel der Reihe?',
        "answer_1": 'Anno 1800',
        "answer_2": 'Die Siedler',
        "answer_3": 'Age Of Empires',
        "answer_4": 'Tropico 6',
        "right_answer": '1'
    },
    {
        "question": '"Minecraft" ist eines der bekanntesten Spiele der Gaming-Geschichte. Wann wurde es veröffentlicht?',
        "answer_1": '2003',
        "answer_2": '2006',
        "answer_3": '2007',
        "answer_4": '2009',
        "right_answer": '4'
    },
    {
        "question": 'Kein Gamer, der nicht Atari kennt. Was bedeutet das Wort?',
        "answer_1": 'Kommunikation',
        "answer_2": 'Gewinn',
        "answer_3": 'Erfolg',
        "answer_4": 'Glänzen',
        "right_answer": '3'
    },
]

let currentQuestion = 0;
let rightAnswers = 0;
let AUDIO_SUCCESS = new Audio('audio/right.mp3');
let AUDIO_FAIL = new Audio('audio/wrong.mp3');


function init() {
    questionNumber();
    showQuestion();
}

function questionNumber() {
    let number = document.getElementById('questionNumber');
    number.innerHTML = '';
    number.innerHTML = questions.length;
}

function showQuestion() {
    if (gameIsOver()) {
        showEndScreen();
    }
    else {
        updateProgressBar();
        updateQuestion();
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length;
}

function answer(index) {
    let quest = questions[currentQuestion];
    let selectedQuestionNumber = index.slice(-1);
    let idOfRightAnswer = quest['right_answer'];

    if (selectedQuestionNumber == idOfRightAnswer) {
        document.getElementById(index).parentNode.classList.add('bg-success');
        rightAnswers++;
        AUDIO_SUCCESS.play();
    }
    else {
        document.getElementById(index).parentNode.classList.add('bg-danger');
        document.getElementById(`answer_${idOfRightAnswer}`).parentNode.classList.add('bg-success');
        AUDIO_FAIL.play();
    }
    document.getElementById('next_Button').disabled = false;
}

function nextQuestion() {
    currentQuestion++;
    document.getElementById('next_Button').disabled = true;
    for (let index = 1; index <= 4; index++) {
        document.getElementById(`answer_${index}`).parentNode.classList.remove('bg-success');
        document.getElementById(`answer_${index}`).parentNode.classList.remove('bg-danger');
    }
    showQuestion();
}

function restartGame() {
    document.getElementById('headerImage').src = 'img/other/bg-quiz.png';
    document.getElementById('endScreen').style = 'display: none';
    document.getElementById('question_Body').style = '';
    currentQuestion = 0;
    rightAnswers = 0;
    init();
}

function showEndScreen() {
    document.getElementById('endScreen').style = '';
    document.getElementById('question_Body').style = 'display: none';
    document.getElementById('allQuestionNumber').innerHTML = questions.length;
    document.getElementById('rightQuestionsNumber').innerHTML = rightAnswers;
    document.getElementById('headerImage').src = 'img/trophy.png';
    document.getElementById('headerImage').style = 'width: 100%; height: 200px; object-fit: contain';
}

function updateProgressBar() {
    let percent = currentQuestion / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progressBar').style.width = `${percent}%`;
}

function updateQuestion() {
    let quest = questions[currentQuestion];
    document.getElementById('currentQuestionNumber').innerHTML = currentQuestion + 1;
    document.getElementById('questionText').innerHTML = quest['question'];
    document.getElementById('answer_1').innerHTML = quest['answer_1'];
    document.getElementById('answer_2').innerHTML = quest['answer_2'];
    document.getElementById('answer_3').innerHTML = quest['answer_3'];
    document.getElementById('answer_4').innerHTML = quest['answer_4'];
}