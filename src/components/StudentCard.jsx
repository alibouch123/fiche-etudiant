import { useState } from "react";
import "./StudentCard.css";

// TP2 : props (déstructuration) / TP3 : state, événements, affichage conditionnel
function StudentCard({ etudiant, onSupprimer, onModifier }) {
  // au départ les coordonnées sont masquées
  const [coordonneesVisibles, setCoordonneesVisibles] = useState(false);

  // TP2 : valeur par défaut si l'information n'est pas fournie
  const ville = etudiant.ville || "Non renseignée";

  function basculerCoordonnees() {
    setCoordonneesVisibles(!coordonneesVisibles);
  }

  // TP1 : bouton « Contacter » -> ouvre le client mail
  function contacter() {
    window.location.href = `mailto:${etudiant.email}`;
  }

  return (
    <div className="card">
      <img src={etudiant.image} alt="Photo de l'étudiant" />

      <h1>Fiche étudiant</h1>

      <p>
        <strong>Nom &amp; Prénom :</strong> {etudiant.prenom} {etudiant.nom}
      </p>

      {/* TP3 : affichage conditionnel avec && */}
      {coordonneesVisibles && (
        <>
          <p>
            <strong>Email :</strong> {etudiant.email}
          </p>
          <p>
            <strong>Téléphone :</strong> {etudiant.telephone}
          </p>
        </>
      )}

      <p>
        <strong>Filière :</strong> {etudiant.filiere}
      </p>
      <p>
        <strong>Année d'étude :</strong> {etudiant.anneeEtude}
      </p>
      <p>
        <strong>Groupe :</strong> {etudiant.groupe}
      </p>
      <p>
        <strong>Ville :</strong> {ville}
      </p>

      <div className="buttons">
        {/* TP3 : ternaire pour adapter le texte du bouton */}
        <button onClick={basculerCoordonnees}>
          {coordonneesVisibles
            ? "Masquer les coordonnées"
            : "Afficher les coordonnées"}
        </button>
        <button onClick={contacter}>Contacter</button>
        <button onClick={() => onModifier(etudiant)}>Modifier</button>
        <button className="danger" onClick={() => onSupprimer(etudiant.id)}>
          Supprimer
        </button>
      </div>
    </div>
  );
}

export default StudentCard;
