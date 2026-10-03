/* =========================================================
   FRIEND ZONE BUS
   FULL PROTOTYPE
========================================================= */


/* =========================================================
   QUESTION DATA
========================================================= */

/*
    These are deliberately placeholder questions.

    We will replace them with the properly designed
    30-question assessment later.
*/

const questions = [

    {
        text:
            "Do they frequently seek opportunities to spend time alone with you?",
        type: "romantic"
    },

    {
        text:
            "Do they often talk to you about people they are attracted to?",
        type: "platonic"
    },

    {
        text:
            "Do they regularly bring another person into situations that would normally be one-on-one?",
        type: "platonic"
    },

    {
        text:
            "Do they flirt with you in ways that seem different from how they behave with other friends?",
        type: "romantic"
    },

    {
        text:
            "Do they ask you for advice about their romantic relationships?",
        type: "platonic"
    },

    {
        text:
            "Do they initiate physical affection that feels unusually intimate?",
        type: "romantic"
    },

    {
        text:
            "Do they frequently describe you using strongly friendship-oriented language?",
        type: "platonic"
    },

    {
        text:
            "Do they seem particularly interested in whether you are dating someone?",
        type: "romantic"
    },

    {
        text:
             "Do they ever try to set you up romantically with other people?",
        type: "platonic"
    },

    {
        text:
            "Do they create situations where the two of you could reasonably be mistaken for a couple?",
        type: "romantic"
    }

];


/*
    Reality Check Questions
*/

const realityQuestions = [

    {
        text:
            "Have you ever clearly communicated that you are romantically interested in this person?",
        type: "communication"
    },

    {
        text:
            "Have you ever directly asked them on a date or made an unmistakably romantic proposal?",
        type: "communication"
    },

    {
        text:
            "Have they ever directly expressed romantic interest in you?",
        type: "reciprocity"
    },

    {
        text:
            "After you made your romantic interest clear, how did they respond?",
        type: "response"
    },

    {
        text:
            "Have they ever explicitly told you that they only see you as a friend?",
        type: "rejection"
    },

    {
        text:
            "How much of your belief that you're in the friend zone comes from what they actually told you?",
        type: "certainty"
    }

];


/* =========================================================
   DOM
========================================================= */

const landingScreen =
    document.getElementById(
        "landingScreen"
    );

const questionScreen =
    document.getElementById(
        "questionScreen"
    );

const realityIntroScreen =
    document.getElementById(
        "realityIntroScreen"
    );

const realityQuestionScreen =
    document.getElementById(
        "realityQuestionScreen"
    );

const processingScreen =
    document.getElementById(
        "processingScreen"
    );

const revealScreen =
    document.getElementById(
        "revealScreen"
    );

const resultScreen =
    document.getElementById(
        "resultScreen"
    );


/* =========================================================
   SCREEN CONTROL
========================================================= */

function showScreen(screen) {

    const screens = [
        landingScreen,
        questionScreen,
        realityIntroScreen,
        realityQuestionScreen,
        processingScreen,
        revealScreen,
        resultScreen
    ];

    screens.forEach(
        item =>
            item.classList.add(
                "hidden"
            )
    );

    screen.classList.remove(
        "hidden"
    );

    window.scrollTo(
        0,
        0
    );
}


/* =========================================================
   START ASSESSMENT
========================================================= */

function startAssessment() {

    currentQuestion = 0;

    answers = [];

    romanticScore = 0;

    platonicScore = 0;

    selectedAnswer = null;

    showScreen(
        questionScreen
    );

    loadQuestion();
}


/* =========================================================
   LOAD QUESTION
========================================================= */

