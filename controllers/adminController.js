const fs = require('fs');
const path = require('path');


const adminController = { 
    admin: (req, res) => {
        let db = path.join('db', 'newsletter.json');
        let newsletter = fs.readFileSync(db, {encoding: 'utf-8'} );
        console.log(newsletter);
        newsletter = JSON.parse(newsletter);

        res.render('admin', { newsletter: newsletter.inscritos, title: 'Painel Admin' });
    }}

    module.exports = adminController