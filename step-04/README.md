
Etape 4
=======

# Metrics et logs

## Logs

Ajoutez trois dépendance au projet
```sh
$ npm install --save express winston winston-mongodb morgan
```

Utilsez:
https://www.npmjs.com/package/winston
et
https://www.npmjs.com/package/winston-mongodb

pour implémenter votre propre logger

connectez le a votre Mongo dans une collection **cappé** de 100 éléments

Loggez un peu partour dans votre application

Ajoutez Morgan en tant que middleware d'express

## Metrics

Ajoutez trois dépendance au projet
```sh
$ npm install --save express winston winston-mongodb morgan
```

Utilisez:
https://github.com/siimon/prom-client
pour compter:

- Le nombre de requêtes faites à votre serveur (middleware sur l'ensemble des routes)
- Le nombre de requêtes par route
- un histograme des temps de requêtes

Ajouter le rendu de Prometheus dans un call sur /metrics (exposez vos métriques)


# La suite

[Etape finale](../step-final/README.md)