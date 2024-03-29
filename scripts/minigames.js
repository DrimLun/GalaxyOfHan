// Questions collection
const questions = [
    {
        question: "<p>Which ethnicity has the 鳳冠(Phoenix Crown)? Korean or Han漢?</p>",
        picture: '<img src="images/Q1.jpg" alt="Question1">',
        options: '<button class="option-button">Korean</button> <button class="option-button">Han漢</button>',
        answer: "Han漢",
        explanation: 'Only Chinese has 鳳冠(FengGuan). The Chinese has a saying "鳳冠霞帔 (FengGuan XiaPei)" , which is a set of wedding attire for brides.'
    },
    {
        question: "<p>Is this headwear Korean or Han漢?</p>",
        picture: '<img src="images/Q2.jpg" alt="Question2">',
        options: '<button class="option-button">Korean</button> <button class="option-button">Han漢</button> <button class="option-button">Both</button>',
        answer: "Han漢",
        explanation: 'Both of them adopted this type of headwear, but Korean borrowed it from Han漢 Culture. \bThe portrait it is the Chinese version. It is called 官帽(GuanMao) and was worn by ranked officials and ministers during Ming dynasty.</p> <p>官帽 is a type of 幞頭 and 幞頭 has many variations, it could have a non-east asian origin.</p>'
    },
    {
        question: "<p>Which one is Han漢?</p>",
        picture: '<img src="images/Q3-1.jpg" alt="Question3-1"> <img src="images/Q3-2.jpg" alt="Question3-2">',
        options: '<button class="option-button">Left</button> <button class="option-button">Right</button>',
        answer: "Right",
        explanation: 'The Chinese hat is named 大帽(DaMao) or 圓帽(YuanMao).'
    },
    {
        question: "<p>Which one is Korean?</p>",
        picture: '<img src="images/Q3-1.jpg" alt="Question3-1"> <img src="images/Q3-2.jpg" alt="Question3-2">',
        options: '<button class="option-button">Left</button> <button class="option-button">Right</button>',
        answer: "Left",
        explanation: 'The Korean hat is generally called "gat(갓) ". The Chinese hat is named "大帽(DaMao)" or "圓帽(YuanMao)".'
    },
    {
        question: "<p>Which one is China?</p>",
        picture: '<img src="images/Q5-1.jpg" alt="Question5-1"> <img src="images/Q5-2.jpg" alt="Question5-2">',
        options: '<button class="option-button">Left</button> <button class="option-button">Right</button> <button class="option-button">Both</button>',
        answer: "Both",
        explanation: 'China as a nation adopted both aesthetics at different eras. On the right is Manchurian bureaucrat robe, and on the left is ethnic Han, Ming Dynasty mandarin robe'
    },
    {
        question: "<p>Is this attire Korean?</p>",
        picture: '<img src="images/Q6.jpg" alt="Question6">',
        options: '<button class="option-button">Yes</button> <button class="option-button">No</button>',
        answer: "No",
        explanation: 'This type of ornamented crown and robe are exclusive to Chinese Emperors during late Ming dynasty. The crown is "翼善冠", pronounced "ik seon gwan" in Korean and "Yi Shan Guan" in mandarin'
    },
    {
        question: "<p>Which country is this ceremony from?</p>",
        picture: '<img src="images/Q7.jpg" alt="Question7">',
        options: '<button class="option-button">Japan</button> <button class="option-button">Ryuku</button>',
        answer: "Ryuku",
        explanation: 'The Chouhaiokishiki(朝拝御規式), or Imperial Court New Year\'s morning ceremony conducted by the king during the Ryukyu Kingdom era was held at Shurijo Castle Park in Naha, Okinawa on January 2, 2017. Source: Ryuku Shimpo'
    },
    {
        question: "<p>Which armor is Japanese?</p>",
        picture: '<img src="http://www.globaltimes.cn/Portals/0/attachment/2019/2019-08-07/3d492292-9813-4ce5-ac05-5dc49704806d.jpeg" alt="Question8"> <img src="https://collectionapi.metmuseum.org/api/collection/v1/iiif/639926/1423268/main-image" alt="Question8">',
        options: '<button class="option-button">Left</button> <button class="option-button">Right</button>',
        answer: "Right",
        explanation: 'During the eighteenth century, there was a revival of interest in medieval Japanese culture. As the demand for historical styles of armor began to increase among the wealthy lords, contemporary armorers studied the older forms and techniques in order to duplicate them. This example imitates a yoroi of the twelfth to thirteenth century.'
    },
    {
        question: "<p>Which painting depicts korean emperor?</p>",
        picture: '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/MingMuzong1.jpg/800px-MingMuzong1.jpg" alt="Question8"> <img src="https://herohanbok.files.wordpress.com/2020/03/ps01001001_don002_2017_0510144810123_don002590-00-00.jpg?w=594" alt="Question8">',
        options: '<button class="option-button">Left</button> <button class="option-button">Right</button>',
        answer: "Right",
        explanation: 'During the late Joseon dynasty (late 19<super>th</super> century), Koreans wear their belt on chest level.'
    },
    {
        question: "<p>Which painting depicts ZhongGuo emperor?</p>",
        picture: '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/MingMuzong1.jpg/800px-MingMuzong1.jpg" alt="Question8"> <img src="https://herohanbok.files.wordpress.com/2020/03/ps01001001_don002_2017_0510144810123_don002590-00-00.jpg?w=594" alt="Question8">',
        options: '<button class="option-button">Left</button> <button class="option-button">Right</button>',
        answer: "Left",
        explanation: 'Ming明 dynasty emperor\'s robe has 12 symbol ornaments, see <a href="https://en.wikipedia.org/wiki/Twelve_Ornaments">Twelve Ornaments 十二章紋</a>'
        // https://bkimg.cdn.bcebos.com/pic/43a7d933c895d143598e3e897bf082025baf07a4?x-bce-process=image/resize,m_lfit,w_536,limit_1/quality,Q_70
    }
];

