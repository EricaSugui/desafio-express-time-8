const path = require('path');
const fs = require('fs');

const homeController = {
  index: (req, res) => {
    let servicos = [
      { nome: 'Dev Full Stack', imagem: '/imagens/undraw_dev_focus.svg'},
      { nome: 'Marketing Digital', imagem: '/imagens/undraw_social_dashboard.svg'},
      { nome: 'Consultoria UX', imagem: '/imagens/undraw_mobile_apps.svg'}
    ];

    let banners = [
      '/imagens/banner.jpg', 
      '/imagens/banner3.jpg', 
    ];

    res.render(
      'index', 
      { title: 'Home', listaServicos: servicos, listaBanners: banners }
    );
  },
  contato: (req, res) => {
    // let {nome, email, mensagem} = req.body;
    // let infoContato = { nome, email, mensagem };
    // let infoContatoJSON = JSON.stringify(infoContato);
    // let datetime = new Date().getTime();
    // const db = path.join('db', `contato_${datetime}_${nome}.json`);
    // fs.writeFileSync(db, infoContatoJSON);
    let {nome, email, mensagem} = req.body;
    let infoContato = { nome, email, mensagem };
    let fileContato = path.join('db', 'contato.json');
    let listaContato = {};
    if (fs.existsSync(fileContato)){
      // trazendo conteúdo do arquivo em formato JSON
      listaContato = fs.readFileSync(fileContato, { encoding: 'utf-8' });
      // transformando JSON em obj
      listaContato = JSON.parse(listaContato);
      // pegando array de inscritos e adicionando um novo email
      listaContato.contatos.push(infoContato);
     
    } else {
      listaContato = {
        contatos: [infoContato]
      };
      
    }
    // transforma obj em JSON
    listaContato = JSON.stringify(listaContato);
    // guardando lista 
    fs.writeFileSync(fileContato, listaContato);

    res.render('contato', {nome, email, mensagem, title: 'Contato'});
  },
  newsletter: (req, res) => {
    let {email} = req.query;
    let fileNewsletter = path.join('db', `newsletter.json`);
    let listaNewsletter = {};
    if (fs.existsSync(fileNewsletter)){
      // trazendo conteúdo do arquivo em formato JSON
      listaNewsletter = fs.readFileSync(fileNewsletter, { encoding: 'utf-8' });
      // transformando JSON em obj
      listaNewsletter = JSON.parse(listaNewsletter);
      // pegando array de inscritos e adicionando um novo email
      listaNewsletter.inscritos.push(email);
      // guardando lista de inscritos com o novo email
      fs.writeFileSync(fileNewsletter, listaNewsletter);
    } else {
      listaNewsletter = {
        inscritos: [email]
      };
      
    }
    // transforma obj em JSON
    listaNewsletter = JSON.stringify(listaNewsletter);
    // guardando lista 
    fs.writeFileSync(fileNewsletter, listaNewsletter);
    // POST - req.body
    // GET - req.query
    // GET /:email - req.params

    res.render('newsletter', {email, title: 'Newsletter'});
  }
};

module.exports = homeController;