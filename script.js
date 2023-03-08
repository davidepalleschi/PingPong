var players = [];

function addPlayer() {
  let playerNameInput = document.getElementById("playerName");
  let playerName = playerNameInput.value.trim();

  if (playerName.length > 0) {
    let newPlayer = {
      name: playerName,
      score: 0
    };
    let playersData = localStorage.getItem("players");
    let players = JSON.parse(playersData);
    players.push(newPlayer);
    // Salva i dati dei giocatori nel localStorage
    localStorage.setItem("players", JSON.stringify(players));
    updateTable();
    playerNameInput.value = "";
  }
}

function updateTable() {
  // Recupera i dati dei giocatori dal localStorage del browser e li salva nella letiabile playersData
  let playersData = localStorage.getItem("players");
  
  // Se i dati dei giocatori esistono, convertili in un array di oggetti JavaScript e salvalo nella letiabile players
  let players = JSON.parse(playersData);
  
  players.sort(function(a, b) {
    return b.score - a.score;
  });

  // Recupera la tabella HTML dal DOM
  let table = document.getElementById("scoreTable");
  
  // Recupera la riga dell'intestazione della tabella HTML dal DOM
  let headerRow = table.querySelector("thead tr");
  
  // Recupera il corpo della tabella HTML dal DOM
  let body = table.querySelector("tbody");
  
  // Cancella il contenuto del corpo della tabella HTML
  body.innerHTML = "";

  // Itera attraverso ogni oggetto giocatore nell'array players
  for (let i = 0; i < players.length; i++) {
    let player = players[i];

    // Crea una nuova riga HTML per il giocatore
    let row = document.createElement("tr");
    

    // Crea una nuova cella HTML per la classifica
    let classCell = document.createElement("td");
    classCell.textContent = i+1;

    // Crea una nuova cella HTML per il nome del giocatore e inserisci il testo del nome
    let nameCell = document.createElement("td");
    nameCell.textContent = player.name;
    
    // Crea una nuova cella HTML per il punteggio del giocatore e inserisci il testo del punteggio, quindi aggiungi una classe CSS "score"
    let scoreCell = document.createElement("td");
    scoreCell.textContent = player.score;
    scoreCell.classList.add("score");
    
    // Crea un nuovo pulsante HTML per incrementare il punteggio del giocatore
 
    let incButton=document.createElement("button");
    console.log(incButton)
    incButton.innerHTML = "Vittoria";
    
    // Aggiungi un listener per il click del pulsante, quindi aggiorna il punteggio del giocatore, salva i dati nel localStorage e aggiorna la tabella
    incButton.addEventListener("click", function() {
      player.score++;
      localStorage.setItem("players", JSON.stringify(players));
      updateTable();
    });
    
    // Crea un nuovo pulsante HTML per diminuire il punteggio del giocatore
    let decButton = document.createElement("button");
    decButton.textContent = "Sconfitta";
    
    // Aggiungi un listener per il click del pulsante, quindi aggiorna il punteggio del giocatore, salva i dati nel localStorage e aggiorna la tabella
    decButton.addEventListener("click", function() {
      if (player.score > 0) {
        player.score--;
        localStorage.setItem("players", JSON.stringify(players));
        updateTable();
      }
    });
    
    // Crea una nuova cella HTML per i pulsanti e aggiungi i pulsanti alla cella
    let actionsCell = document.createElement("td");
    actionsCell.appendChild(incButton);
    actionsCell.appendChild(decButton);
    
    let removeButton = document.createElement("button");
    removeButton.textContent = "Rimuovi";
    removeButton.addEventListener("click", function() {
      removePlayer(player.name);
    });
    actionsCell.appendChild(removeButton);
    // Aggiungi la cella del nome del giocatore, la cella del punteggio del giocatore e la cella dei pulsanti alla riga del giocatore
    row.appendChild(classCell);
    row.appendChild(nameCell);
    row.appendChild(scoreCell);
    row.appendChild(actionsCell);
    
    // Aggiungi la riga del giocatore al corpo della tabella HTML
    body.appendChild(row);
  }
}

// Aggiungi un listener per il click del pulsante "

// function updateTable() {
//   let playersData = localStorage.getItem("players");
//   if (playersData !== null) {
//     players = JSON.parse(playersData);
//   }
//   //players.sort(function(a, b) {
//   //  return b.score - a.score;
//   //});
//   let table = document.getElementById("scoreTable");
//   let headerRow = table.querySelector("thead tr");
//   let body = table.querySelector("tbody");
//   body.innerHTML = "";

//   for (let i = 0; i < players.length; i++) {
//     let player = players[i];
//     console.log(player)
//     let row = document.createElement("tr");
//     let nameCell = document.createElement("td");
//     let scoreCell = document.createElement("td");
//     let actionsCell = document.createElement("td");

//     nameCell.textContent = player.name;
//     scoreCell.textContent = player.score;
//     scoreCell.classList.add("score");
    
//     // Aggiungiamo un pulsante per incrementare il punteggio del giocatore
//     let incButton = document.createElement("button");
//     incButton.innerHTML = "+";
//     incButton.addEventListener("click", function() {
//       console.log(players.length)
//       console.log(player)
//       player.score++;
//       localStorage.setItem("players", JSON.stringify(players));
//       updateTable();
//     });

//     actionsCell.appendChild(incButton);

//     let decButton = document.createElement("button");
//     decButton.textContent = "-";
//     decButton.addEventListener("click", function() {
//       if (player.score > 0) {
//         console.log(player)
//         player.score--;
//         localStorage.setItem("players", JSON.stringify(players));
//         updateTable();
//       }
//     });
//     actionsCell.appendChild(decButton);

//     row.appendChild(nameCell);
//     row.appendChild(scoreCell);
//     row.appendChild(actionsCell);
//     body.appendChild(row);
//   }
// }

let addButton = document.getElementById("addButton");
addButton.addEventListener("click", addPlayer);

let playerNameInput = document.getElementById("playerName");
playerNameInput.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    addPlayer();
  }
});

updateTable();

function removePlayer(playerName) {
  console.log("Removing player: " + playerName); // Debugging line
  let playersData = localStorage.getItem("players");
  if (playersData !== null) {
    var players = JSON.parse(playersData);
    for (let i = 0; i < players.length; i++) {
      console.log(players[i])
      if (players[i].name === playerName) {
        players.splice(i, 1); // rimuovi il giocatore dall'array
        localStorage.setItem("players", JSON.stringify(players)); // aggiorna lo storage locale
        updateTable(); // aggiorna la tabella
        return;
      }
    }
  }
}

// function addScore(player) {
// 	player.score++;
//   localStorage.setItem("players", JSON.stringify(players));
//   updateTable();
// }
// function subtractScore(player) {
// 	player.score--;
//   localStorage.setItem("players", JSON.stringify(players));
//   updateTable();
// }