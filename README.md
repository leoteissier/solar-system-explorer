# Solar System Explorer

## Introduction
Solar System Explorer est une application interactive en 3D qui permet aux utilisateurs de naviguer à travers le système solaire, en explorant des détails fascinants sur chaque planète et leurs satellites naturels. Développée en React avec l'utilisation de Three.js et react-three/fiber, cette application éducative offre une expérience immersive dans l'astronomie.

## Technologies Utilisées
- React: Pour la gestion de l'interface utilisateur et des états.
- Three.js et react-three/fiber: Pour la création de graphiques 3D et la gestion des animations.
- Drei: Une collection utile de helpers pour react-three/fiber qui facilite la manipulation d'objets 3D.

## Fonctionnalités
- Navigation Intuitive: Défilez à travers le système solaire avec une interface utilisateur fluide et responsive.
- Visualisation 3D: Chaque corps céleste, de Mercure à Neptune, est représenté avec des textures détaillées et des animations orbitales réalistes.
- Informations Détaillées: Scroller sur la page pour se déplacer de planete en planete et afficher leurs informations
- Animation Dynamique: Les mouvements des planètes et de leurs satellites sont animés pour refléter leurs caractéristiques orbitales réelles.


## Structure du Projet
- src/components: Contient tous les composants React, y compris les composants pour les planètes et les informations détaillées.
- src/data: Inclut les données utilisées pour les textures des corps célestes et les informations affichées.
- src/functions: Fonctions d'aide pour la gestion des transitions et de la navigation.


## Installation

Assurez-vous d'avoir Node.js installé sur votre système pour exécuter ce projet.

1. Clonez le dépôt du projet :
```bash
git clone https://github.com/leoteissier/solar-system-explorer.git
```

2. Accédez au répertoire du projet :
```bash
cd solar-system-explorer
```

3. Installez les dépendances du projet :
```bash
npm install
```

4. Lancez l'application en mode développement :
```bash
npm start
```

5. Ouvrez votre navigateur et accédez à l'URL suivante :
```
http://localhost:5173/
```

## Auteur
Ce projet a été réalisé par Léo Teissier.

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus d'informations.