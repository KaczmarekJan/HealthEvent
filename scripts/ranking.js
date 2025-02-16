    function getRanking() 
    {
        const request = new Request("https://memory-trainer.ct8.pl/ranking.php", 
        {
            method: "POST",
            body: '{"id": "1"}',
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
                });
            })
            .catch(error => console.error("Błąd:", error));
    }

    function sendRanking(type, value){
        if(!localStorage.getItem("nick")){ //exit without nickname
            return;
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
                
               })
            .catch(error => console.error("Błąd:", error));
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
                    console.log(data.id);
                    localStorage.setItem("key", data.key);
            })
            .catch(error => console.error("Błąd:", error));
        }
    }

    function newNick(nick){
        localStorage.clear();
        localStorage.setItem("nick", nick);
    }


    