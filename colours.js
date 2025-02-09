//variables
var blocks = Array.from(document.getElementsByClassName("colour")); //create a table from existing classes
var number_of_blocks = 1;   //number of blocks
var required_count = new Array(4).fill(0);  //table with required amounts of clicks
var block_sequence = new Array(4).fill(0);  //table with block sequence
var count = new Array(4).fill(0);   //table with actual clicks
var points = 0;
var is_animation_over = false;



//user clicks on the blocks
async function users_click() 
{
    const colour = document.getElementsByClassName("colour")[index];
    colour.style.boxShadow = `0 0 5px 5px ${colour.style.backgroundColor}`;
    await delay(500);
    colour.style.boxShadow = "none";
    await delay(500);
    count[x]++;
}



//colours game
async function colours()
{
    document.getElementById("colours").style.display = "flex";    //show the blocks
    let amount_of_blinks = 0;
    for(let r=1;r<level_value;r++)
    {
        //reset all variables
        count.fill(0);
        required_count.fill(0);
        block_sequence.fill(0);

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
        var blocks_copy = Array.from(blocks);
        for(let i=0;i<4;i++)    //loop that will go thru all 4 blocks and randomize its color
        {
            document.getElementsByClassName("colour")[i].style.display = "block";   //show the block
            let randomIndex = Math.floor(Math.random()*blocks_colours.length);  //randomize blocks colours
            document.getElementsByClassName("colour")[i].style.backgroundColor = 
            blocks_colours.splice(randomIndex, 1)[0];   //delete 1 element from table so that it wont be picked twice
        }
        for(let i=0;i<number_of_blocks;i++)    //loop goes thru all 4 blocks
        {
            let randomIndex = Math.floor(Math.random() * blocks_copy.length);    //randomize blocks
            let randomBlock = blocks_copy.splice(randomIndex, 1)[0]; //adress the block and then delete it
            let randomBlinks = Math.ceil(Math.random() * amount_of_blinks);    //random amount of blinks
    
            for(let j=0;j<randomBlinks;j++) //loop makes blocks blink
            {
                await delay(500);   //wait
                randomBlock.style.boxShadow = `0 0 5px 5px ${randomBlock.style.backgroundColor}`; //display shadow
                await delay(500);   //wait
                randomBlock.style.boxShadow = "none";   //hide shadow
                await delay(500);   //wait
            }
            required_count[i] = randomBlinks;
            block_sequence[i] = randomIndex;    //adress required amount of clicks
        }



        amount_of_blinks++;
        if(number_of_blocks<4)
        {
            number_of_blocks++;
        }
    }
}