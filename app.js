
document.addEventListener('DOMContentLoaded', function() {

    // On recupere les elements dont on aura besoin pour un debut
    const formulaire = document.getElementById('formulaireGenerale');
    const listeEmploye = document.getElementById('listeEmploye');
    const pasEmployer = document.getElementById('pasEmployer');
    
    // Chargement initial des employés
    chargerEmploye();

    // Gestion de la soumission du formulaire
    formulaire.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupération des valeurs du formulaire et suppression des espaces inutiles
        const nomEmpJS = document.getElementById('nomEmp').value.trim();
        const prenomEmpJS = document.getElementById('prenomEmp').value.trim();
        const email = document.getElementById('emailEmp').value.trim();
        const fonctionEmpJS = document.getElementById('fonctionEmp').value.trim();
        
        // Validation des champs
        if (!champValide(nomEmpJS, prenomEmpJS, email, fonctionEmpJS)) {
            return;
        }
        
        // Création de l'objet employé avec un ID unique
        const employe = {
            id: Date.now(), // Utilisation du timestamp comme ID unique
            nomEmpJS,
            prenomEmpJS,
            email,
            fonctionEmpJS
        };
        
        // Ajout à l'affichage et sauvegarde
        afficher(employe);
        enregister(employe);
        
        // Réinitialisation du formulaire
        // formulaire.reset();
    });

    // Fonction de validation des champs
    function champValide(nomEmpJS, prenomEmpJS, email, fonctionEmpJS) {
        if (!nomEmpJS || !prenomEmpJS || !email || !fonctionEmpJS) {
            alert('Tous les champs sont obligatoires !');
            return false;
        }
        
        if (!emailValide(email)) {
            alert('L\'email n\'est pas valide ');
            return false;
        }
        
        return true;
    }

    // Validation de l'email avec regex
    function emailValide(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // afficher un employé dans le tableau
    function afficher(employe) {
        // Masquer le message "Aucun employé"
        pasEmployer.style.display = 'none';
        
        // Création de la ligne du tableau
        const ligne = document.createElement('tr');
        ligne.innerHTML = `
            <td>${employe.nomEmpJS} ${employe.prenomEmpJS}</td>
            <td>${employe.email}</td>
            <td>${employe.fonctionEmpJS}</td>
            <td>
                <button class="supprimer" data-id="${employe.id}">Supprimer</button>
            </td>
        `;
        
        // Ajout au tableau
        listeEmploye.appendChild(ligne);
        
        // Le bouton de suppression ok
        ligne.querySelector('.supprimer').addEventListener('click', function() {
            if (confirm(`Voulez-vous vraiment supprimer ${employe.nomEmpJS} ${employe.prenomEmpJS} ?`)) {
                supprimer(employe.id);
                ligne.remove();
                
                // Afficher le message si plus d'employés
                if (listeEmploye.children.length === 0) {
                    pasEmployer.style.display = 'block';
                }
            }
        });
    }
    
    // Sauvegarde d'un employé dans le localStorage
    function enregister(employe) {
        const employes = getLesEmployes();
        employes.push(employe);
        localStorage.setItem('orangeemployes', JSON.stringify(employes));
    }
    
    // Chargement des employés depuis le localStorage
    function chargerEmploye() {
        const employes = getLesEmployes();

        if (employes.length > 0) {
            pasEmployer.style.display = 'none';
            employes.forEach(employe => afficher(employe));
        } else {
            pasEmployer.style.display = 'block';
        }
    }
    
    // Suppression d'un employé
    function supprimer(id) {
        let employes = getLesEmployes();
        employes = employes.filter(employe => employe.id !== id);
        localStorage.setItem('Les employes d\'orange', JSON.stringify(employes));
    }
    
    // Récupération des employés depuis le localStorage
    function getLesEmployes() {
        return JSON.parse(localStorage.getItem('Les employes d\'orange ')) || [];
    }
});