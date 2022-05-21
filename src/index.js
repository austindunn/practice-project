const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const staticDirectoryPath = path.join(__dirname, '/static');

app.use(express.json());
app.use(express.static(staticDirectoryPath));

app.set('view engine', 'jade');
app.set('views', 'src/views');
app.get('/', (req, res) => {
    const pages = [];
    const contents = fs.readdirSync(staticDirectoryPath);
    contents.forEach(function (file) {
        if (/.*\.html$/.test(file)) {
            pages.push(file);
        }
    });

    res.render('directory', { pages });
});

app.listen(3000, () => console.log('Listening on port 3000'));
