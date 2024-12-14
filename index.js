const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

// Sert les fichiers statiques depuis le dossier public
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
    console.log('Un utilisateur s\'est connecté !');

    // Lorsqu'un message est reçu, on l'émet à tous les clients
    socket.on('chat message', (msg, sender) => {
        console.log(`${sender}: ${msg}`);
        io.emit('chat message', msg, sender); // Émettre à tous les clients
    });

    // Déconnexion
    socket.on('disconnect', () => {
        console.log('Un utilisateur s\'est déconnecté');
    });
});

// Lancer le serveur
http.listen(3000, () => {
    console.log('Le serveur est en ligne sur le port 3000');
});
