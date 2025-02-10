//colours game
async function colours()
{
    //variables
    var blocks = Array.from(document.getElementsByClassName("colour")); //create a table from existing classes
    var number_of_blocks = blocks.length;   //number of blocks
    var amount_of_blinks = 1;   //number of blinks
    var points = 0; //number of points

    document.getElementById("colours").style.display = "flex";    //show the blocks

    for(let r=1;r<level_value;r++)
    {
        //Colours generator
        const blocks_colours = [
            "#FF5733", // Bright Red Orange
            "#33FF57", // Neon Green
            "#337BFF", // Bright Blue
            "#FF33A8", // Intense Pink
            "#FFF833", // Lemon Yellow
            "#33FFF8", // Neon Turquoise
            "#9D33FF", // Vibrant Purple
            "#FF8C33", // Bright Orange
        ];
        for(let i=0;i<4;i++)    //loop that will go thru all 4 blocks and randomize its color
        {
            blocks[i].style.display = "block";   //show the block
            let randomIndex = Math.floor(Math.random()*blocks_colours.length);  //randomize blocks colours
            blocks[i].style.backgroundColor = blocks_colours.splice(randomIndex, 1)[0];   //delete 1 element from table so that it wont be picked twice
        }


        //Sequence generator
        console.log("Generating sequence:");
        var blocks_sequence = new Array();
        var blocks_used = new Array();
        for(let i=0;i<number_of_blocks;i++)    //loop goes thru all 4 blocks
      {
            let randomIndex = Math.floor(Math.random() * blocks.length);    //randomize blocks
            while(blocks_used.includes(randomIndex)){
                randomIndex = Math.floor(Math.random() * blocks.length);
            }
            blocks_used.push(randomIndex);
            let randomBlinks = Math.ceil(Math.random() * amount_of_blinks);    //random amount of blinks
    
            for(let j=0;j<randomBlinks;j++) //loop makes blocks blink
            {
                blocks_sequence.push(randomIndex);
                console.log(randomIndex);
                await delay(1000);   //wait
                blocks[randomIndex].style.boxShadow = `0 0 5px 5px ${blocks[randomIndex].style.backgroundColor}`; //display shadow
                await delay(1000);   //wait
                blocks[randomIndex].style.boxShadow = "none";   //hide shadow
                await delay(1000);   //wait
            }
        }
        

        await new Promise(resolve => {
            const handleClick = async (event) => {
                //Block ID and handle(HTML element)
                const clickedBlock = event.target;
                const clickedBlockID = blocks.indexOf(clickedBlock);
                console.log("Clicked item: "+clickedBlockID);

                //Block animation
                clickedBlock.style.boxShadow = `0 0 5px 5px ${clickedBlock.style.backgroundColor}`;
                await delay(500);
                clickedBlock.style.boxShadow = "none";
                await delay(500);

                //Check if correct
                const currentSequenceElement = blocks_sequence.shift(); //gets first element and removes it from array
                if(clickedBlockID==currentSequenceElement){
                    console.log("Correct click :)");
                }else{
                    blocks.forEach(block => block.style.display = "none");
                    const notification = document.createElement("h2");
                    notification.textContent = "Wrong!";
                    document.getElementById("colours").appendChild(notification);
                    await delay(1000);
                    notification.remove();
                    blocks.forEach(block => block.style.display = "block");
                    //deleting listeners and resolving promise
                    blocks.forEach(block => block.removeEventListener("click", handleClick));
                    resolve();
                }

                //Check if sequence finished (array is empty)
                if(blocks_sequence.length===0){
                    points++;
                    //notification
                    blocks.forEach(block => block.style.display = "none");
                    const notification = document.createElement("h2");
                    notification.textContent = "Correct!";
                    document.getElementById("colours").appendChild(notification);
                    await delay(1000);
                    notification.remove();
                    blocks.forEach(block => block.style.display = "block");
                    //deleting listeners and resolving promise
                    blocks.forEach(block => block.removeEventListener("click", handleClick));
                    resolve();
                }
            }
            blocks.forEach(block => block.addEventListener("click", handleClick));
        });

        //Level UP:)
        if(number_of_blocks<4)
            {
                number_of_blocks+=0.5;
            }
        amount_of_blinks+=0.2;
    }
    const score = document.createElement("h2");
    score.textContent = `Score: ${points}`;
    document.getElementById("colours").appendChild(score);
    await delay(500);
    score.remove();
    return "over";
    
}

/*
   var count = new Array(4).fill(0);
        await new Promise(resolve => {
            const handleClick = async (event) => 
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
                        points++;
                        //notification
                        blocks.forEach(block => block.style.display = "none");
                        const notification = document.createElement("h2");
                        notification.textContent = "Correct!";
                        document.getElementById("colours").appendChild(notification);
                        await delay(500);
                        notification.remove();
                        blocks.forEach(block => block.style.display = "block");
                        //deleting listeners and resolving promise
                        blocks.forEach(block => block.removeEventListener("click", handleClick));
                        resolve();
                    }
                    else if(count.some((val, idx) => val > required_count[idx]))    //if user clicks too many times
                    {
                        //notification
                        blocks.forEach(block => block.style.display = "none");
                        const notification = document.createElement("h2");
                        notification.textContent = "Wrong!";
                        document.getElementById("colours").appendChild(notification);
                        await delay(500);
                        notification.remove();
                        blocks.forEach(block => block.style.display = "block");
                        //deleting listeners and resolving promise
                        blocks.forEach(block => block.removeEventListener("click", handleClick));
                        resolve();
                    }
            }
            
        });

       
*/