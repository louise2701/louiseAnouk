#!/bin/bash



# Supprimer le conteneur existant s'il existe
docker rm frontend

# Créer un réseau Docker s'il n'existe pas
docker network create my-tiny-network2

# Lancer le conteneur Docker du frontend avec le port 8088:80
docker run --name frontend --network my-tiny-network2 -p 8088:80 -d frontend
