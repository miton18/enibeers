On y est !
==========

Votre application de gestion de bières est enfin fonctionnelle !

Il reste une dernière étape avant de pouvoir l'envoyer en production,
ajouter la gestion des utilisateurs et l'authentifications


la dernière étape consiste a utiliser le multithreading de NodeJS:

Exemple:

```javascript
const cluster = require('cluster')
if (cluster.isMaster) {

    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork()
    }

} else {

    const express = require('express')
    const app = express()

    app.get('/', function (req, res) {
        res.send('Hello World!')
    })
    app.listen(3000)

}
```


Sur le temps qu'il vous reste essayer d'implémenter une stratégie de **passport**

http://www.passportjs.org/

Bon courrage !