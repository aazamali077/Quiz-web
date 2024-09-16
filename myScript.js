const questions = [
        {
            "question": "What planet is known as the 'Red Planet'?",
            "answers": [
                { "text": "Earth", "correct": false },
                { "text": "Mars", "correct": true },
                { "text": "Jupiter", "correct": false },
                { "text": "Venus", "correct": false }
            ]
        },
        {
            "question": "Which gas do plants use to make their food during photosynthesis?",
            "answers": [
                { "text": "Oxygen", "correct": false },
                { "text": "Carbon dioxide", "correct": true },
                { "text": "Nitrogen", "correct": false },
                { "text": "Hydrogen", "correct": false }
            ]
        },
        {
            "question": "What is the largest ocean on Earth?",
            "answers": [
                { "text": "Atlantic Ocean", "correct": false },
                { "text": "Indian Ocean", "correct": false },
                { "text": "Pacific Ocean", "correct": true },
                { "text": "Arctic Ocean", "correct": false }
            ]
        },
        {
            "question": "What force pulls objects towards the Earth?",
            "answers": [
                { "text": "Magnetism", "correct": false },
                { "text": "Friction", "correct": false },
                { "text": "Gravity", "correct": true },
                { "text": "Electricity", "correct": false }
            ]
        },
        {
            "question": "Which layer of the Earth is the hottest?",
            "answers": [
                { "text": "Crust", "correct": false },
                { "text": "Mantle", "correct": false },
                { "text": "Outer core", "correct": false },
                { "text": "Inner core", "correct": true }
            ]
        },
        {
            "question": "Which part of the plant is responsible for absorbing water and nutrients from the soil?",
            "answers": [
                { "text": "Roots", "correct": true },
                { "text": "Stem", "correct": false },
                { "text": "Leaves", "correct": false },
                { "text": "Flower", "correct": false }
            ]
        },
        {
            "question": "What is the longest river in the world?",
            "answers": [
                { "text": "Nile River", "correct": true },
                { "text": "Amazon River", "correct": false },
                { "text": "Yangtze River", "correct": false },
                { "text": "Mississippi River", "correct": false }
            ]
        },
        {
            "question": "What do we call the process of water changing from a liquid to a gas?",
            "answers": [
                { "text": "Condensation", "correct": false },
                { "text": "Evaporation", "correct": true },
                { "text": "Freezing", "correct": false },
                { "text": "Melting", "correct": false }
            ]
        },
        {
            "question": "Which continent is the Sahara Desert located on?",
            "answers": [
                { "text": "Asia", "correct": false },
                { "text": "Australia", "correct": false },
                { "text": "Africa", "correct": true },
                { "text": "South America", "correct": false }
            ]
        },
        {
            "question": "Which animal is known for changing its color to blend into its surroundings?",
            "answers": [
                { "text": "Chameleon", "correct": true },
                { "text": "Elephant", "correct": false },
                { "text": "Tiger", "correct": false },
                { "text": "Penguin", "correct": false }
            ]
        } 
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answerbtns");
const nextBtn = document.getElementById("next-btn");

let currentQUestionIndex = 0;
let score = 0;

function StartQuiz(){
    currentQUestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    ShowQuestion();
}

function ShowQuestion(){
    resetState();
    let currQuestion = questions[currentQUestionIndex];
    let questionNo = currentQUestionIndex+1;
    questionElement.innerHTML = questionNo+". "+ currQuestion.question;

    currQuestion.answers.forEach(answers => {
        const buton = document.createElement("button");
        buton.innerHTML = answers.text;
        buton.classList.add("btn");
        answerButtons.appendChild(buton);

        if(answers.correct){
            buton.dataset.correct = answers.correct;
        }
        buton.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextBtn.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(buton =>{
        if(buton.dataset.correct === "true"){
            buton.classList.add("correct");
        }
        buton.disabled = true
    });
    nextBtn.style.display = "block";
}

function ShowScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handleNextBtn(){
    currentQUestionIndex++;
    if(currentQUestionIndex<questions.length){
        ShowQuestion();
    }
    else{
        ShowScore();
    }
}

nextBtn.addEventListener("click", ()=>{
    if(currentQUestionIndex<questions.length){
        handleNextBtn();
    }
    else{
        StartQuiz();
    } 
});

StartQuiz();
