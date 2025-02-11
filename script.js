var level_value;
var is_game_running;
var points = 0; //number of points
//random game
async function game()
{
    if(document.getElementById("m2").style.display !== "none")
    {
        document.getElementById("baner").style.visibility = "hidden";
        document.getElementById("m2").style.display = "none";
        document.getElementById("game_content").style.display = "flex";
        level_value = document.getElementById("level").value;

        /*switch(Math.floor(Math.random()*3))*/switch(0)
        {
            case 0:
                    await colours();
                    break;
            case 1:
                    await numbers();
                    break;
            case 2:
                    await memory();
                    break;
            default:
                    alert("wrong case number");
                    break;
        }

        document.getElementById("baner").style.visibility = "visible";
        document.getElementById("m2").style.display = "block";
        document.getElementById("game_content").style.display = "none";
    }
}


//waiting function
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


//timekeeper
function updatetime() 
{
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    document.getElementById("time").innerText = hours+":"+minutes+":"+seconds;
}
setInterval(updatetime, 500);
updatetime();


//moving background
document.addEventListener("mousemove", (e) => 
    {
        document.getElementById("background").style.transform = 
        "translate(calc(-50% + " + ((e.clientX / window.innerWidth - 0.5) * 60) + "px), " + 
                    "calc(-50% + " + ((e.clientY / window.innerHeight - 0.5) * 60) + "px))";
    });


//next page
var m_next = 2;
var m_previous = 1;
function next() 
{
    if (m_next == 3) 
    {
        m_next = 1;
        m_previous = 3;
    } 
    else 
    {
        m_previous = m_next;
        m_next += 1;
    }
    document.getElementById("m" + m_previous).style.display = "none";
    document.getElementById("m" + m_next).style.display = "block";
    updatetitle(m_next);
}


//update page title
function updatetitle(m_next)
{
    let text = "error";
    switch (m_next)
    {
        case 1:
            {
                text = "<strong>Article</strong>";
                break;
            }
        case 2:
            {
                text = "<strong>Game</strong>";
                break;
            }
        case 3:
            {
                text = "<strong>Ranking</strong>";
                break;
            }
        default:
            {
                text = "Another Error";
                break;
            }
    }
    document.getElementById("title").innerHTML = text;
}


//previous page
function previous() 
{
    if (m_next == 1) 
    {
        m_next = 3;
        m_previous = 1;
    }
    else 
    {
        m_previous = m_next;
        m_next -= 1;
    }
    document.getElementById("m" + m_previous).style.display = "none";
    document.getElementById("m" + m_next).style.display = "block";
    updatetitle(m_next);
}


//settings button
function settings() {
    const settingsWindow = document.getElementById("settings_window");
    settingsWindow.style.display = "block";
    settingsWindow.style.opacity = "1";
    
    // Dodanie event listenera na kliknięcie
    document.addEventListener("click", function closeSettings(e) {
        if (!settingsWindow.contains(e.target) && e.target.tagName !== 'BUTTON') {
            settingsWindow.style.display = "none";
            // Usunięcie event listenera po zamknięciu
            document.removeEventListener("click", closeSettings);
        }
    });
}