function loadQuestion() {

    const question =
        questions[
            currentQuestion
        ];

    document.getElementById(
        "questionText"
    ).textContent =
        question.text;


    document.getElementById(
        "questionNumber"
    ).textContent =
        currentQuestion + 1;


    const percentage =
        (
            (currentQuestion + 1)
            /
            questions.length
        ) * 100;


    document.getElementById(
        "progressBar"
    ).style.width =
        percentage + "%";


    const container =
        document.getElementById(
            "answerContainer"
        );


    container.innerHTML = "";


    selectedAnswer =
        answers[
            currentQuestion
        ] ?? null;


    const options = [

        {
            text: "Definitely",
            value: 2
        },

        {
            text: "Often",
            value: 1
        },

        {
            text: "Sometimes",
            value: 0
        },

        {
            text: "Rarely",
            value: -1
        },

        {
            text: "Never",
            value: -2
        }

    ];


    options.forEach(
        option => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "answer-option";


            button.textContent =
                option.text;


            button.onclick = () => {

                selectAnswer(
                    option.value,
                    button
                );

            };


            if (
                selectedAnswer ===
                option.value
            ) {

                button.classList.add(
                    "selected"
                );

            }


            container.appendChild(
                button
            );

        }
    );


    
}


/* =========================================================
   SELECT ANSWER
========================================================= */

function selectAnswer(
    value,
    button
) {

    selectedAnswer = value;


    const buttons =
        document.querySelectorAll(
            "#answerContainer .answer-option"
        );


    buttons.forEach(
        item =>
            item.classList.remove(
                "selected"
            )
    );


    button.classList.add(
        "selected"
    );


    /*
        Save answer immediately.
    */

    answers[
        currentQuestion
    ] = selectedAnswer;


    /*
        Give the selection a moment
        to visually lock in.
    */

    setTimeout(
        () => {

            const card =
                document.querySelector(
                    "#questionScreen .question-card"
                );


            if (card) {

                card.classList.add(
                    "question-exit-left"
                );

            }


            /*
                Wait for exit animation.
            */

            setTimeout(
                () => {

                    currentQuestion++;


                    if (
                        currentQuestion >=
                        questions.length
                    ) {

                        showScreen(
                            realityIntroScreen
                        );

                        return;
                    }


                    loadQuestion();


                    /*
                        New question enters
                        from the right.
                    */

                    const newCard =
                        document.querySelector(
                            "#questionScreen .question-card"
                        );


                    if (newCard) {

                        newCard.classList.add(
                            "question-enter"
                        );


                        requestAnimationFrame(
                            () => {

                                requestAnimationFrame(
                                    () => {

                                        newCard.classList.add(
                                            "question-enter-active"
                                        );

                                    }
                                );

                            }
                        );

                    }

                },
                220
            );

        },
        180
    );
}

/* =========================================================
   NEXT QUESTION
========================================================= */

function nextQuestion() {

    if (
        selectedAnswer === null
    ) {
        return;
    }


    answers[
        currentQuestion
    ] =
        selectedAnswer;


    currentQuestion++;


    if (
        currentQuestion >=
        questions.length
    ) {

        showScreen(
            realityIntroScreen
        );

        return;
    }


    loadQuestion();
}


/* =========================================================
   PREVIOUS QUESTION
========================================================= */

function previousQuestion() {

    if (
        currentQuestion === 0
    ) {

        showScreen(
            landingScreen
        );

        return;
    }


    currentQuestion--;

    loadQuestion();
}


/* =========================================================
   UPDATE NEXT BUTTON
========================================================= */

function updateNextButton() {

    const button =
        document.getElementById(
            "nextButton"
        );


    if (
        selectedAnswer === null
    ) {

        button.classList.add(
            "disabled"
        );

    } else {

        button.classList.remove(
            "disabled"
        );

    }
}


/* =========================================================
   REALITY CHECK
========================================================= */

function startRealityCheck() {

    currentRealityQuestion = 0;

    realityAnswers = [];

    communicationScore = 0;

    showScreen(
        realityQuestionScreen
    );

    loadRealityQuestion();
}


/* =========================================================
   LOAD REALITY QUESTION
========================================================= */

