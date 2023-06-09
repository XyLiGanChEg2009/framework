class RPG {
    constructor() {
        this.question = document.getElementById("text");
        this.AnswersButtonsVariant = document.getElementById("chose-buttons");

        this.state = {};

        this.situations = [
            {
                id: 1,
                text: "Доброе утро, последний герой: Ты спал всего 2 часа и уже слышишь звон будильника. Проснуться или перевести будильник?",
                image: "img/bez-sna.jpg",
                answers: [
                    {
                        text: "проснуться",
                        goTo: 2,
                    }, {
                        text: "Спать дальше",
                        goTo: 7,
                    }
                ],
            }, {
                id: 2,
                image: "img/utro.jpg",
                text: "Утренние процедуры: Кое-как проснувшись, ты думаешь стоит ли вообще куда-то идти, или же лучше сидеть дома в теплой и уютной кроватке. Собираться в шарагу?",
                answers: [
                    {
                        text: "да",
                        goTo: 3,
                    },

                    {
                        text: "нет",
                        goTo: 7,
                    }
                ],

            },

            {
                id: 3,
                image: "img/avtobik2.jpg",
                text: "Автобус: Ты сел на свой переполненный автобус до шараги. К счатью тебе досталось сидячее место. Спать в автобусе или же залипать в телефон?",
                answers: [
                    {
                        text: "Залипать в телефон",

                        goTo: 4,
                    },

                    {
                        text: "Слушать музыку",
                        goTo: 7,

                    },

                    {
                        text: "Спать",
                        goTo: 7,
                    }
                ],

            },

            {
                id: 4,
                image: "img/Win.gif",
                text: "Победа!!!! Ты добрался до шараги. Тебя ждет счатливое будущее!!!",
                answers: [
                    {
                        text: "Начать снова?",

                        goTo: 1,
                    },

                    {
                        text: "Завершить",
                        goTo: -1,

                    }
                ],

            }

        ];

    }

        startGame() {
            this.state = {};
            this.GameSituation(1);
        }

        GameSituation(eventNumber) {
            const makeChose = this.situations.find(situation => situation.id === eventNumber);
            this.question.innerHTML = makeChose.text;
            document.getElementById('question-image').src = makeChose.image;
            while (this.AnswersButtonsVariant.firstChild) {
                this.AnswersButtonsVariant.removechild(this.AnswersButtonsVariant.firstChild);

            }

            makeChose.answers.forEach(answer => {
                if (this.showAnswer(answer)) {
                    const button = document.createElement('button');
                    button.innerText = answer.text;
                    button.classList.add('menu-item-button');
                    button.addEventListener('click', () => this.choseSituation(answer));
                    this.AnswersButtonsVariant.appendChild(button);

                }

            });

        }

        showAnswer(answer) {
            return answer;
        }

        choseSituation(answer){
            const nextSituationID = answer.goTo;

            if (nextSituationID <= 0) {
                console.log(0);
                return this.startGame()
            }

            this.showAnswer(nextSituationID);

        }


}



