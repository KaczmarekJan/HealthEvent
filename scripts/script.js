var level_value;
var is_game_running;
var points = 125; //number of points
level(2); //default level
var m_current = 2; //site page number
site_language(5); //default language


function level(x)
{
    // Reset all buttons to gray color
    for(let i=0; i<4; i++)
    {
        document.getElementsByClassName("button-89")[i].style.setProperty('--color', 'gray');
    }
    
    // Set clicked button to purple
    document.getElementsByClassName("button-89")[x-1].style.setProperty('--color', '#a637e7');
    
    level_value = x;
}

//random game
async function game()
{
    if(document.getElementById("m2").style.display !== "none")
    {
        document.getElementById("baner").style.visibility = "hidden";
        document.getElementById("m2").style.display = "none";
        document.getElementById("game_content").style.display = "flex";

        //switch(Math.floor(Math.random()*4))
        switch(3)
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
            case 3: 
                    await sequence();
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
function delay(ms) 
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updatetime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = (60 - now.getSeconds()).toString().padStart(2, '0'); // Odliczanie od 60 w dół

    // Sprawdzenie szerokości ekranu (jeśli telefon, pokazuj tylko sekundy)
    if (window.innerWidth <= 600) {
        document.getElementById("time").innerHTML = `
            <span class="time-part">${seconds}</span>
        `;
    } else {
        document.getElementById("time").innerHTML = `
            <span class="time-part">${hours}</span>
            <span class="colon">:</span>
            <span class="time-part">${minutes}</span>
            <span class="colon">:</span>
            <span class="time-part">${seconds}</span>
        `;
    }
}

// Aktualizacja co sekundę + sprawdzanie szerokości ekranu
setInterval(updatetime, 1000);
window.addEventListener('resize', updatetime); // Odświeżanie przy zmianie rozmiaru
updatetime(); // Pierwsze wywołanie


//moving background
document.addEventListener("mousemove", (e) => 
    {
        document.getElementById("background").style.transform = 
        "translate(calc(-50% + " + ((e.clientX / window.innerWidth - 0.5) * 60) + "px), " + 
                    "calc(-50% + " + ((e.clientY / window.innerHeight - 0.5) * 60) + "px))";
    });

//next page

function next() 
{
    document.getElementById("m" + m_current).style.display = "none";
    m_current++;
    if (m_current == 4) 
    {
        m_current = 1;
    } 
    document.getElementById("m" + m_current).style.display = "block";
    title_text = "text"+m_current;
    updatetitle(title_text);
}
//previous page
function previous() 
{
    document.getElementById("m" + m_current).style.display = "none";
    m_current--;
    if (m_current == 0) 
    {
            m_current = 3;
    } 
    document.getElementById("m" + m_current).style.display = "block";
    title_text = "text"+m_current;
    updatetitle(title_text);
}
var text1 = "<strong>Article</strong>";
var text2 = "<strong>Game</strong>";
var text3 = "<strong>Ranking</strong>";
//update page title
function updatetitle(title_text)
{
    document.getElementById("title").innerHTML = window[title_text];
}
//settings button
function settings() 
{
    document.getElementById("m2").style.display = "none";
    const settingsWindow = document.getElementById("settings_window");
    settingsWindow.style.display = "block";
    settingsWindow.style.opacity = "1";
    
    // Dodanie event listenera na kliknięcie
    document.addEventListener("click", function closeSettings(e) {
        if (!settingsWindow.contains(e.target) && e.target.tagName !== 'BUTTON') {
            settingsWindow.style.display = "none";
            // Usunięcie event listenera po zamknięciu
            document.removeEventListener("click", closeSettings);
            if(document.getElementById("m1").style.display !== "block" && document.getElementById("m3").style.display !== "block")
            {
                document.getElementById("m2").style.display = "block";
            }
        }
    });
}

//language button
function site_language(x)
{
    // Reset all buttons to gray color
    for(let i=4; i<6; i++) 
        {
            document.getElementsByClassName("button-89")[i].style.setProperty('--color', 'gray');
        }
    if(x == 5)
    {
            // Set clicked button to purple
            document.getElementsByClassName("button-89")[x-1].style.setProperty('--color', '#a637e7');

            //numbers variables
            instchange_numbers = "Sum all the numbers";
            numberbutremeber = "Remember all the numbers";
            nmb_correct = "Correct!";
            nmb_incorrect = "Incorrect!";
            nmb_score = "Score: ";
            nmb_placeholder = "Input the numbers that were displayed one by one.";
            mem_nopoints = "No more points :(";
            mem_hurryup = "Hurry up! Only ";
            mem_pointsleft = "points left!";

            //change main page title
            document.getElementsByTagName("title")[0].innerHTML = "Memory Training";

            //change start button game
            document.getElementById("m2").innerHTML = "<p>Click anywhere to start</p>";

            //info
            document.getElementById("info").innerHTML = `
                    <p>Memory Trainer</p>
                    <p>Version 1.0</p>
                    <p>Developed by Dobrica Nedeljković</p>
                    <p>11.02.2025</p>`;

            //buttons
            document.getElementById("level1").innerHTML = "Easy";
            document.getElementById("level2").innerHTML = "Normal";
            document.getElementById("level3").innerHTML = "Hard";
            document.getElementById("level4").innerHTML = "SuperHard";
            
            //language
            document.getElementById("Language").innerHTML = "Language: "

            //settings window volume nejm
            document.getElementById("Volume").innerHTML = "Volume: "; 

            //change title
            text1 = "<strong>Article</strong>";
            text2 = "<strong>Game</strong>";
            text3 = "<strong>Ranking</strong>";

            document.getElementById("title").innerHTML = window["text"+m_current];
            //change article language
            document.getElementById("m1").innerHTML = `
                <h1>How Memory Training Helps Different Conditions</h1>
                <br>
                <h2>Stroke Recovery</h2>
                <p>Helps rewire the brain, relearn memory skills, and regain independence.</p>
            
                <h2>Traumatic Brain Injury (TBI)</h2>
                <p>Strengthens focus and attention, reducing mental fatigue and improving daily tasks.</p>
            
                <h2>Multiple Sclerosis (MS)</h2>
                <p>Boosts organization with planners and reminders, making life easier and less exhausting.</p>
            
                <h2>Depression</h2>
                <p>Engages the brain, lifts mood, and boosts confidence through enjoyable memory exercises.</p>
            
                <h2>Anxiety Disorders</h2>
                <p>Trains focus, reducing racing thoughts and improving mental clarity.</p>
            
                <h2>Long COVID/Post-COVID</h2>
                <p>Fights "brain fog" with structured exercises, helping rebuild thinking skills.</p>
            
                <h2>Chemo Brain</h2>
                <p>Provides memory strategies to stay sharp and organized during and after treatment.</p>
            
                <h2>Parkinson’s Disease</h2>
                <p>Uses routines and visual reminders to maintain independence and manage memory challenges.</p>
            
                <h2>Learning Disabilities (Dyslexia, etc.)</h2>
                <p>Uses multi-sensory techniques to boost retention and confidence in learning.</p>
            
                <h2>Fibromyalgia ("Fibro Fog")</h2>
                <p>Reduces mental overload with simple memory tricks for a clearer, easier daily life.</p>`;
    }
    else if(x == 6)
    {
            // Set clicked button to purple
            document.getElementsByClassName("button-89")[x-1].style.setProperty('--color', '#a637e7');

            //numbers variables
            instchange_numbers = "Saberite sve brojeve: ";
            numberbutremeber = "Zapamtite sledeće brojeve: ";
            nmb_correct = "Tačno!";
            nmb_incorrect = "Netačno!";
            nmb_score = "Rezultat: ";
            nmb_placeholder = "Redno ukucajte brojeve koji su bili prikazani.";
            mem_nopoints = "Ostali ste bez poena :(";
            mem_hurryup = "Požuri! Ostalo ti je samo ";
            mem_pointsleft = "poena!";

            //change start button game
            document.getElementById("m2").innerHTML = "<p>Kliknite bilo gde da počnete.</p>";
            // INFORMATION
            document.getElementById("info").innerHTML = `
                    <p>Trener Pamćenja</p>
                    <p>Verzija 1.0</p>
                    <p>Kreator: Dobrica Nedeljković</p>
                    <p>11.02.2025</p>`;

            document.getElementById("Language").innerHTML = "Jezik: "
            
            //settings window volume nejm
            document.getElementById("Volume").innerHTML = "Glasnoća: "; 

            //change title
            text1 = "<strong>Artikl</strong>";
            text2 = "<strong>Igra</strong>";
            text3 = "<strong>Rangiranje</strong>";
            document.getElementById("title").innerHTML = window["text"+m_current];

            //buttons
            document.getElementById("level1").innerHTML = "Lako";
            document.getElementById("level2").innerHTML = "Srednje";
            document.getElementById("level3").innerHTML = "Teško";
            document.getElementById("level4").innerHTML = "Neograničeno";

            //change main page title
            document.getElementsByTagName("title")[0].innerHTML = "Trener Memorije";

            //change article language
            document.getElementById("m1").innerHTML = `
                    <h1>Kako trening memorije pomaže kod različitih stanja</h1>
                    <br>
                    <h2>Oporavak od moždanog udara</h2>
                    <p>Pomaže u ponovnom povezivanju moždanih funkcija, učenju veština pamćenja i povratku samostalnosti.</p>
                
                    <h2>Traumatska povreda mozga (TBI)</h2>
                    <p>Jača fokus i pažnju, smanjuje mentalni zamor i poboljšava obavljanje svakodnevnih zadataka.</p>
                
                    <h2>Multipla skleroza (MS)</h2>
                    <p>Poboljšava organizaciju pomoću planera i podsetnika, olakšavajući život i smanjujući umor.</p>
                
                    <h2>Depresija</h2>
                    <p>Angažuje mozak, poboljšava raspoloženje i povećava samopouzdanje kroz zabavne vežbe pamćenja.</p>
                
                    <h2>Anksiozni poremećaji</h2>
                    <p>Trenira fokus, smanjujući ubrzane misli i poboljšavajući mentalnu jasnoću.</p>
                
                    <h2>Dugi COVID/Post-COVID</h2>
                    <p>Bori se protiv „moždane magle“ strukturisanim vežbama, pomažući u obnovi kognitivnih veština.</p>
                
                    <h2>Hemioterapijska magla</h2>
                    <p>Obezbeđuje strategije pamćenja za očuvanje bistrine i organizovanosti tokom i nakon lečenja.</p>
                
                    <h2>Parkinsonova bolest</h2>
                    <p>Koristi rutine i vizuelne podsetnike za očuvanje samostalnosti i upravljanje problemima sa pamćenjem.</p>
                
                    <h2>Poremećaji u učenju (disleksija, itd.)</h2>
                    <p>Koristi multisenzorne tehnike za poboljšanje zadržavanja informacija i povećanje samopouzdanja u učenju.</p>
                
                    <h2>Fibromijalgija („Fibro magla“)</h2>
                    <p>Smanjuje mentalno preopterećenje jednostavnim trikovima za pamćenje, olakšavajući svakodnevni život.</p>`;
    }
}