function loadRealityQuestion() {

    const question =
        realityQuestions[
            currentRealityQuestion
        ];


    /* -----------------------------------------
       QUESTION TEXT
    ----------------------------------------- */

    document.getElementById(
        "realityQuestionText"
    ).textContent =
        question.text;


    /* -----------------------------------------
       QUESTION NUMBER
    ----------------------------------------- */

    document.getElementById(
        "realityQuestionNumber"
    ).textContent =
        currentRealityQuestion + 1;


    /* -----------------------------------------
       PROGRESS
    ----------------------------------------- */

    const percentage =
        (
            (currentRealityQuestion + 1)
            /
            realityQuestions.length
        ) * 100;


    document.getElementById(
        "realityProgressBar"
    ).style.width =
        percentage + "%";


    /* -----------------------------------------
       ANSWER CONTAINER
    ----------------------------------------- */

    const container =
        document.getElementById(
            "realityAnswerContainer"
        );


    container.innerHTML = "";


    /* -----------------------------------------
       REMEMBER PREVIOUS ANSWER
    ----------------------------------------- */

    selectedRealityAnswer =
        realityAnswers[
            currentRealityQuestion
        ] ?? null;


    let options;


    /* =================================================
       Q1 — DID YOU COMMUNICATE INTEREST?
    ================================================= */

    if (
        currentRealityQuestion === 0
    ) {

        options = [

            {
                text:
                    "Yes",
                value: 2
            },

            {
                text:
                    "Not sure",
                value: 1
            },

            {
                text:
                    "No",
                value: 0
            }

        ];

    }


    /* =================================================
       Q2 — DID YOU MAKE A ROMANTIC MOVE?
    ================================================= */

    else if (
        currentRealityQuestion === 1
    ) {

        options = [

            {
                text:
                    "Yes",
                value: 2
            },

            {
                text:
                    "Not sure",
                value: 1
            },

            {
                text:
                    "No",
                value: 0
            }

        ];

    }


    /* =================================================
       Q3 — DID THEY EXPRESS ROMANTIC INTEREST?
    ================================================= */

    else if (
        currentRealityQuestion === 2
    ) {

        options = [

            {
                text:
                    "Yes",
                value: 2
            },

            {
                text:
                    "Not sure",
                value: 1
            },

            {
                text:
                    "No",
                value: 0
            }

        ];

    }


    /* =================================================
       Q4 — WHAT HAPPENED AFTER YOU TOLD THEM?
    ================================================= */

    else if (
        currentRealityQuestion === 3
    ) {

        options = [

            {
                text:
                    "They clearly reciprocated",
                value: 4
            },

            {
                text:
                    "They were positive, but didn't clearly reciprocate",
                value: 3
            },

            {
                text:
                    "They made it clear they only saw me as a friend",
                value: -3
            },

            {
                text:
                    "They avoided giving a clear answer",
                value: 1
            },

            {
                text:
                    "I haven't told them how I feel",
                value: 0
            }

        ];

    }


    /* =================================================
       Q5 — EXPLICIT FRIEND BOUNDARY
    ================================================= */

    else if (
        currentRealityQuestion === 4
    ) {

        options = [

            {
                text:
                    "Yes",
                value: 2
            },

            {
                text:
                    "Not sure",
                value: 1
            },

            {
                text:
                    "No",
                value: 0
            }

        ];

    }


    /* =================================================
       Q6 — FACT VS INFERENCE
    ================================================= */

    else if (
        currentRealityQuestion === 5
    ) {

        options = [

            {
                text:
                    "Mostly what they told me",
                value: 3
            },

            {
                text:
                    "About equal",
                value: 2
            },

            {
                text:
                    "Mostly what I inferred",
                value: 1
            },

            {
                text:
                    "I'm not sure",
                value: 0
            }

        ];

    }


    /* =================================================
       CREATE ANSWER BUTTONS
    ================================================= */

    options.forEach(
        option => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "answer-option";


            button.textContent =
                option.text;


            button.onclick = () => {

                selectRealityAnswer(
                    option.value,
                    button
                );

            };


            /* -----------------------------------------
               RESTORE PREVIOUS ANSWER
            ----------------------------------------- */

            if (
                selectedRealityAnswer ===
                option.value
            ) {

                button.classList.add(
                    "selected"
                );

            }


            container.appendChild(
                button
            );

        }
    );


    /* -----------------------------------------
       UPDATE NEXT BUTTON
    ----------------------------------------- */


}
/* =========================================================
   SELECT REALITY ANSWER
========================================================= */
function selectRealityAnswer(
    value,
    button
) {

    selectedRealityAnswer = value;


    const buttons =
        document.querySelectorAll(
            "#realityAnswerContainer .answer-option"
        );


    buttons.forEach(
        item =>
            item.classList.remove(
                "selected"
            )
    );


    button.classList.add(
        "selected"
    );


    /*
        Save immediately.
    */

    realityAnswers[
        currentRealityQuestion
    ] =
        selectedRealityAnswer;


    setTimeout(
        () => {

            const card =
                document.querySelector(
                    "#realityQuestionScreen .question-card"
                );


            if (card) {

                card.classList.add(
                    "question-exit-left"
                );

            }


            setTimeout(
                () => {

                    currentRealityQuestion++;


                    if (
                        currentRealityQuestion >=
                        realityQuestions.length
                    ) {

                        calculateResult();

                        return;
                    }


                    loadRealityQuestion();


                    const newCard =
                        document.querySelector(
                            "#realityQuestionScreen .question-card"
                        );


                    if (newCard) {

                        newCard.classList.add(
                            "question-enter"
                        );


                        requestAnimationFrame(
                            () => {

                                requestAnimationFrame(
                                    () => {

                                        newCard.classList.add(
                                            "question-enter-active"
                                        );

                                    }
                                );

                            }
                        );

                    }

                },
                220
            );

        },
        180
    );
}
/* =========================================================
   NEXT REALITY QUESTION
========================================================= */

