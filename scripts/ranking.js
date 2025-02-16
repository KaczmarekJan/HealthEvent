const request = new Request("https://memory-trainer.ct8.pl/ranking.php", {
  method: "POST",
  body: '{"id": "0"}', // tym się nie przejmuj, użyjemy później
});
function getRanking() {
    fetch(request)
    .then(response => response.text()) // Odczytaj dane jako tekst (sprawdź, czy to JSON)
    .then(data => console.log("Odpowiedź z serwera:", data)) // Wyświetl dane
    .catch(error => console.error("Błąd:", error));

}
getRanking();