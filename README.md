# Solar System Explorer

![Solar System Explorer](https://gitlab.com/leoteissier/solar-system-explorer/blob/main/public/preview.png?raw=true)

## Introduction

**Solar System Explorer** est une application interactive en 3D permettant aux utilisateurs de naviguer à travers le système solaire. Explorez des détails fascinants sur chaque planète et leurs satellites naturels dans une expérience éducative immersive. Développée avec **React**, **Three.js** et **react-three/fiber**, cette application allie technologie moderne et passion pour l’astronomie.

## Technologies Utilisées

- **React** : Gestion de l'interface utilisateur et des états.
- **Three.js** et **react-three/fiber** : Création de graphiques 3D et gestion des animations.
- **Drei** : Collection d'utilitaires pour simplifier la manipulation des objets 3D avec react-three/fiber.
- **Vite** : Outil de build rapide pour un développement efficace.
- **TypeScript** : Typage statique pour un code plus robuste et maintenable.
- **ESLint** : Outil de linting pour maintenir la qualité du code.

## Fonctionnalités

- **Navigation Intuitive** : Parcourez le système solaire avec une interface utilisateur fluide et réactive.
- **Visualisation 3D** : Chaque corps céleste, de Mercure à Neptune, est représenté avec des textures détaillées et des animations orbitales réalistes.
- **Informations Détaillées** : Scrollez pour passer de planète en planète et afficher des informations complètes sur chaque corps céleste.
- **Animations Dynamiques** : Les mouvements des planètes et de leurs satellites sont animés pour refléter leurs caractéristiques orbitales réelles.
- **Responsive Design** : Optimisé pour une utilisation sur différents appareils et tailles d’écran.

## Installation

### Prérequis

Assurez-vous d'avoir **Node.js** et **npm** installés sur votre système. Vous pouvez les télécharger depuis [nodejs.org](https://nodejs.org/).

### Étapes d'Installation

1. **Cloner le dépôt du projet :**

   ```bash
   git clone https://gitlab.com/leoteissier/solar-system-explorer.git
   ```

2. Accéder au répertoire du projet :

    ```bash
    cd solar-system-explorer
    ````

3. Installer les dépendances du projet :

    ```bash
    npm install
    ````

4. Lancer l'application en mode développement :

    ```bash
    npm start
    ````

Ouvrir l'application dans votre navigateur :

Accédez à `http://localhost:5173/` pour voir l'application en action.

## Déploiement

L'application peut être déployée en utilisant Docker. Voici les étapes pour construire et exécuter le conteneur Docker :

1. Construire l'image Docker :

```bash
docker build -t solar-system-explorer:latest .
```

2. Exécuter le conteneur Docker :

```bash
docker run -d -p 3002:3002 --name solar-system-explorer solar-system-explorer:latest
```

3. Accéder à l'application :

Ouvrez votre navigateur et allez à `http://localhost:3002/`.

## Auteur

Léo Teissier

## Licence

Ce projet est sous licence MIT. Consultez le fichier `LICENSE` pour plus d'informations.
