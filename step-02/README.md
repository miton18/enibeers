Etape 2
=======

# Mise en place d'Express

Ajoutez une dépendance au projet
```sh
$ npm install --save express body-parser
```
cet ajout est visible dans le package.json
```
...
"express": "^4.16.2"
...
```

Completez le fichier __index.js__

Vous deviez retrouver l'équivalent de l'étape 1

## Servez du contenu statique

Utilisez l'application express pour servir le contenu statique, qui se trouve dans le dossier __public__ sous le chemin */public*

Ajouter **body-parser** en tant que middleware

Accedez à [http://127.0.0.1:8080/public](http://127.0.0.1:8080/public) pour vérifier

## Ajouter un nouveau sous-router

Utilisez __beers.js__ pour créer un nouveau router Express, il
doit implémenter 4 routes.
Basez vous sur une variable local dans laquelle vous avez charger le fichier __beers-sample.json__ pour implémenter vos routes.

- POST / (ajout d'une bière)
- GET / (liste de toute les bière: vous pouvez tronquer les proprétées)
- GET /:beer_id (toutes les infos concernant 1 bière)
- DELETE /:beer_id (suppréession d'une bière)

Vous devez exporter votre router pour pouvoir l'enregister sous le path */beers* dans l'__index.js__

Vous avez la base d'une application permettant de gérer des bières !

# La suite

[Etape 3](../step-03/README.md)