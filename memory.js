async function memory(){
    document.getElementById("memory").style.display = "flex";
    var number_of_images = 40; //number of images in folder
     
    document.getElementById("memory").style.display = "flex"; //display game

    async function game(elements_number,level){
        //Generate random blocks
        console.log("Generating random blocks:");
        let images = Array();
        for(let i = 0; i<elements_number;i+=2){
            let random = 0;
            do{
                random = Math.floor(Math.random() * number_of_images);
            }while(images.includes(random));
            images[i] = random;
            images[i+1] = random;
        }
        
        //Shuffle array
        for (var i = images.length - 1; i >= 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = images[i];
            images[i] = images[j];
            images[j] = temp;
        }
        console.log(images);

        //Render view
        var point_timer_handle = document.createElement("h2");
        document.getElementById("memory").appendChild(point_timer_handle);

        var tiles = Array(elements_number).fill(null).map(() => {
            var element = document.createElement("div");
            element.classList.add("memory-tile");
            document.getElementById("memory").appendChild(element);
            return element;
        });

        var remainigTiles = elements_number/2;
        await new Promise(resolve => {
            var points_countdown = 100*level;
            var points_countdown_timer = setInterval(function (){
                points_countdown-=5;
                if(points_countdown<0) points_countdown = 0;
                point_timer_handle.innerText = "Hurry up! Only " + points_countdown + " points left!"
            }, 1000);
            var lastTile = null;
            const handleClick = async (event) => {
                
                tiles.forEach((element) => { //block event listener during animation
                    element.removeEventListener("click", handleClick);
                });

                const clickedTile = event.target;
                const tileIndex = tiles.indexOf(clickedTile);
                console.log("Clicked tile: " + tileIndex + "=>"+images[tileIndex]);
                clickedTile.style.backgroundImage = `url('memory/${images[tileIndex]}.jpg')`;
                
                if (lastTile === null || lastTile === tileIndex) { //first click
                    lastTile = tileIndex;
                } else {
                    await delay(1000);
                    if(images[tileIndex] === images[lastTile]){ //pair found
                            clickedTile.style.visibility = "hidden";
                            tiles[lastTile].style.visibility = "hidden";
                            remainigTiles--;
                    }else{ //pair not found
                            clickedTile.style.backgroundImage = "";
                            tiles[lastTile].style.backgroundImage = "";
                    }
                    lastTile=null;
                }
                if(remainigTiles === 0){ //all pairs found game over
                    clearInterval(points_countdown_timer); //disable points timer
                    points += points_countdown; //add up all points
                    resolve();
                }

                tiles.forEach((element) => { //restore after animation
                    element.addEventListener("click", handleClick);
                });
            }
            tiles.forEach((element) => {
                element.addEventListener("click", handleClick);
            });
        });

        document.getElementById("memory").innerHTML = "";
    }    

    switch(level_value){
        case 1:
            await game(8,level_value);
            break;
        
        case 2:
            await game(16,level_value);
            break;
        
        case 3:
            await game(24,level_value);
            break;

        case 4:
            await game(32,level_value);
            break;

        case 5:
            await game(8,1);
            await game(16,2);
            await game(24,3);
            await game(32,4);
            break;

    }

    document.getElementById("memory").style.display = "none";
}