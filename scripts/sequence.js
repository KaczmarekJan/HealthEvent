
async function sequence() {
    var sounds = Array(4).fill(0).map((_, index) => {
        let audio = new Audio(`sounds/sound${index}.wav`);
        audio.preload = "auto";
        audio.volume = document.getElementById("volumeSlider").value;
        return audio;
    });
    console.log(sounds);
    function sound(x) {
        sounds[x%4].play();
    }

    // Wrap everything in a Promise to ensure asynchronous execution
    await new Promise(resolve => {
        //exit code
        var exitCheck = setInterval(function (){
            if(!is_game_running){
                clearInterval(exitCheck); //disable points timer
                document.getElementById("sequence").style.display = "none"; // Hide the game
                resolve();
            }
        },200);

        document.getElementById("sequence").style.display = "flex"; // Show the sequence game container

        order = [] // Array storing the correct sequence order
        turn = 0 // Current turn number
        var boardFields // Variable for storing board fields (div elements)

        var fieldNum // Number of fields on the board
        var order // Stores the sequence of correct clicks
        var turn // Keeps track of the current turn in the game
        var clicksNum // Number of clicks made by the user
        var prefixLetter // Prefix for field IDs (E, M, H - depending on difficulty level)

        // Set difficulty level and initialize game settings
        switch (Number(level_value)) {
            case 1:
                prefixLetter = 'E' // Easy mode
                fieldNum = 9 // 3x3 board
                boardFields = document.getElementsByClassName("fieldE")
                break;
            case 2:
                prefixLetter = 'M' // Medium mode
                fieldNum = 16 // 4x4 board
                boardFields = document.getElementsByClassName("fieldM")
                break;
            case 3:
                prefixLetter = 'H' // Hard mode
                fieldNum = 25 // 5x5 board
                boardFields = document.getElementsByClassName("fieldH")
                break;
            case 4:
                prefixLetter = 'H' // Hard mode
                fieldNum = 30 // 5x5 board
                boardFields = document.getElementsByClassName("fieldH")
                break;
            default:
                alert("wrong case number");
                break;
        }

        // Function to generate the board dynamically
        function createBoard(x, y) {
            document.getElementById('sequenceGame').innerHTML = '' // Clear the game board
            for (i = 0; i < y; i++) {
                document.getElementById('sequenceGame').innerHTML += "<div class='field" + x + "' id='" + x + (i + 1) + "'></div>"
            }
        }

        // Generate a random number between 1 and max
        function randomTo(max) {
            return Math.floor(Math.random() * max) + 1;
        }

        // Function to handle field clicks
        function fieldClickedHandler(event) {
            fieldClicked(event.target.id);
        }

        // Enable clicking on the board
        function unlockClicks() {
            for (let i = 0; i < boardFields.length; i++) {
                boardFields[i].addEventListener('click', fieldClickedHandler);
            }
        }

        // Disable clicking on the board
        function disableClicks() {
            for (let i = 0; i < boardFields.length; i++) {
                boardFields[i].removeEventListener('click', fieldClickedHandler);
            }
        }

        sequenceGameStart() // Start the game sequence
        createBoard(prefixLetter, fieldNum); // Generate the game board

        

        // Main game function - shows the sequence and expects user input
        async function sequenceGameStart() {
            await delay(500) // Short delay before starting
            disableClicks(); // Prevent user input while showing the sequence
            turn++ // Increase turn count
            clicksNum = 0; // Reset user click counter

            // Show the previously remembered sequence
            for (i = 1; i < order.length; i++) {
                if(!is_game_running){
                    clearInterval(exitCheck); //disable points timer
                    document.getElementById("sequence").style.display = "none"; // Hide the game
                    return;
                }
                document.getElementById(prefixLetter + order[i]).style.backgroundColor = "#a637e7"; // Highlight sequence step
                sound(order[i]) // Play sound for the highlighted tile
                await delay(500) // Wait for half a second
                document.getElementById(prefixLetter + order[i]).style.backgroundColor = ""; // Reset tile color
                await delay(500)
            }

            // Add a new random field to the sequence
            var randomField = randomTo(fieldNum);
            order[turn] = randomField; // Store the new field in order
            sound(randomField) // Play sound for new field
            document.getElementById(prefixLetter + randomField).style.backgroundColor = "#a637e7"; // Highlight new field
            await delay(500)
            document.getElementById(prefixLetter + randomField).style.backgroundColor = ""; // Reset color
            unlockClicks(); // Enable user input
        }

        // Function to handle user clicking on a field
        async function fieldClicked(fieldId2) {
            sound(fieldId2.substring(1)) // Play sound corresponding to the clicked field
            clicksNum++ // Increase user click counter

            // Check if the clicked field matches the sequence order
            if (order[clicksNum] == fieldId2.substring(1)) {
                disableClicks() // Temporarily disable clicks
                document.getElementById(fieldId2).style.backgroundColor = "#a637e7"; // Highlight correct click
                await delay(200)
                document.getElementById(fieldId2).style.backgroundColor = ""; // Reset color
                unlockClicks() // Re-enable clicks

                // If the user correctly clicks all fields in order, start the next turn
                if (clicksNum == order.length - 1) {
                    points+=Math.floor(12.5*level_value);
                    disableClicks()
                    await delay(1000)
                    sequenceGameStart()
                }
            }
            else {
                // If the user clicks the wrong field, show error feedback
                if (document.getElementById(fieldId2).style.backgroundColor == "") {
                    document.getElementById(fieldId2).style.backgroundColor = "rgb(139, 0, 0)"; // Wrong selection color (red)
                    await delay(200);
                    document.getElementById(fieldId2).style.backgroundColor = ""; // Reset color
                    redAllFields(fieldNum); // Highlight all fields in red as a failure indication
                }
            }
        }

        // Function to make all fields red for a brief moment after losing
        async function redAllFields(y) {
            for (i = 1; i <= y; i++) {
                document.getElementById(prefixLetter + i).style.backgroundColor = "red"; // Set all fields to red
                await delay(50) // Delay between each field turning red
            }
            await delay(200) // Wait before hiding the game board
            document.getElementById("sequence").style.display = "none"; // Hide the game
            resolve() // End the Promise, allowing the game loop to continue
        }
    })
}
