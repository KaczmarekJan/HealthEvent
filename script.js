function updatetime() {
    const teraz = new Date();
    const hours = teraz.getHours().toString().padStart(2, '0');
    const minutes = teraz.getMinutes().toString().padStart(2, '0');
    const seconds = teraz.getSeconds().toString().padStart(2, '0');
    document.getElementById("time").innerText = hours+":"+minutes+":"+seconds;
}

setInterval(updatetime, 1000);
updatetime();
document.addEventListener("mousemove", (e) => {
    const background = document.querySelector(".background");
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const mouseX = e.clientX / windowWidth - 0.5;
    const mouseY = e.clientY / windowHeight - 0.5;
    const offsetX = mouseX * 60;
    const offsetY = mouseY * 60;

    background.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
});
var gamerunning = false;
function start() 
{
    gamerunning = true;
    document.querySelector(".start_content").style.display = "none";
    document.querySelector(".game_content").style.display = "block";
    game();
}
async function game()
{
    let level = (document.querySelector("#level").value)*2;
    let points = 0;
    let g = Math.floor(Math.random()*1)
    switch(g)
    {
        case 0:
                document.querySelector(".colours").style.display = "block";
                let amount = 2;
                let clicks = new Array(5).fill(0);
                let player_click = new Array(5).fill(0);
                for(let rounds=1;rounds<Number(level);rounds++)
                {
                    let x=Math.floor(Math.random()*5);
                    for(let i=1;i<5;i++)
                    {
                        console.log()
                        document.getElementById("colour"+x).addEventListener("click",function(){
                            player_click[x]++;
                        })
                        let y=Math.floor(Math.random()*amount);
                        clicks[x] = y;
                        for(let j=1;j<y;j++)
                        {
                            document.getElementById("colour"+x).style.filter = "brightness(150%)";
                            await Delay(750);
                            document.getElementById("colour"+x).style.filter = "brightness(100%)";
                            await Delay(1000);
                        }
                    }
                    for(let k=1;k<6;k++)
                    {
                        if(clicks[k]==player_click[k])
                        {
                            points++;
                        }
                    }
                    amount+=2;
                }
                gamerunning=false;
                break;
                
    }
}
var m_next = 2;
var m_previous = 1;
function next() {
    if (m_next == 3) {
        m_next = 1;
        m_previous = 3;
    } else {
        m_previous = m_next;
        m_next += 1;
    }
    document.getElementById("m" + m_previous).style.display = "none";
    document.getElementById("m" + m_next).style.display = "block";
    updatetitle(m_next);
}
function previous() {
    if (m_next == 1) {
        m_next = 3;
        m_previous = 1;
    } else {
        m_previous = m_next;
        m_next -= 1;
    }
    document.getElementById("m" + m_previous).style.display = "none";
    document.getElementById("m" + m_next).style.display = "block";
    updatetitle(m_next);
}
function updatetitle(m_next)
{
    let text = "error";
    switch (m_next)
    {
        case 1:
            {
                text = "How Memory Training Helps Different Conditions";
                break;
            }
        case 2:
            {
                text = "Game";
                break;
            }
        case 3:
            {
                text = "Ranking";
                break;
            }
        default:
            {
                text = "Another Error";
                break;
            }
    }
    document.querySelector("#card_title").innerText = text;
}



