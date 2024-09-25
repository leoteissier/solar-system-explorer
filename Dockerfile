# Étape 1 : Construction de l'application
FROM node:16-alpine AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json package-lock.json ./

# Installer toutes les dépendances, y compris devDependencies
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application pour la production
RUN npm run build

# Étape 2 : Serveur Nginx pour servir l'application
FROM nginx:alpine

# Copier les fichiers construits depuis l'étape de build
COPY --from=build /app/dist /usr/share/nginx/html

# Supprimer la configuration par défaut de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copier une configuration personnalisée de Nginx
COPY nginx.conf /etc/nginx/conf.d/

# Exposer le port 4000
EXPOSE 4000

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
