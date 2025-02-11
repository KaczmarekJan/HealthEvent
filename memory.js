async function memory(){
    document.getElementById("memory").style.display = "flex";
    var number_of_images = 40; //number of images in folder
     
    document.getElementById("memory").style.display = "flex"; //display game
    for(let level = 0;level<3;level++){

        //Generate random blocks
        console.log("Generating random blocks:");
        let elements_number = Math.pow((level*2)+4,2);
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
        let tiles = Array(elements_number).fill(0).forEach((element) => {
            element = document.createElement("div");
            element.classList.add("memory-tile");
            document.getElementById("memory").appendChild(element);
        });
        await new Promise(resolve => {});

        document.getElementById("memory").innerHTML = "";
    }
    document.getElementById("memory").style.display = "none";
}