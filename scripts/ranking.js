    function getRanking() 
    {
        let body = "";
        if(localStorage.getItem("id")){ //if user doesn't have id, do not show him in ranking
            body =  {id:localStorage.getItem("id")}; 
        }
        const request = new Request("https://memory-trainer.ct8.pl/ranking.php", 
        {
            method: "POST",
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" }
        });
        fetch(request)
            .then(response => response.json())
            .then(data => 
            {
                const tableBody = document.getElementById("ranking-body");
                tableBody.innerHTML = "";
                
                data.forEach(player => 
                {
                    if(typeof player.you === 'undefined'){
                        console.log("ok");
                        const row = document.createElement("tr");
                        row.innerHTML = `
                            <td>${player.place}</td>
                            <td>${player.nickname}</td>
                            <td>${player.colours}</td>
                            <td>${player.memory}</td>
                            <td>${player.number}</td>
                            <td>${player.sequence}</td>
                            <td>${player.summary}</td>
                        `;
                        tableBody.appendChild(row);
                    }else{
                        if(player.place > 10){
                            const space = document.createElement("tr");
                            const row = document.createElement("tr");
                            space.innerHTML = `
                                <td>...</td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                            `;
                            row.innerHTML = `
                            <td>${player.place}</td>
                            <td>${player.nickname}</td>
                            <td>${player.colours}</td>
                            <td>${player.memory}</td>
                            <td>${player.number}</td>
                            <td>${player.sequence}</td>
                            <td>${player.summary}</td>
                            `;
                            tableBody.appendChild(space);
                            tableBody.appendChild(row);
                        }else{
                            const row = document.createElement("tr");
                            row.innerHTML = `
                                <td>${player.place}</td>
                                <td>${player.nickname}</td>
                                <td>${player.colours}</td>
                                <td>${player.memory}</td>
                                <td>${player.number}</td>
                                <td>${player.sequence}</td>
                                <td>${player.summary}</td>
                            `;
                            row.style.animation = "blink 1s infinite alternate";
                            tableBody.appendChild(row);
                        }
                    }
                });
            })
            .catch(error => console.error("Error:", error));
    }

    function sendRanking(type, value){
        if(!localStorage.getItem("nick")){ //exit without nickname
            return false;
        }
        if(localStorage.getItem("id") && localStorage.getItem("key")){
            let request = new Request("https://memory-trainer.ct8.pl/ranking.php", {
                method: "POST",
                body: JSON.stringify({"id": localStorage.getItem("id"),"key": localStorage.getItem("key"),"type": type,"value": value}),
                headers: { "Content-Type": "application/json" }
            });
            fetch(request)
               .then(response => response.json())
               .then(data => {
                    console.log("Ranking updated");
               })
            .catch(error => console.error("Error:", error));
        }else{
             let request = new Request("https://memory-trainer.ct8.pl/ranking.php", {
                method: "POST",
                body: JSON.stringify({"nick": localStorage.getItem("nick"),"type": type,"value": value}),
                headers: { "Content-Type": "application/json" }
            });
            fetch(request)
             .then(response => response.json())
                .then(data => {
                        localStorage.setItem("id", data.id);
                        localStorage.setItem("key", data.key);
                        console.log("New player added to ranking");
                })
                .catch(error => console.error("Error:", error));
        }
        return true;
    }

    function newNick(nick){
        localStorage.clear();
        console.log("Old ranking access keys dropped");
        localStorage.setItem("nick", nick);
    }
    
    //New nickname input
    Array.from(document.getElementsByClassName("nickname")).forEach((element) => {
        if(localStorage.getItem("nick")){
            element.value = localStorage.getItem("nick");
        }
        element.addEventListener("focusout",(event) => {
            let nick = event.target.value;
            if(nick.length > 0 && nick != localStorage.getItem("nick")){
             newNick(nick);
            }else{
                nick = localStorage.getItem("nick");
            }
            Array.from(document.getElementsByClassName("nickname")).forEach((element) => {
                element.value = nick;
            });
        });
    });

