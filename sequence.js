async function sequence() {

    await new Promise(resolve => {
        document.getElementById("sequence").style.display = "flex";


        order = []
        turn = 0
        var boardFields

        var fieldNum
        var order
        var turn
        var clicksNum
        var prefixLetter


        switch (Number(level_value)) {
            case 1:
                prefixLetter = 'E'
                fieldNum = 9
                boardFields = document.getElementsByClassName("fieldE")
                break;
            case 2:
                prefixLetter = 'M'
                fieldNum = 16
                boardFields = document.getElementsByClassName("fieldM")
                break;
            case 3:
                prefixLetter = 'H'
                fieldNum = 25
                boardFields = document.getElementsByClassName("fieldH")

                break;
            default:
                alert("wrong case number");
                break;
        }


        function createBoard(x, y) {
            document.getElementById('sequenceGame').innerHTML = ''
            for (i = 0; i < y; i++) {
                document.getElementById('sequenceGame').innerHTML += "<div class='field" + x + "' id='" + x + (i + 1) + "'></div>"
            }
        }

        function randomTo(max) {
            return Math.floor(Math.random() * max) + 1;
        }



        function fieldClickedHandler(event) {
            fieldClicked(event.target.id);
        }

        function unlockClicks() {
            for (let i = 0; i < boardFields.length; i++) {
                boardFields[i].addEventListener('click', fieldClickedHandler);
            }
        }

        function disableClicks() {
            for (let i = 0; i < boardFields.length; i++) {
                boardFields[i].removeEventListener('click', fieldClickedHandler);
            }
        }

        sequenceGameStart()
        createBoard(prefixLetter, fieldNum);

        function sound(x) {
            audio = new Audio(`sound${x % 4}.wav`)
            audio.play()
        }



        async function sequenceGameStart() {
            await delay(500)
            disableClicks();
            turn++
            clicksNum = 0;


            for (i = 1; i < order.length; i++) {
                document.getElementById(prefixLetter + order[i]).style.backgroundColor = "rgb(248, 88, 200)";
                sound(order[i])
                await delay(500)
                document.getElementById(prefixLetter + order[i]).style.backgroundColor = "";
                await delay(500)
            }
            var randomField = randomTo(fieldNum);
            order[turn] = randomField;
            sound(randomField)
            document.getElementById(prefixLetter + randomField).style.backgroundColor = "rgb(248, 88, 200)";
            await delay(500)
            document.getElementById(prefixLetter + randomField).style.backgroundColor = "";
            unlockClicks();
        }




        async function fieldClicked(fieldId2) {
            sound(fieldId2.substring(1))
            clicksNum++
            if (order[clicksNum] == fieldId2.substring(1)) {
                disableClicks()
                document.getElementById(fieldId2).style.backgroundColor = "rgb(248, 88, 200)";
                await delay(200)
                document.getElementById(fieldId2).style.backgroundColor = "";
                unlockClicks()
                if (clicksNum == order.length - 1) {
                    disableClicks()
                    await delay(1000)
                    sequenceGameStart()
                }

            }
            else {
                if (document.getElementById(fieldId2).style.backgroundColor == "") {

                    document.getElementById(fieldId2).style.backgroundColor = "rgb(139, 0, 0)";
                    await delay(200);
                    document.getElementById(fieldId2).style.backgroundColor = "";

                    redAllFields(fieldNum);

                }
            }
        }

        async function redAllFields(y) {
            for (i = 1; i <= y; i++) {
                document.getElementById(prefixLetter + i).style.backgroundColor = "red";
                await delay(50)
            }
            await delay(200)
            document.getElementById("sequence").style.display = "none";
            resolve()
        }

    })
}