function nextRealityQuestion() {

    if (
        selectedRealityAnswer === null
    ) {

        return;
    }


    realityAnswers[
        currentRealityQuestion
    ] =
        selectedRealityAnswer;


    currentRealityQuestion++;


    if (
        currentRealityQuestion >=
        realityQuestions.length
    ) {

        calculateResult();

        return;
    }


    loadRealityQuestion();
}


/* =========================================================
   PREVIOUS REALITY QUESTION
========================================================= */

function previousRealityQuestion() {

    if (
        currentRealityQuestion === 0
    ) {

        showScreen(
            realityIntroScreen
        );

        return;
    }


    currentRealityQuestion--;

    loadRealityQuestion();
}


/* =========================================================
   REALITY BUTTON
========================================================= */

function updateRealityButton() {

    const button =
        document.getElementById(
            "realityNextButton"
        );


    if (
        selectedRealityAnswer === null
    ) {

        button.classList.add(
            "disabled"
        );

    } else {

        button.classList.remove(
            "disabled"
        );

    }
}


/* =========================================================
   CALCULATE RESULT
========================================================= */

function calculateResult() {

    romanticScore = 0;

    platonicScore = 0;


    /*
        Calculate behavioral signals.

        Positive answers to romantic
        questions increase romance.

        Positive answers to platonic
        questions increase platonic.
    */

    questions.forEach(
        (question, index) => {

            const answer =
                answers[index] || 0;


            if (
                question.type ===
                "romantic"
            ) {

                romanticScore +=
                    Math.max(
                        answer,
                        0
                    );

            }


            if (
                question.type ===
                "platonic"
            ) {

                platonicScore +=
                    Math.max(
                        answer,
                        0
                    );

            }

        }
    );


    /*
        Convert to percentages.

        This is only prototype scoring.
    */

    const maxScore =
        questions.length * 2;


    romanticScore =
        Math.round(
            (
                romanticScore /
                maxScore
            ) * 100
        );


    platonicScore =
        Math.round(
            (
                platonicScore /
                maxScore
            ) * 100
        );


    /*
        Reality communication.

        Question 1 + 2 determine
        whether user expressed interest.

        Question 4 determines explicit
        friend-zone rejection.
    */

    const expressed =
        realityAnswers[0] >= 2 ||
        realityAnswers[1] >= 2;


    const directRejection =
        realityAnswers[3] >= 2;


    const reciprocal =
        realityAnswers[2] >= 2;


    /*
        Determine route.
    */

    if (
        directRejection
    ) {

        finalRoute =
            "confirmedFriend";

    }

    else if (
        expressed &&
        reciprocal &&
        romanticScore >
        platonicScore
    ) {

        finalRoute =
            "confirmedRomance";

    }

    else if (
        romanticScore >
        platonicScore + 15
    ) {

        finalRoute =
            "romanticUnconfirmed";

    }

    else if (
        platonicScore >
        romanticScore + 15
    ) {

        finalRoute =
            "platonicUnconfirmed";

    }

    else {

        finalRoute =
            "unknown";

    }


    /*
        Start processing.
    */

    showProcessing();
}


