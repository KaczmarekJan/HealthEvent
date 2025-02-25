var instchange_numbers = "Sum all the numbers";
var numberbutremeber = "Remember all the numbers";
var nmb_correct = "Correct!";
var nmb_incorrect = "Incorrect!";
var nmb_score = "Score: ";
var nmb_placeholder = "Input the numbers that were displayed one by one.";

async function numbers() {
    document.getElementById("numbers_instruction").innerHTML = "";
    

    document.getElementById("numbers").style.display = "flex";
    const content = document.getElementById("content");
    const numbers = [];
    for (let i = 0; i < 100; i++) { numbers.push(i); }

    let amount_of_numbers = 3;
    let numbers_range = 90;

    async function safeDelay(ms) {
        for (let i = 0; i < ms / 100; i++) {
            if (!is_game_running) return false;
            await delay(100);
        }
        return true;
    }

    if (level_value == 3 || level_value == 4) {
        content.innerHTML = instchange_numbers;

        gameloop: for (let r = 0; r < level_value * 3; r++) {
            if (!is_game_running) break gameloop;

            if (!(await safeDelay(1000))) break gameloop;

            let equals = 0;
            for (let i = 0; i < amount_of_numbers; i++) {
                if (!is_game_running) break gameloop;

                let RandomIndex = Math.ceil(Math.random() * (numbers.length - numbers_range));
                equals += numbers[RandomIndex];
                content.innerHTML = "<div class='numerki'>" + numbers.splice(RandomIndex, 1)[0] + "</div>";

                if (!(await safeDelay(1000))) break gameloop;
            }

            document.getElementById("numbers_instruction").innerHTML = nmb_placeholder;
            content.innerHTML = `<input type="number" id="userAnswer" placeholder="Enter">`;

            await new Promise(resolve => {
                let gameChecker = setInterval(() => {
                    if (!is_game_running) {
                        clearInterval(gameChecker);
                        resolve();
                        return;
                    }
                }, 100);
                const userAnswer = document.getElementById("userAnswer");
                const checkAnswer = async (event) => {
                    if (!is_game_running){
                        resolve();
                        return;
                    }
                    if (event.key === "Enter") {
                        if (userAnswer.value == equals) {
                            document.getElementById("numbers_instruction").innerHTML = "";
                            content.innerHTML = nmb_correct;
                            if (!(await safeDelay(1000))){
                                resolve();
                                return;
                            }
                            points += Math.floor(12.5 * level_value);
                            resolve();
                        } else {
                            document.getElementById("numbers_instruction").innerHTML = "";
                            content.innerHTML = nmb_incorrect;
                            if (!(await safeDelay(1000))){
                                resolve()
                                return;
                            }
                            resolve();
                        }
                    }
                };
                userAnswer.addEventListener("keydown", checkAnswer);
            });

            if (numbers_range > 9) numbers_range -= 5;
            else numbers_range = 0;

            amount_of_numbers++;
        }
    } else {
        content.innerHTML = numberbutremeber;

        gameloopL: for (let r = 0; r < level_value * 3; r++) {
            if (!is_game_running) break gameloopL;

            if (!(await safeDelay(1000))) break gameloopL;

            var equals = new Array(amount_of_numbers).fill(0);

            for (let i = 0; i < amount_of_numbers; i++) {
                if (!is_game_running) break gameloopL;

                let RandomIndex = Math.ceil(Math.random() * (numbers.length - numbers_range));
                equals[i] = numbers[RandomIndex];
                content.innerHTML = "<div class='numerki'>" + numbers.splice(RandomIndex, 1)[0] + "</div>";

                if (!(await safeDelay(1000))) break gameloopL;
            }

            document.getElementById("numbers_instruction").innerHTML = nmb_placeholder;
            content.innerHTML = `<input type="number" id="userAnswer" placeholder="Enter">`;
            var answer = new Array(amount_of_numbers).fill(0);

            await new Promise(resolve => {
                const userAnswer = document.getElementById("userAnswer");
                let i = 0;
                let gameChecker = setInterval(() => {
                    if (!is_game_running) {
                        clearInterval(gameChecker);
                        resolve();
                        return;
                    }
                }, 100);
                const checkAnswer = async (event) => {
                    if (!is_game_running){
                        resolve();
                        return;
                    }

                    if (event.key === "Enter") {
                        answer[i] = userAnswer.value;
                        userAnswer.value = "";
                        if (i == amount_of_numbers - 1) {
                            userAnswer.removeEventListener("keydown", checkAnswer);
                            resolve();
                        }
                        i++;
                    }
                };
                userAnswer.addEventListener("keydown", checkAnswer);
            });

            if (answer.every((val, idx) => val == equals[idx])) {
                document.getElementById("numbers_instruction").innerHTML = "";
                content.innerHTML = nmb_correct;
                if (!(await safeDelay(1000))) break gameloopL;
                points += Math.floor(12.5 * level_value);
            } else {
                document.getElementById("numbers_instruction").innerHTML = "";
                content.innerHTML = nmb_incorrect;
                if (!(await safeDelay(1000))) break gameloopL;
            }

            if (numbers_range > 9) numbers_range -= 5;
            else numbers_range = 0;

            amount_of_numbers++;
        }
    }

    content.innerHTML = `${nmb_score} ${points}`;
    await safeDelay(2000);
    document.getElementById("numbers").style.display = "none";
}
