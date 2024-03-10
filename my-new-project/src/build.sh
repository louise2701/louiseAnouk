#!/bin/bash
docker rm frontend
docker rmi frontend

# Construire l'image Docker du frontend
docker build -t frontend -f Dockerfile.frontend .