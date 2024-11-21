// Inicializar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBW-gAKIG7FNanxtur3h2aROaB9XNON40Y",
    authDomain: "juego-multijugador-45b97.firebaseapp.com",
    databaseURL: "https://juego-multijugador-45b97-default-rtdb.firebaseio.com",
    projectId: "juego-multijugador-45b97",
    storageBucket: "juego-multijugador-45b97.firebasestorage.app",
    messagingSenderId: "182032480602",
    appId: "1:182032480602:web:8e7c94b002ec54f3641b63",
    measurementId: "G-VS7N0F3HF0"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Obtener la lista de participantes desde Firebase
function loadParticipants() {
    const participantRef = ref(database, 'participants');
    onValue(participantRef, (snapshot) => {
        const data = snapshot.val();
        const participantsList = document.getElementById("participants-list");
        const participantsTotal = document.getElementById("participants-total");
        participantsList.innerHTML = ""; // Limpiar lista antes de actualizar

        if (data) {
            const participants = Object.values(data);
            participants.forEach(participant => {
                const li = document.createElement("li");
                li.textContent = participant;
                participantsList.appendChild(li);
            });

            // Actualizar total de participantes
            const participantsCount = participants.length;
            participantsTotal.textContent = `Total de participantes: ${participantsCount}`;
        } else {
            participantsList.innerHTML = "<li>No hay participantes registrados.</li>";
            participantsTotal.textContent = "Total de participantes: 0";
        }
    });
}

// Obtener la lista de ganadores desde Firebase
function loadWinners() {
    const winnerRef = ref(database, 'winners');
    onValue(winnerRef, (snapshot) => {
        const data = snapshot.val();
        const winnersList = document.getElementById("winners-list");
        const winnersTotal = document.getElementById("winners-total");
        winnersList.innerHTML = ""; // Limpiar lista antes de actualizar

        if (data) {
            const winners = Object.values(data);
            winners.forEach(winner => {
                const li = document.createElement("li");
                li.textContent = winner;
                winnersList.appendChild(li);
            });

            // Actualizar total de ganadores
            const winnersCount = winners.length;
            winnersTotal.textContent = `${winnersCount}/5`;
        } else {
            winnersList.innerHTML = "<li>No hay ganadores registrados.</li>";
            winnersTotal.textContent = "0/5";
        }
    });
}

// Cargar la lista de participantes y ganadores cuando se carga la página
window.onload = () => {
    loadParticipants();
    loadWinners();
};