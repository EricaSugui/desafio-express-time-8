const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt')


const adminController = {
    admin: (req, res) => {
        let db = path.join('db', 'newsletter.json');
        let newsletter = fs.readFileSync(db, {
            encoding: 'utf-8'
        });
        console.log(newsletter);
        newsletter = JSON.parse(newsletter);

        res.render('admin', {
            newsletter: newsletter.inscritos,
            title: 'Painel Admin'
        });
    },

    cadastro: (req, res) => {

        res.render('cadastroUsuario', {
            title: 'Cadastro'
        })
    },

    confirmaCadastro: (req, res) => {
        let {
            nome,
            email,
            senha
        } = req.body;

        let senhaCriptografada = bcrypt.hashSync(senha, 10);

        let fileCadastro = path.join('db', 'usuarios.json');

        let listaCadastro = {};

        if (fs.existsSync(fileCadastro)) {
            listaCadastro = fs.readFileSync(fileCadastro, {
                encoding: 'utf-8'
            });
            console.log(listaCadastro)

            listaCadastro = JSON.parse(listaCadastro);

            listaCadastro.usuarios.push({
                nome,
                email,
                senhaCriptografada
            });
        } else {
            listaCadastro = {
                usuarios: [{
                    nome,
                    email,
                    senhaCriptografada
                }]
            };
        }

        listaCadastro = JSON.stringify(listaCadastro);
        fs.writeFileSync(fileCadastro, listaCadastro);

        res.render('confirmaCadastro', {
            nome,
            title: 'confirmaCadastro'
        })
    },
    login: (req, res) => {
        
        res.render('login', {title: "Login"})
    },
    confirmaLogin: (req, res) => {
        let {email, senha} = req.body
        let fileCadastro = path.join('db', 'usuarios.json');
        let listaUsuarios = fs.readFileSync(fileCadastro);
        listaUsuarios = JSON.parse(listaUsuarios);
        for (let email of listaUsuarios){
            
        }
        if (email)
        res.redirect('admin')
    }

}

module.exports = adminController