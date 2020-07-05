const express = require('express');

const app = express();

app.use(express.static('./dist/MyFirstAngularProject'));

app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: 'dist/MyFirstAngularProject/' }
    );
});

app.listen(process.env.PORT || 8080);