document.addEventListener("mousemove", (e) => {
    const background = document.querySelector(".background");
  
    // Pobieranie wymiarów okna przeglądarki
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
  
    // Pozycja kursora względem środka okna
    const mouseX = e.clientX / windowWidth - 0.5;
    const mouseY = e.clientY / windowHeight - 0.5;
  
    // Ruch tła w zależności od pozycji kursora
    const offsetX = mouseX * 60; // Mnożnik dla efektu poziomego
    const offsetY = mouseY * 60; // Mnożnik dla efektu pionowego
  
    background.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
});
function start() {
    alert("hello");
}
let i=1;
function next() { 
    document.getElementById(`m${i}`).style.display = "none";
    if(i==3) {
        i = 1;
    } else {
        i++;
    }
    let card_title = document.getElementById(`m${i}`).getAttribute("data-title");
    document.getElementById(`card_title`).innerHTML = card_title;
    document.getElementById(`m${i}`).style.display = "flex";
} 
function previous() {
    document.getElementById(`m${i}`).style.display = "none";
    if(i==1) {
        i = 3;
    } else {
        i--;
    }
    let card_title = document.getElementById(`m${i}`).getAttribute("data-title");
    document.getElementById(`card_title`).innerHTML = card_title;
    document.getElementById(`m${i}`).style.display = "flex";
}
