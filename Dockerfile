# Étape 1 : Construction de l'application
FROM node:16-alpine AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json ./

# Installer toutes les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application pour la production
RUN npm run build

# Étape 2 : Serveur léger pour servir l'application
FROM node:16-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers construits depuis l'étape de build
COPY --from=build /app/dist /app

# Installer un serveur HTTP statique comme 'serve'
RUN npm install -g serve

# Exposer le port 3002
EXPOSE 3002

# Démarrer le serveur sur le port 3002
CMD ["serve", "-s", "/app", "-l", "3002"]
