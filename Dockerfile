# Étape 1 : Construction de l'application
FROM node:20-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer toutes les dépendances (y compris les devDependencies)
RUN npm install

# Copier le reste du code source
COPY . .

# Construire l'application pour la production
RUN npm run build

# Étape 2 : Préparer l'image de production avec Nginx
FROM nginx:alpine

# Copier les fichiers construits depuis l'étape de construction
COPY --from=builder /app/dist /usr/share/nginx/html

# Définir le port sur lequel Nginx écoute
ENV PORT=4000

# Modifier la configuration de Nginx pour écouter sur le port 4000
RUN sed -i 's/listen\s*80;/listen 4000;/' /etc/nginx/conf.d/default.conf

# Exposer le port 4000
EXPOSE 4000

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
