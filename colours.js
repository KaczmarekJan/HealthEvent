//colours game
async function colours()
{
    //variables
    var number_of_blocks = Array.from(document.getElementsByClassName("colour")).length-3;   //number of blocks
    var amount_of_blinks = 1;   //number of blinks

    document.getElementById("colours").style.display = "flex";    //show the blocks
    for(let r=0;r<level_value*4;r++)
    {
        var blocks = Array.from(document.getElementsByClassName("colour")); //create a table from existing classes
        let blocks_colours = 
        [
            "#FF5733", // Bright Red Orange
            "#33FF57", // Neon Green
            "#337BFF", // Bright Blue
            "#FF33A8", // Intense Pink
            "#FFF833", // Lemon Yellow
            "#33FFF8", // Neon Turquoise
            "#9D33FF", // Vibrant Purple
            "#FF8C33", // Bright Orange
        ];
        for(let i=0;i<blocks.length;i++)    //loop that will go thru all 4 blocks and randomize its color
        {
            let randomIndex = Math.floor(Math.random()*blocks_colours.length);  //randomize blocks colours
            blocks[i].style.display = "block";   //show the block
            blocks[i].style.backgroundColor = blocks_colours.splice(randomIndex, 1)[0];   //delete 1 element from table so that it wont be picked twice
            blocks[i].addEventListener("click", () => {
                const sound = new Audio(`sound${i}.wav`);
                sound.currentTime = 0;
                sound.play();
            });   //add event listener
        }
        var required_count = new Array(4).fill(0);  //table with required amounts of clicks
        var indexes_used = new Array();
        for(let i=0;i<number_of_blocks;i++)    //loop goes thru all 4 blocks
        {
            let randomIndex = Math.floor(Math.random() * blocks.length);    //randomize blocks
            while(indexes_used.includes(randomIndex)){
                randomIndex = Math.floor(Math.random() * blocks.length);
            }
            indexes_used.push(randomIndex);
            let randomBlinks = Math.ceil(Math.random() * amount_of_blinks);    //random amount of blinks
            required_count[randomIndex] = randomBlinks;
            for(let j=0;j<randomBlinks;j++) //loop makes blocks blink
            {
                await delay(500);   //wait
                blocks[randomIndex].style.boxShadow = `0 0 5px 5px ${blocks[randomIndex].style.backgroundColor}`; //display shadow
                await delay(500);   //wait
                blocks[randomIndex].style.boxShadow = "none";   //hide shadow
                await delay(500);   //wait
            }
        }
    
        await new Promise(resolve => {
            //checking logics
            var count = new Array(4).fill(0);
            let notification;
            if (document.querySelector('#colours h2')) notification = null; else notification = document.createElement("h2");
            const handleClick = async (event) => 
            {
                if(notification != null)
                {
                    //variables
                    const clickedBlock = event.target;
                    const blockIndex = blocks.indexOf(clickedBlock);
                    
                    //clicked block animation
                    clickedBlock.style.boxShadow = `0 0 5px 5px ${clickedBlock.style.backgroundColor}`;
                    await delay(500);
                    clickedBlock.style.boxShadow = "none";
                    await delay(500);
                    count[blockIndex]++;
                        //check if the user clicked the right block
                        if (count.every((val, idx) => val == required_count[idx]))
                        {
                            //deleting listeners and resolving promise
                            blocks.forEach(block => block.removeEventListener("click", handleClick));
                            points++;
                            //notification
                            blocks.forEach(block => block.style.display = "none");
                            notification.textContent = "Correct!";
                            document.getElementById("colours").appendChild(notification);
                            await delay(500);
                            notification.remove();
                            blocks.forEach(block => block.style.display = "block");
                            resolve();
                        }
                        else if(count.some((val, idx) => val > required_count[idx]))    //if user clicks too many times
                        {
                            //deleting listeners and resolving promise
                            blocks.forEach(block => block.removeEventListener("click", handleClick));
                            //notification
                            blocks.forEach(block => block.style.display = "none");
                            notification.textContent = "Wrong!";
                            document.getElementById("colours").appendChild(notification);
                            await delay(500);
                            notification.remove();
                            blocks.forEach(block => block.style.display = "block");
                            resolve();
                        }
                }
                
            }
            blocks.forEach(block => block.addEventListener("click", handleClick));
        });
        blocks.forEach(block => block.removeEventListener("click", () => {
            const sound = new Audio(`sound${i}.wav`);
            sound.currentTime = 0;
            sound.play();
        }));   //remove event listener
        if(number_of_blocks<4)
        {
            number_of_blocks+=0.5;
        }
        amount_of_blinks+=0.2;
    }
    blocks.forEach(block => block.style.display = "none");
    const score = document.createElement("h2");
    score.textContent = `Score: ${points}`;
    document.getElementById("colours").appendChild(score);
    await delay(2000);
    score.remove();
}