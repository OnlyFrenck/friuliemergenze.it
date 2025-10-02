// Import Firebase (usa i tuoi valori di configurazione!)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDWjMMe_yOtuVheeCPOwKiG8_-l35qdyKY",
    authDomain: "myfrem-friuliemergenze.firebaseapp.com",
    projectId: "myfrem-friuliemergenze",
    storageBucket: "myfrem-friuliemergenze.firebasestorage.app",
    messagingSenderId: "604175974671",
    appId: "1:604175974671:web:cb02a60611513eaf377e7a"
};

  // Import Firebase (da CDN)
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // Riferimento al form
  const staffForm = document.getElementById("staffForm");
  const formMessage = document.getElementById("formMessage");

  if (!staffForm) return; // Sicurezza: se form non esiste, esce

  staffForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Recupera valori campi
    const nome = document.getElementById("nome").value.trim();
    const eta = document.getElementById("eta").value.trim();
    const email = document.getElementById("email").value.trim();
    const motivazione = document.getElementById("motivazione").value.trim();

    try {
      const candidatureRef = collection(db, "candidatureStaff");
      await addDoc(candidatureRef, {
        nome,
        eta,
        email,
        motivazione,
        timestamp: new Date()
      });

      // Reset form
      staffForm.reset();

      // Messaggio di successo
      formMessage.style.color = "green";
      formMessage.textContent = "✅ Candidatura inviata con successo. Attendi il responso via mail.";
    } catch (error) {
      console.error("Errore durante l'invio:", error);
      formMessage.style.color = "red";
      formMessage.textContent = "❌ Si è verificato un errore. Riprova più tardi.";
    }
  });
});