lastQuestionIndex = -1;

let gameInProgress = true;

let yadayada;
let randomQuestion;
const optionButtons = document.getElementsByClassName("option-button");

// Function to randomly select a question
function getRandomQuestion() 
{
    let randomIndex;
    
    // Ensure the next question is different from the last one
    do 
    {
        randomIndex = Math.floor(Math.random() * questions.length);
    } 
    while (randomIndex === lastQuestionIndex);

    // Update the last question index
    lastQuestionIndex = randomIndex;

    return questions[randomIndex];
}

// Function to start the game
function startGame() 
{
    gameInProgress = true;
    
    const questionElement   = document.getElementById("question");
    const picture           = document.getElementById("pictures");
    const buttonsDiv        = document.getElementById("options");
    const gameResult        = document.getElementById("game_result");

    //Reset the display
    gameResult.innerHTML = "";
    undim(gameResult);

    // Get a random question, getRandomQuestion() returns an element of the dictionary
    const randomQuestion        = getRandomQuestion();

    // Display the question
    questionElement.innerHTML   = randomQuestion.question;

    //Display the pictures
    picture.innerHTML           = randomQuestion.picture;

    // Display the options as buttons
    buttonsDiv.innerHTML        = randomQuestion.options;

    // Add event listeners to the option buttons
    const optionButtons = document.getElementsByClassName("option-button");
    // for (const button of optionButtons) 
    // {
    //     button.addEventListener("click", 
    //     function()
    //     {
    //         checkAnswer(button.textContent, randomQuestion.answer, randomQuestion.explanation);
    //     }
    //     );
    // }

    for (button of optionButtons)
    {
        optionOnOff(button, button.textContent, randomQuestion.answer, randomQuestion.explanation)
    }
}

// Function to show the result
function checkAnswer(userAnswer, correctAnswer, explanation) 
{
    gameResult            = document.getElementById("game_result");
    // dim(gameResult);

    if (userAnswer == correctAnswer)
    {
        var result = "Correct!";
    }
    else
    {
        var result = "Wrong";
    }
    
    //Showing game result
    gameResult.innerHTML += `<p class="correctWrong">${result}</p><p class="explaination">${explanation}</p>`;

    // Add button that starts a new round
    gameResult.innerHTML += '<button id="next-question" onclick=startGame()>Next Question</button>';

    dim(gameResult);

    gameInProgress = false;
}

//Function to style game_result and dim background
function dim(gameResult)
{
    gameInProgress = false;

    gameResult.classList.add('dim');
    document.querySelector("nav").classList.add("nav-not-dimmed");

    if (gameInProgress == false)
    {
        const randomQuestion        = getRandomQuestion();
        const buttonsDiv            = document.getElementById("options");
        // Display the closed options
        buttonsDiv.innerHTML        = randomQuestion.options;

        const closedAnswerButtons                                   = randomQuestion.options;
        document.getElementsByClassName("option-button").innerHTML  = closedAnswerButtons;
    }

    const body = document.querySelector("body");

    // for (const body of bodies) 
    body.addEventListener("click", 
    {function ()
    {
        undim(gameResult);
    }
    }   
    );
}

//Function to remove style of game_result
function undim(gameResult)
{
    gameResult.classList.remove('dim');
    document.querySelector("nav").classList.remove("nav-not-dimmed");
}

//Function to add or remove option button event
function optionOnOff(button, chosenAnswer, correctAnswer, explanation) {
    if (gameInProgress) 
    {
        yadayada = function () {
            checkAnswer(chosenAnswer, correctAnswer, explanation);
        };

        button.addEventListener("click", yadayada);
    } 
    else if (!gameInProgress) {
        button.removeEventListener("click", yadayada);
    }
}

// Start the game when the page loads
window.onload = startGame;