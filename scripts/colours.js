//colours game
async function colours() {
    // Sprawdzanie co sekundę, czy gra powinna się zatrzymać
    let gameChecker = setInterval(() => {
        if (!is_game_running) {
            console.log("Gra zatrzymana!"); // Debug
            clearInterval(gameChecker); // Zatrzymanie interwału
            document.getElementById("colours").style.display = "none"; // Ukrycie gry
        }
    }, 1000); // Sprawdzanie co 1 sekundę

    // Variables
    var number_of_blocks = Array.from(document.getElementsByClassName("colour")).length - 3; 
    var amount_of_blinks = 1; 

    document.getElementById("colours").style.display = "flex";
    var blocks = Array.from(document.getElementsByClassName("colour"));
    let blocks_colours = [
        "#FF5733", "#33FF57", "#337BFF", "#FF33A8", 
        "#FFF833", "#33FFF8", "#9D33FF", "#FF8C33"
    ];

    let sounds = blocks.map((_, index) => {
        let audio = new Audio(`sounds/sound${index}.wav`);
        audio.preload = "auto";
        audio.volume = document.getElementById("volumeSlider").value;
        return audio;
    });

    for (let i = 0; i < blocks.length; i++) {
        let randomIndex = Math.floor(Math.random() * blocks_colours.length);
        blocks[i].style.display = "block";
        blocks[i].style.backgroundColor = blocks_colours.splice(randomIndex, 1)[0];
    }

    for (let r = 0; r < level_value * 4; r++) {
        if (!is_game_running) return; // ✅ Przerwanie gry natychmiast!

        var required_count = new Array(4).fill(0);
        var indexes_used = [];

        for (let i = 0; i < number_of_blocks; i++) {
            if (!is_game_running) return; // ✅ Przerwanie w trakcie animacji!

            let randomIndex = Math.floor(Math.random() * blocks.length);
            while (indexes_used.includes(randomIndex)) {
                randomIndex = Math.floor(Math.random() * blocks.length);
            }
            indexes_used.push(randomIndex);

            let randomBlinks = Math.ceil(Math.random() * amount_of_blinks);
            required_count[randomIndex] = randomBlinks;

            for (let j = 0; j < randomBlinks; j++) {
                if (!is_game_running) return; // ✅ Przerwanie przed mignięciem!

                sounds[randomIndex].play();
                await delay(250);
                blocks[randomIndex].style.transform = `scale(1.2)`;
                await delay(250);
                blocks[randomIndex].style.transform = `scale(1)`;
                await delay(250);
            }
        }

        async function playSound(event) {
            sounds[blocks.indexOf(event.currentTarget)].currentTime = 0;
            sounds[blocks.indexOf(event.currentTarget)].play();
        }

        await new Promise(resolve => {
            var count = new Array(4).fill(0);
            let notification;
            if (!document.querySelector('#colours h2')) notification = document.createElement("h2");

            const handleClick = async (event) => {
                if (!is_game_running) return; // ✅ Blokowanie kliknięć po wyjściu z gry!

                const clickedBlock = event.target;
                const blockIndex = blocks.indexOf(clickedBlock);

                clickedBlock.style.transform = `scale(1.2)`;
                await delay(250);
                clickedBlock.style.transform = `scale(1)`;
                await delay(500);

                count[blockIndex]++;
                if (count.every((val, idx) => val == required_count[idx])) {
                    blocks.forEach(block => block.removeEventListener("click", playSound));
                    blocks.forEach(block => block.removeEventListener("click", handleClick));
                    points += Math.floor(12.5 * level_value);
                    notification.innerHTML = nmb_correct;
                    document.getElementById("game_content").insertBefore(notification, document.getElementById("game_content").firstChild);
                    await delay(500);
                    notification.remove();
                    blocks.forEach(block => block.style.display = "block");
                    resolve();
                } else if (count.some((val, idx) => val > required_count[idx])) {
                    blocks.forEach(block => block.removeEventListener("click", playSound));
                    blocks.forEach(block => block.removeEventListener("click", handleClick));
                    notification.innerHTML = nmb_incorrect;
                    document.getElementById("game_content").insertBefore(notification, document.getElementById("game_content").firstChild);
                    await delay(500);
                    notification.remove();
                    blocks.forEach(block => block.style.display = "block");
                    resolve();
                }
            };

            blocks.forEach(block => block.addEventListener("click", handleClick));
            blocks.forEach(block => block.addEventListener("click", playSound));
        });

        if (number_of_blocks < 4) {
            number_of_blocks += 0.5;
        }
        amount_of_blinks += 0.2;
    }

    blocks.forEach(block => block.style.display = "none");
    const score = document.createElement("h2");
    score.textContent = `${nmb_score}: ${points}`;
    document.getElementById("colours").appendChild(score);
    await delay(2000);
    score.remove();
    document.getElementById("colours").style.display = "none";
}