/* =========================================================
   PROCESSING
========================================================= */

function showProcessing() {

    showScreen(
        processingScreen
    );


    const messages = [

        "Checking the signals...",

        "Looking at the relationship pattern...",

        "Checking what has actually been communicated...",

        "Finding your route..."

    ];


    let index = 0;


    const interval =
        setInterval(
            () => {

                document.getElementById(
                    "processingText"
                ).textContent =
                    messages[index];


                index++;


                if (
                    index >=
                    messages.length
                ) {

                    clearInterval(
                        interval
                    );

                    setTimeout(
                        showReveal,
                        700
                    );

                }

            },
            800
        );
}


/* =========================================================
   REVEAL
========================================================= */

function showReveal() {

    showScreen(
        revealScreen
    );


    /*
        Reset everything.
    */

    const bus =
        document.getElementById(
            "revealBus"
        );

    const resultSign =
        document.getElementById(
            "emergingResult"
        );

    const secondary =
        document.getElementById(
            "secondaryStatus"
        );


    bus.style.transition =
        "none";

    bus.style.left =
        "50%";


    resultSign.classList.remove(
        "show"
    );


    secondary.classList.remove(
        "show"
    );


    void bus.offsetWidth;


    bus.style.transition =
        "left 2.5s cubic-bezier(.65,0,.25,1)";


    /*
        Reveal based on route.
    */

    setTimeout(
        () => {

            if (
                finalRoute ===
                "confirmedFriend"
            ) {

                revealFriendZone();

            }

            else if (
                finalRoute ===
                "confirmedRomance"
            ) {

                revealRomance();

            }

            else if (
                finalRoute ===
                "romanticUnconfirmed"
            ) {

                revealRomanticUnconfirmed();

            }

            else if (
                finalRoute ===
                "platonicUnconfirmed"
            ) {

                revealPlatonicUnconfirmed();

            }

            else {

                revealUnknown();

            }

        },
        500
    );
}


/* =========================================================
   REVEAL — FRIEND ZONE
========================================================= */

function revealFriendZone() {

    const bus =
        document.getElementById(
            "revealBus"
        );


    bus.style.left =
        "15%";


    setTimeout(
        () => {

            showSecondary(
                "🎫",
                "ROMANTIC INTEREST WAS ESTABLISHED"
            );

        },
        2800
    );


    finishReveal();
}


/* =========================================================
   REVEAL — ROMANCE
========================================================= */

function revealRomance() {

    const bus =
        document.getElementById(
            "revealBus"
        );


    bus.style.left =
        "85%";


    setTimeout(
        () => {

            showSecondary(
                "❤️",
                "ROMANTIC INTEREST WAS ESTABLISHED"
            );

        },
        2800
    );


    finishReveal();
}

/* =========================================================
   REVEAL — ROMANTIC UNCONFIRMED
========================================================= */

function revealRomanticUnconfirmed() {

    const board =
        document.getElementById(
            "emergingBoard"
        );


    board.textContent =
        "ROMANCE UNCONFIRMED";


    document
        .getElementById(
            "emergingResult"
        )
        .classList.add(
            "show"
        );


    setTimeout(
        () => {

            showSecondary(
                "♡",
                "ROMANTIC POSSIBILITY — NOT EXPRESSED"
            );

        },
        1000
    );


    finishReveal();
}

/* =========================================================
   REVEAL — PLATONIC UNCONFIRMED
========================================================= */

function revealPlatonicUnconfirmed() {

    const board =
        document.getElementById(
            "emergingBoard"
        );


    board.textContent =
        "NO TICKET";


    document
        .getElementById(
            "emergingResult"
        )
        .classList.add(
            "show"
        );


    setTimeout(
        () => {

            showSecondary(
                "🎫",
                "ROMANTIC INTEREST WAS NOT EXPRESSED"
            );

        },
        1000
    );


    finishReveal();
}


/* =========================================================
   REVEAL — UNKNOWN
========================================================= */

