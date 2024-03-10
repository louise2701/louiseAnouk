# Utilisez une image Node.js légère en tant qu'image de base
FROM node:14-alpine

# Définissez le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copiez le package.json et le package-lock.json pour installer les dépendances
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez le reste des fichiers de l'application dans le conteneur
COPY . .

# Exposez le port sur lequel l'application sera en cours d'exécution
EXPOSE 8080

# Commande pour démarrer l'application
CMD ["npm", "run", "serve"]


