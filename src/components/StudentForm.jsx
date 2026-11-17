import { useState } from "react";
import studentImage from "../assets/student.svg";
import "./StudentForm.css";

// TP4 : formulaire contrôlé, réutilisé pour AJOUTER et MODIFIER, avec validation
function StudentForm({
  etudiantAModifier,
  onAjouterEtudiant,
  onModifierEtudiant,
  onAnnuler,
}) {
  // ?. (chaînage optionnel) + || "" : champs préremplis en mode modification
  const [nom, setNom] = useState(etudiantAModifier?.nom || "");
  const [prenom, setPrenom] = useState(etudiantAModifier?.prenom || "");
  const [email, setEmail] = useState(etudiantAModifier?.email || "");
  const [telephone, setTelephone] = useState(etudiantAModifier?.telephone || "");
  const [filiere, setFiliere] = useState(etudiantAModifier?.filiere || "");
  const [anneeEtude, setAnneeEtude] = useState(etudiantAModifier?.anneeEtude || "");
  const [groupe, setGroupe] = useState(etudiantAModifier?.groupe || "");
  const [ville, setVille] = useState(etudiantAModifier?.ville || "");
  const [image, setImage] = useState(etudiantAModifier?.image || studentImage);

  // erreurs de validation : {} = aucune erreur
  const [erreurs, setErreurs] = useState({});

  // sélection d'une image depuis l'ordinateur
  function handleImageChange(e) {
    const fichier = e.target.files[0];
    if (fichier) {
      setImage(URL.createObjectURL(fichier));
    }
  }

  // validation : retourne true s'il n'y a aucune erreur
  function valider() {
    const nouvellesErreurs = {};

    if (nom.trim() === "") nouvellesErreurs.nom = "Le nom est obligatoire.";
    if (prenom.trim() === "") nouvellesErreurs.prenom = "Le prénom est obligatoire.";

    if (email.trim() === "") {
      nouvellesErreurs.email = "L'email est obligatoire.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nouvellesErreurs.email = "L'email n'est pas valide.";
    }

    if (telephone.trim() === "") {
      nouvellesErreurs.telephone = "Le téléphone est obligatoire.";
    }
    if (filiere === "") nouvellesErreurs.filiere = "Choisissez une filière.";

    setErreurs(nouvellesErreurs);
    return Object.keys(nouvellesErreurs).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault(); // empêche le rechargement de la page

    // 1. vérifier les données  2. s'il y a des erreurs, on s'arrête
    if (!valider()) return;

    const etudiant = {
      nom: nom.trim(),
      prenom: prenom.trim(),
      email: email.trim(),
      telephone: telephone.trim(),
      filiere,
      anneeEtude,
      groupe: groupe.trim(),
      ville: ville.trim(),
      image,
    };

    // 3. même formulaire pour modifier ou ajouter
    if (etudiantAModifier) {
      onModifierEtudiant(etudiant);
    } else {
      onAjouterEtudiant(etudiant);
      // on vide le formulaire après l'ajout
      setNom(""); setPrenom(""); setEmail(""); setTelephone("");
      setFiliere(""); setAnneeEtude(""); setGroupe(""); setVille("");
      setImage(studentImage);
    }
    setErreurs({});
  }

  return (
    <form className="student-form" onSubmit={handleSubmit} noValidate>
      <h2>{etudiantAModifier ? "Modifier un étudiant" : "Ajouter un étudiant"}</h2>

      <label htmlFor="nom">Nom</label>
      <input
        type="text" id="nom" name="nom" placeholder="Nom"
        value={nom} onChange={(e) => setNom(e.target.value)} required
      />
      {erreurs.nom && <span className="erreur">{erreurs.nom}</span>}

      <label htmlFor="prenom">Prénom</label>
      <input
        type="text" id="prenom" name="prenom" placeholder="Prénom"
        value={prenom} onChange={(e) => setPrenom(e.target.value)} required
      />
      {erreurs.prenom && <span className="erreur">{erreurs.prenom}</span>}

      <label htmlFor="email">Email</label>
      <input
        type="email" id="email" name="email" placeholder="exemple@gmail.com"
        value={email} onChange={(e) => setEmail(e.target.value)} required
      />
      {erreurs.email && <span className="erreur">{erreurs.email}</span>}

      <label htmlFor="telephone">Téléphone</label>
      <input
        type="tel" id="telephone" name="telephone" placeholder="+216 99 999 999"
        value={telephone} onChange={(e) => setTelephone(e.target.value)} required
      />
      {erreurs.telephone && <span className="erreur">{erreurs.telephone}</span>}

      <label htmlFor="filiere">Filière</label>
      <select
        id="filiere" name="filiere" value={filiere}
        onChange={(e) => setFiliere(e.target.value)} required
      >
        <option value="">-- Choisir une filière --</option>
        <option value="Génie Logiciel et Systèmes d'Information">
          Génie Logiciel et Systèmes d'Information
        </option>
        <option value="Licence Computer Science">Licence Computer Science</option>
        <option value="Licence Business Computing">Licence Business Computing</option>
      </select>
      {erreurs.filiere && <span className="erreur">{erreurs.filiere}</span>}

      <label htmlFor="anneeEtude">Année d'étude</label>
      <select
        id="anneeEtude" name="anneeEtude" value={anneeEtude}
        onChange={(e) => setAnneeEtude(e.target.value)}
      >
        <option value="">-- Choisir l'année --</option>
        <option value="1ère année">1ère année</option>
        <option value="2ème année">2ème année</option>
        <option value="3ème année">3ème année</option>
      </select>

      <label htmlFor="groupe">Groupe</label>
      <input
        type="text" id="groupe" name="groupe" placeholder="GLSI 2"
        value={groupe} onChange={(e) => setGroupe(e.target.value)}
      />

      <label htmlFor="ville">Ville</label>
      <input
        type="text" id="ville" name="ville" placeholder="Ville"
        value={ville} onChange={(e) => setVille(e.target.value)}
      />

      <label htmlFor="photo">Photo</label>
      <input type="file" id="photo" name="photo" accept="image/*" onChange={handleImageChange} />
      <img className="apercu" src={image} alt="Aperçu" />

      <div className="form-buttons">
        <button type="submit">{etudiantAModifier ? "Enregistrer" : "Ajouter"}</button>
        {etudiantAModifier ? (
          <button type="button" className="secondary" onClick={onAnnuler}>
            Annuler
          </button>
        ) : (
          <button type="reset" className="secondary">Réinitialiser</button>
        )}
      </div>
    </form>
  );
}

export default StudentForm;
