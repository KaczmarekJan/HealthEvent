var mem_nopoints = "No more points :(";
var mem_hurryup = "Hurry up! Only ";
var mem_pointsleft = "points left!";


async function memory(){
    //preloading audio
    var countdown_beep = new Audio(`sounds/countdown-beep.wav`);
    countdown_beep.preload = "auto"; // Wczytanie dźwięku wcześniej, aby uniknąć opóźnień
    countdown_beep.volume = document.getElementById("volumeSlider").value / 5;
    
    var flipcard = new Audio(`sounds/flipcard.wav`);
    flipcard.preload = "auto"; // Wczytanie dźwięku wcześniej, aby uniknąć opóźnień
    flipcard.volume = document.getElementById("volumeSlider").value;

    var card_ok = new Audio(`sounds/memory-ok.wav`);
    card_ok.preload = "auto"; // Wczytanie dźwięku wcześniej, aby uniknąć opóźnień
    card_ok.volume = document.getElementById("volumeSlider").value;

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
            var points_countdown = Math.floor(50*level);
            point_timer_handle.innerText = mem_hurryup + points_countdown + " " + mem_pointsleft;
            var points_countdown_timer = setInterval(function (){
                //console.log(points_countdown);
                points_countdown-=2;
                if(points_countdown<=0){ 
                    points_countdown = 0;
                    point_timer_handle.style.color = "white";
                    point_timer_handle.innerText = mem_nopoints;
                }else{
                    if(points_countdown<=20){
                        countdown_beep.play();
                        point_timer_handle.style.transition = "color 0.5s";
                        if(points_countdown%4==0){
                            point_timer_handle.style.color = "red";
                        }else{
                            point_timer_handle.style.color = "white";
                        }
                    }
                    point_timer_handle.innerText = mem_hurryup + points_countdown + " " + mem_pointsleft;}
            }, 1000);
            var lastTile = null;
            const handleClick = async (event) => {
                tiles.forEach((element) => { //block event listener during animation
                    element.removeEventListener("click", handleClick);
                });
                flipcard.play();
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
                            card_ok.play();
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
            await game(32,4);
            break;

    }

    document.getElementById("memory").style.display = "none";
}