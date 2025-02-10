async function numbers()
{
    document.getElementById("numbers").style.display = "flex";
    const content = document.getElementById("content");
    content.innerHTML = "Sum all the numbers";
    await delay(1000);
    const numbers = [];
    for(let i = 0; i < 100; i++) {numbers.push(i);}
    let amount_of_numbers = 3;
    let numbers_range = 90;
    for(let r=0; r<level_value*3; r++)
    {
        let equals = 0;
        for(let i=0; i<amount_of_numbers; i++)
        {
            let RandomIndex = Math.ceil(Math.random()*(numbers.length-numbers_range));
            equals += numbers[RandomIndex];
            content.innerHTML = numbers.splice(RandomIndex, 1)[0];
            await delay(1000);
        }
        content.innerHTML = `<input type="number" id="userAnswer" placeholder="Enter">`;
        await new Promise(resolve => {
            const userAnswer = document.getElementById("userAnswer");
            const checkAnswer = async (event) =>
                {
                    if(event.key === "Enter")
                    {
                        if(userAnswer.value == equals)
                            {
                                content.innerHTML = "Correct!";
                                await delay(1000);
                                points++;
                                resolve();
                            }
                        else
                            {
                                content.innerHTML = "Incorrect!";
                                await delay(1000);
                                resolve();
                            }
                    }
                }
            userAnswer.addEventListener("keydown", checkAnswer);
        });

        if(numbers_range > 9)
            numbers_range -= 10;
        else
            numbers_range = 0;

        amount_of_numbers ++;
    }
    content.innerHTML = `Score: ${points}`;
    await delay(2000);
}