function revealUnknown() {

    const board =
        document.getElementById(
            "emergingBoard"
        );


    board.textContent =
        "UNKNOWN ROUTE";


    document
        .getElementById(
            "emergingResult"
        )
        .classList.add(
            "show"
        );


    setTimeout(
        () => {

            showSecondary(
                "🪧",
                "INSUFFICIENT EVIDENCE"
            );

        },
        1000
    );


    finishReveal();
}

/* =========================================================
   SECONDARY ICON
========================================================= */

function showSecondary(
    icon,
    label
) {

    document.getElementById(
        "secondaryIcon"
    ).innerHTML =
        icon;


    document.getElementById(
        "secondaryLabel"
    ).textContent =
        label;


    document.getElementById(
        "secondaryStatus"
    ).classList.add(
        "show"
    );
}


/* =========================================================
   FINISH REVEAL
========================================================= */

function finishReveal() {

    setTimeout(
        () => {

            document
                .getElementById(
                    "revealContinue"
                )
                .classList.remove(
                    "hidden"
                );

        },
        3000
    );
}


/* =========================================================
   FINAL RESULT
========================================================= */

function showFinalResult() {

    showScreen(
        resultScreen
    );


    /*
        Scores
    */

    document.getElementById(
        "platonicScore"
    ).textContent =
        platonicScore + "%";


    document.getElementById(
        "romanticScore"
    ).textContent =
        romanticScore + "%";


    /*
        Communication score.

        Prototype calculation.
    */

    const communication =
        Math.round(
            (
                (
                    (realityAnswers[0] || 0) +
                    (realityAnswers[1] || 0) +
                    (realityAnswers[2] || 0) +
                    (realityAnswers[3] || 0)
                )
                /
                8
            ) * 100
        );


    document.getElementById(
        "communicationScore"
    ).textContent =
        Math.min(
            communication,
            100
        ) + "%";


    /*
        Animate meters.
    */

    setTimeout(
        () => {

            document.getElementById(
                "platonicFill"
            ).style.width =
                platonicScore + "%";


            document.getElementById(
                "romanticFill"
            ).style.width =
                romanticScore + "%";


            document.getElementById(
                "communicationFill"
            ).style.width =
                Math.min(
                    communication,
                    100
                ) + "%";

        },
        200
    );


    /*
        Generate final interpretation.
    */

    generateFinalResult();
}


/* =========================================================
   FINAL RESULT CONTENT
========================================================= */

