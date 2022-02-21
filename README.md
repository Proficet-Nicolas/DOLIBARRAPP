# S11 DOLIBARR APP

## Description

Dolibarr App est une solution Web HTML/JavaScript faite pour améliorer le processus comptable de la société S11. Utilisant le PGI Dolibarr, S11 cherche à compléter celui-ci en développant une solution Web pour l'enregistrement des demandes de remboursement de frais avancés par les collaborateurs dans le cadre de leur missions. Elle compte également faire également de cette solution une application mobile.

## Prérequis

1. Avoir une solution Dolibarr avec les modules suivants activés :
    1. NOTES DE FRAIS
    2. FACTURES ET AVOIRS
    3. BANQUES ET CAISSES
    4. API/WEB SERVICES (SERVEUR REST)
2. Déploiement interne de l'application

## Installation

Cloner le dépôt git et installer les packets à l'aide des commandes:

```powershell
git clone https://gitlab.s11.fr/dolibarrapp-np/dolibarrapp_20noizet.git
cd dolibarrapp_20noizet
npm i
```

Ensuite, vous pourrez directement accéder à l'ensemble de l'application par le fichier **index.html**.

## Caractéristiques

1. Identifier les personnes qui se connectent (portail d'identification)
2. Envoyer le formulaire de demande de remboursement de frais
    1. Joindre des photos prises avec l'appareil mobile, pour les pièces justificatives
3. Récupérer les informations envoyées dans Dolibarr

## À propos

Projet réalisé de mi mars 2021 à début mai 2021.

Créé par **NOIZET Maxence** <noizetmax08@orange.fr> et **PROFICET Nicolas** <nicolas.proficet@gmail.com>\
