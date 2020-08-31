# simplon-signin-app
Consigne du projet
A partir d'un google sheet, modéliser une feuille de présence.
A partir de l'appli pouvoir se connecter. 
Créer une feuille de présence qui va demander les informations suivantes : 
-> Rajouter un logo 
-> Rajouter un intitulé 
-> Générer un PDF à partir des informations que renvoie Google Sheet qui peut être renouvelé à partir des données qui sont issue du Google Sheet (Stockage à notre niveau)
-> BDD Conseillée : MongoDB

Pour le moment ce qui est fait

-On peut créer un template
-On peut récupérer les données du sheets via le dashboard  pour les enregistrer en base et en même temps choisir un template.
-On peut se connecter/s'inscrire (à sécuriser)
-On peut générer un pdf depuis le dashboard (tableau à revoir) et les données sont insérées de façon statiques. (pour le moment infos étudiants récupérées de la base et insérées dans un nombre de colonnes et lignes prédéfinies)

Et ce qui reste à faire : 
-Design qui pour le moment est très très minimaliste :sweat_smile: 
-Refactoriser le tout (remplacer les messages Json etc), peut être remplacer certaines pages par un modal
-Sécuriser la connexion - Ajouter la déconnexion
-Récupérer les données du template dans le controller de création du pdf (createPdf) car pour le moment il y a uniquement les données du Google Sheets
-Rendre les données du tableau dynamique (créer les lignes en fonctions des données récupérées) et harmoniser le tout
-Gérer la conversion du lien  "logo" du sheets en image
-Ajouter la signature

N'hésitez pas à compléter :)

