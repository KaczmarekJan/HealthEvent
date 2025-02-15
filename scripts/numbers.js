var instchange_numbers = "Sum all the numbers";
var numberbutremeber = "Remember all the numbers";
var nmb_correct = "Correct!";
var nmb_incorrect = "Incorrect!";
var nmb_score = "Score: ";
var nmb_placeholder = "Input the numbers that were displayed one by one.";
async function numbers()
{
    document.getElementById("numbers").style.display = "flex";
    const content = document.getElementById("content");
    const numbers = [];
    for(let i = 0; i < 100; i++) {numbers.push(i);}
    let amount_of_numbers = 3;
    let numbers_range = 90;
    if(level_value == 3 )
    {
        content.innerHTML = instchange_numbers;
        for(let r=0; r<level_value*3; r++)
        {
            await delay(1000);
            let equals = 0;
            for(let i=0; i<amount_of_numbers; i++)
            {
                let RandomIndex = Math.ceil(Math.random()*(numbers.length-numbers_range));
                equals += numbers[RandomIndex];
                content.innerHTML = "<div class='numerki'>"+numbers.splice(RandomIndex, 1)[0]+"</div>";
                
                await delay(1000);

            }
            document.getElementById("numbers_instruction").innerHTML = nmb_placeholder;
            content.innerHTML = `<input type="number" id="userAnswer" placeholder="Enter">`;
            await new Promise(resolve => {
                const userAnswer = document.getElementById("userAnswer");
                const checkAnswer = async (event) =>
                    {
                        if(event.key === "Enter")
                        {
                            if(userAnswer.value == equals)
                                {
                                    document.getElementById("numbers_instruction").innerHTML = "";
                                    content.innerHTML = nmb_correct;
                                    await delay(1000);
                                    points++;
                                    resolve();
                                }
                            else
                                {
                                    document.getElementById("numbers_instruction").innerHTML = "";
                                    content.innerHTML = nmb_incorrect;
                                    await delay(1000);
                                    resolve();
                                }
                        }
                    }
                userAnswer.addEventListener("keydown", checkAnswer);
            });
            if(numbers_range > 9)
                numbers_range -= 5;
            else
                numbers_range = 0;

            amount_of_numbers++;
        }
    }
    else
    {
        content.innerHTML = numberbutremeber;
        for(let r=0; r<level_value*3; r++)
        {
            await delay(1000);
            var equals = new Array(amount_of_numbers).fill(0);
            for(let i=0; i<amount_of_numbers; i++)
            {
                let RandomIndex = Math.ceil(Math.random()*(numbers.length-numbers_range));
                equals[i] = numbers[RandomIndex];
                content.innerHTML = "<div class='numerki'>"+numbers.splice(RandomIndex, 1)[0]+"</div>";
                await delay(1000);
            }
            document.getElementById("numbers_instruction").innerHTML = nmb_placeholder;
            content.innerHTML = `<input type="number" id="userAnswer" placeholder="Enter">`;
            var answer = new Array(amount_of_numbers).fill(0);
            await new Promise(resolve => {
                const userAnswer = document.getElementById("userAnswer");
                let i = 0;
                const checkAnswer = async (event) =>
                    {
                        if(event.key === "Enter")
                        {
                            answer[i] = userAnswer.value;
                            userAnswer.value = "";
                            if(i == amount_of_numbers-1)
                            {
                                userAnswer.removeEventListener("keydown", checkAnswer);
                                resolve();
                            }
                            i++;
                        }
                    }
                userAnswer.addEventListener("keydown", checkAnswer);
            });
            if(answer.every((val, idx) => val == equals[idx]))
                {
                    document.getElementById("numbers_instruction").innerHTML = "";
                    content.innerHTML = nmb_correct;
                    await delay(1000);
                    points++;
                }
            else
                {
                    document.getElementById("numbers_instruction").innerHTML = "";
                    content.innerHTML = nmb_incorrect;
                    await delay(1000);
                }
            if(numbers_range > 9)
                numbers_range -= 5;
            else
                numbers_range = 0;

            amount_of_numbers++;
        }
    }
    
    content.innerHTML = `${nmb_score} ${points}`;
    await delay(2000);
    document.getElementById("numbers").style.display = "none";
}