function generateFinalResult() {

    const title =
        document.getElementById(
            "resultTitle"
        );

    const subtitle =
        document.getElementById(
            "resultSubtitle"
        );

    const cardTitle =
        document.getElementById(
            "resultCardTitle"
        );

    const explanation =
        document.getElementById(
            "resultExplanation"
        );


    const positive =
        document.getElementById(
            "positiveEvidence"
        );


    const uncertainty =
        document.getElementById(
            "uncertaintyEvidence"
        );


    positive.innerHTML = "";

    uncertainty.innerHTML = "";


    if (
        finalRoute ===
        "confirmedFriend"
    ) {

        title.textContent =
            "You're on the Friend Zone route.";

        subtitle.textContent =
            "The destination has been established.";

      cardTitle.innerHTML = `
    <span class="result-title-content">

        <span class="result-mini-bus">

            <span class="result-mini-bus-body">
                <span class="result-mini-bus-window window-a"></span>
                <span class="result-mini-bus-window window-b"></span>
                <span class="result-mini-bus-window window-c"></span>
            </span>

            <span class="result-mini-bus-wheel wheel-a"></span>
            <span class="result-mini-bus-wheel wheel-b"></span>

        </span>

        <span>
            Confirmed Friend Zone
        </span>

    </span>
`;

        explanation.textContent =
            "Your answers suggest a strongly platonic relationship, and the reality check indicates that a romantic boundary has actually been communicated.";

        addEvidence(
            positive,
            "Clear platonic boundary was established."
        );

        addEvidence(
            positive,
            "The relationship pattern is predominantly friendship-oriented."
        );

        addEvidence(
            uncertainty,
            "Behavior alone is still not mind reading."
        );

    }


    else if (
        finalRoute ===
        "confirmedRomance"
    ) {

        title.textContent =
            "The bus is heading toward romance.";

        subtitle.textContent =
            "This isn't just signal reading anymore.";

        cardTitle.textContent =
            "❤️ Romantic Route";

        explanation.textContent =
            "Your answers contain stronger romantic signals, and the reality check indicates that romantic interest has actually been communicated or reciprocated.";

        addEvidence(
            positive,
            "Romantic signals outweighed platonic signals."
        );

        addEvidence(
            positive,
            "Romantic interest was directly established."
        );

        addEvidence(
            uncertainty,
            "A positive signal does not guarantee a future relationship."
        );

    }


    else if (
        finalRoute ===
        "romanticUnconfirmed"
    ) {

        title.textContent =
            "The bus may be heading toward romance.";

        subtitle.textContent =
            "But you don't have a ticket yet.";

        cardTitle.textContent =
            "♡ Romantic Possibility — Unconfirmed";

        explanation.textContent =
            "Your answers contain considerably more romantic than platonic signals. However, romantic interest has not actually been communicated clearly enough to establish the destination.";

        addEvidence(
            positive,
            "Several behaviors resemble romantic interest."
        );

        addEvidence(
            positive,
            "Romantic signals outweighed platonic signals."
        );

        addEvidence(
            uncertainty,
            "You have not clearly communicated your romantic interest."
        );

        addEvidence(
            uncertainty,
            "Behavior can have multiple explanations."
        );

    }


    else if (
        finalRoute ===
        "platonicUnconfirmed"
    ) {

        title.textContent =
            "The relationship looks platonic.";

        subtitle.textContent =
            "But you haven't actually tested the route.";

        cardTitle.textContent =
            "🎫 Friendship — Unconfirmed";

        explanation.textContent =
            "Your answers lean strongly toward a friendship pattern, but you haven't clearly established that the other person has rejected you romantically.";

        addEvidence(
            positive,
            "The relationship contains strong friendship signals."
        );

        addEvidence(
            uncertainty,
            "Romantic interest was never clearly communicated."
        );

        addEvidence(
            uncertainty,
            "You may be interpreting friendship as rejection."
        );

    }


    else {

        title.textContent =
            "The route is unclear.";

        subtitle.textContent =
            "There isn't enough separation between the signals.";

        cardTitle.textContent =
            "🗺️ Unknown Route";

        explanation.textContent =
            "Your answers contain a mixture of signals, but not enough evidence to confidently classify the relationship as romantic or platonic.";

        addEvidence(
            positive,
            "There are signals pointing in more than one direction."
        );

        addEvidence(
            uncertainty,
            "The evidence isn't strong enough to establish a destination."
        );

        addEvidence(
            uncertainty,
            "Direct communication is limited or unclear."
        );

    }
}


/* =========================================================
   ADD EVIDENCE
========================================================= */

function addEvidence(
    list,
    text
) {

    const item =
        document.createElement(
            "li"
        );


    item.textContent =
        text;


    list.appendChild(
        item
    );
}


/* =========================================================
   RESTART
========================================================= */

function restartAssessment() {

    currentQuestion = 0;

    currentRealityQuestion = 0;

    answers = [];

    realityAnswers = [];

    romanticScore = 0;

    platonicScore = 0;

    communicationScore = 0;

    finalRoute = "";

    showScreen(
        landingScreen
    );
}
/* =========================================================
   INFORMATION MODAL
========================================================= */

function openInfo(section) {

    const modal =
        document.getElementById(
            "infoModal"
        );


    const sections =
        document.querySelectorAll(
            ".info-section"
        );


    sections.forEach(
        item =>
            item.classList.remove(
                "active"
            )
    );


    const selected =
        document.getElementById(
            "info-" + section
        );


    if (!selected) {
        return;
    }


    selected.classList.add(
        "active"
    );


    modal.classList.remove(
        "hidden"
    );

}


function closeInfo() {

    document.getElementById(
        "infoModal"
    ).classList.add(
        "hidden"
    );

}


/* Close when clicking outside the card */

document.addEventListener(
    "click",
    function(event) {

        const modal =
            document.getElementById(
                "infoModal"
            );


        if (
            event.target === modal
        ) {

            closeInfo();

        }

    }
);


/* Close with Escape */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            closeInfo();

        }

    }
);