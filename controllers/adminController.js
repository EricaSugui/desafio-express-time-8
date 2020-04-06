const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt')
const session = require('express-session')


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
        let listaUsuarios = fs.readFileSync(fileCadastro, {
            encoding: 'utf-8'
        });
        listaUsuarios = JSON.parse(listaUsuarios);
        listaUsuarios = listaUsuarios.usuarios
        for (let i=0; i<listaUsuarios.length; i++){
            if (email == listaUsuarios[i].email) {
                let senhaComparada = bcrypt.compareSync(senha, listaUsuarios[i].senhaCriptografada)
                if (senhaComparada) {
                    req.session.login = listaUsuarios[i].nome
                    res.redirect('/admin')
                } else {
                    res.render('login', {title: 'Login', mensagem: "O email ou senha inválida!"})
                }
            } else {
                res.render('login', {title: 'Login', mensagem: "O email ou senha inválida!"})
            }
        }
        res.render('confirmaLogin', {title: "Login"})
       
    }

}

module.exports = adminController