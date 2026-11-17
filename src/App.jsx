import { useState } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import Navbar from "./components/Navbar.jsx";
import StudentCard from "./components/StudentCard.jsx";
import StudentForm from "./components/StudentForm.jsx";
import Footer from "./components/Footer.jsx";
import studentImage from "./assets/yassin.png";
import studentImagee from "./assets/nader.png";
import studentImageee from "./assets/mokni.png";

function App() {
  // TP3 : la liste des étudiants est un state (+ id unique pour chaque étudiant)
  const [etudiants, setEtudiants] = useState([
    {
      id: 1,
      prenom: "Yassin",
      nom: "Bouchnak",
      email: "donnykingff@gmail.com",
      telephone: "+216 22 280 510",
      filiere: "Génie Logiciel et Systèmes d'Information",
      anneeEtude: "2ème année",
      groupe: "GLSI 2",
      ville: "Mahdia",
      image: studentImage,
    },
    {
      id: 2,
      prenom: "Nader",
      nom: "Khoija",
      email: "nadertr58@gmail.com",
      telephone: "+216 29 380 028",
      filiere: "Licence Computer Science",
      anneeEtude: "1ère année",
      groupe: "LCS 1",
      ville: "Sousse",
      image: studentImagee,
    },
    {
      id: 3,
      prenom: "Yassine",
      nom: "Mokni",
      email: "yassinemokni37@gmail.com",
      telephone: "+216 26 460 608",
      filiere: "Licence Business Computing",
      anneeEtude: "2ème année",
      groupe: "LBC 2",
      ville: "Monastir",
      image: studentImageee,
    },
  ]);

  // TP3 : recherche / filtre
  const [recherche, setRecherche] = useState("");

  // TP4 : étudiant sélectionné pour la modification (null = mode ajout)
  const [etudiantAModifier, setEtudiantAModifier] = useState(null);

  // TP4 : ajouter (reçoit les données du formulaire, ajoute un id avec Date.now())
  function ajouterEtudiant(nouvelEtudiant) {
    const etudiantAvecId = { ...nouvelEtudiant, id: Date.now() };
    setEtudiants((anciensEtudiants) => [...anciensEtudiants, etudiantAvecId]);
  }

  // TP3 : supprimer avec filter()
  function supprimerEtudiant(id) {
    setEtudiants((anciensEtudiants) =>
      anciensEtudiants.filter((etudiant) => etudiant.id !== id),
    );
    // si on supprime l'étudiant en cours de modification, on quitte le mode modification
    if (etudiantAModifier && etudiantAModifier.id === id) {
      setEtudiantAModifier(null);
    }
  }

  // TP4 : on choisit l'étudiant à modifier (le formulaire se remplit)
  function modifierEtudiant(etudiant) {
    setEtudiantAModifier(etudiant);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // TP4 : enregistrer la modification avec map()
  function enregistrerModification(etudiantModifie) {
    setEtudiants((anciensEtudiants) =>
      anciensEtudiants.map((etudiant) =>
        etudiant.id === etudiantAModifier.id
          ? { ...etudiant, ...etudiantModifie }
          : etudiant,
      ),
    );
    setEtudiantAModifier(null);
  }

  // TP3 : filtrer par filière (+ nom / prénom)
  const texte = recherche.toLowerCase();
  const etudiantsFiltres = etudiants.filter(
    (etudiant) =>
      etudiant.filiere.toLowerCase().includes(texte) ||
      etudiant.nom.toLowerCase().includes(texte) ||
      etudiant.prenom.toLowerCase().includes(texte),
  );

  return (
    <div className="app">
      <Header />
      <Navbar />

      <main className="container">
        {/* TP4 : formulaire (ajout / modification) ; la key recrée le formulaire */}
        <StudentForm
          key={etudiantAModifier ? etudiantAModifier.id : "nouveau"}
          etudiantAModifier={etudiantAModifier}
          onAjouterEtudiant={ajouterEtudiant}
          onModifierEtudiant={enregistrerModification}
          onAnnuler={() => setEtudiantAModifier(null)}
        />

        <div className="search">
          <input
            type="text"
            placeholder="Rechercher par filière, nom ou prénom..."
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
          />
        </div>

        <div className="list">
          {etudiantsFiltres.length === 0 ? (
            <p className="empty">Aucun étudiant trouvé.</p>
          ) : (
            etudiantsFiltres.map((etudiant) => (
              <StudentCard
                key={etudiant.id}
                etudiant={etudiant}
                onSupprimer={supprimerEtudiant}
                onModifier={modifierEtudiant}
              />
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
