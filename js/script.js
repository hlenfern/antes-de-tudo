/* =====================================================
   ANTES DE TUDO, CONHEÇA VOCÊ
   SCRIPT.JS
===================================================== */


/* ================= MENU MOBILE ================= */

const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");

if (menuButton && nav) {

    menuButton.addEventListener("click", () => {

        nav.classList.toggle("active");

        if (nav.classList.contains("active")) {
            menuButton.textContent = "×";
        } else {
            menuButton.textContent = "☰";
        }

    });


    nav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");

            menuButton.textContent = "☰";

        });

    });

}


/* ================= SINAIS INTERATIVOS ================= */

const hotspots = document.querySelectorAll(".hotspot");
const signCards = document.querySelectorAll(".sign-card");


function activateSign(signName) {

    hotspots.forEach(hotspot => {
        hotspot.classList.remove("active");

        if (hotspot.dataset.sign === signName) {
            hotspot.classList.add("active");
        }
    });


    signCards.forEach(card => {
        card.classList.remove("active");

        if (card.dataset.signCard === signName) {
            card.classList.add("active");

            card.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        }
    });

}


hotspots.forEach(hotspot => {

    hotspot.addEventListener("click", () => {

        activateSign(hotspot.dataset.sign);

    });

});


signCards.forEach(card => {

    card.addEventListener("click", () => {

        activateSign(card.dataset.signCard);

    });

});


/* ================= QUIZ ================= */

const questions = [

    {
        question: "Caroço na mama significa que a pessoa tem câncer.",
        answer: false,
        explanation: "Nem todo caroço é câncer. Existem diversas causas benignas, mas uma alteração nova deve ser avaliada."
    },

    {
        question: "Homens também podem desenvolver câncer de mama.",
        answer: true,
        explanation: "Verdade. É raro em homens, mas pode acontecer."
    },

    {
        question: "Câncer de mama sempre causa dor.",
        answer: false,
        explanation: "Nem sempre. Algumas alterações podem não causar dor."
    },

    {
        question: "Conhecer o próprio corpo ajuda a perceber alterações.",
        answer: true,
        explanation: "Verdade. Conhecer o que é habitual para você facilita perceber mudanças."
    },

    {
        question: "Ter um fator de risco significa que a pessoa terá câncer.",
        answer: false,
        explanation: "Não. Um fator de risco aumenta a possibilidade, mas não significa que a doença acontecerá."
    }

];


let currentQuestion = 0;
let score = 0;
let answered = false;


const questionText = document.getElementById("questionText");
const questionNumber = document.getElementById("questionNumber");
const progressFill = document.getElementById("progressFill");
const feedback = document.getElementById("feedback");

const answerButtons = document.querySelectorAll(".answer-button");

const quizContainer = document.getElementById("quizContainer");
const quizResult = document.getElementById("quizResult");

const scoreNumber = document.getElementById("scoreNumber");
const resultTitle = document.getElementById("resultTitle");
const resultText = document.getElementById("resultText");

const restartQuiz = document.getElementById("restartQuiz");


function loadQuestion() {

    answered = false;

    const question = questions[currentQuestion];

    questionText.textContent = question.question;

    questionNumber.textContent =
        `Pergunta ${currentQuestion + 1} de ${questions.length}`;

    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    progressFill.style.width = `${progress}%`;

    feedback.textContent = "";

    feedback.className = "feedback";


    answerButtons.forEach(button => {

        button.disabled = false;

        button.classList.remove("correct");
        button.classList.remove("wrong");

    });

}


function answer(selectedAnswer, clickedButton) {

    if (answered) {
        return;
    }

    answered = true;

    const question = questions[currentQuestion];

    const isCorrect =
        selectedAnswer === question.answer;


    answerButtons.forEach(button => {

        button.disabled = true;

        const buttonAnswer =
            button.dataset.answer === "true";

        if (buttonAnswer === question.answer) {
            button.classList.add("correct");
        }

    });


    if (isCorrect) {

        score++;

        clickedButton.classList.add("correct");

        feedback.textContent =
            "✓ Acertou! " + question.explanation;

        feedback.classList.add("correct-text");

    } else {

        clickedButton.classList.add("wrong");

        feedback.textContent =
            "✕ Não exatamente. " + question.explanation;

        feedback.classList.add("wrong-text");

    }


    setTimeout(() => {

        currentQuestion++;

        if (currentQuestion < questions.length) {

            loadQuestion();

        } else {

            showResult();

        }

    }, 2600);

}


answerButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedAnswer =
            button.dataset.answer === "true";

        answer(selectedAnswer, button);

    });

});


function showResult() {

    quizContainer.classList.add("hidden");

    quizResult.classList.remove("hidden");

    scoreNumber.textContent = score;


    if (score === 5) {

        resultTitle.textContent = "Você mandou muito bem!";

        resultText.textContent =
            "Você acertou todas as perguntas. Continue compartilhando informação de qualidade.";

    } else if (score >= 3) {

        resultTitle.textContent = "Muito bem!";

        resultText.textContent =
            "Você já sabe bastante. Continue aprendendo e compartilhando informação segura.";

    } else {

        resultTitle.textContent = "Hora de aprender um pouco mais!";

        resultText.textContent =
            "Errar faz parte. O importante é buscar informação confiável e cuidar da saúde.";

    }

}


if (restartQuiz) {

    restartQuiz.addEventListener("click", () => {

        currentQuestion = 0;
        score = 0;

        quizResult.classList.add("hidden");
        quizContainer.classList.remove("hidden");

        loadQuestion();

        document.getElementById("quiz").scrollIntoView({
            behavior: "smooth"
        });

    });

}


/* ================= COMPARTILHAR ================= */

const shareButton = document.getElementById("shareButton");
const shareMessage = document.getElementById("shareMessage");


if (shareButton) {

    shareButton.addEventListener("click", async () => {

        const shareData = {

            title: "Antes de Tudo, Conheça Você",

            text: "Conheça esta campanha educativa sobre prevenção e conscientização do câncer de mama.",

            url: window.location.href

        };


        try {

            if (navigator.share) {

                await navigator.share(shareData);

                shareMessage.textContent =
                    "Campanha compartilhada! 💗";

            } else {

                await navigator.clipboard.writeText(
                    window.location.href
                );

                shareMessage.textContent =
                    "Link copiado! Agora é só compartilhar. 💗";

            }

        } catch (error) {

            if (error.name !== "AbortError") {

                shareMessage.textContent =
                    "Não foi possível compartilhar automaticamente.";

            }

        }

    });

}


/* ================= ANIMAÇÃO AO ENTRAR ================= */

const animatedElements = document.querySelectorAll(
    ".sign-card, .risk-card, .prevention-card, .info-card"
);


const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    },
    {
        threshold: 0.1
    }
);


animatedElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    observer.observe(element);

});


/* ================= INICIAR ================= */

loadQuestion();