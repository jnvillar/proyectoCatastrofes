var path = require('path');
var exphbs = require('express-handlebars');
var hbs = exphbs.create({
    // Specify helpers which are only registered on this instance.
    helpers: {
        equal: function (lvalue, rvalue, options) {
            if (lvalue != rvalue) {
                return options.inverse(this);
            } else {
                return options.fn(this);
            }
        },
        makeResume: function (string) {
            return string.substring(0,150)+"...";
        }
    }
});

var http = require("http");
var url = require("url");

var fs = require('fs');
var express = require("express");
var app = express();
var request = require('request'); //npm install -save request
var page = {};

var articulos = require('./noticias');
articulos.start();


body = require('body-parser');
app.use(body.json());
app.use(body.urlencoded({
    extended: true
}));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
var options = { dotfiles: 'ignore', etag: false,
    extensions: ['htm', 'html'],
    index: false
};


app.use(body.urlencoded({ extended: false }));
app.use(body.json());
app.use(express.static(path.join(__dirname, 'public') , options  ));





app.use("/css",express.static(__dirname + '/css'));
app.use("/scss",express.static(__dirname + '/scss'));
app.use("/img",express.static(__dirname + '/images'));
app.use("/js",express.static(__dirname + '/js'));
app.use(express.static(__dirname +  '/'));



app.listen(process.env.PORT || 3000);



app.get('/', function (req, res) {
    var noticias = articulos.getNoticias();
    var zonas = articulos.getZonas();
    console.log(zonas);
    res.render('index',{noticias:noticias.reverse(),zonas:zonas});
});

app.get('/newNews', function (req, res) {
    var noticias = articulos.getNoticias();
    var zonas = articulos.getZonas();
    var barrios = articulos.getBarrios();
    res.render('formArticle',{noticias:noticias,zonas:zonas,barrios:barrios});
});

app.post('/newNews', function (req, res) {
    var article = req.body;
    var zone = articulos.newZone(article.lugar,article.tipo);
    console.log(zone);
    articulos.newNoticia(article.titulo,article.contenido,article.img,article.tipo,zone,article.imagenes);
    res.redirect('./');

});


app.get('/noticia/:id', function (req, res) {
    var noticia = articulos.getNoticia(req.params.id);
    var zonas = articulos.getZonas();
    console.log(noticia);
    res.render('single',{noticia:noticia,zonas:zonas});
});


app.get('/zonasAfectadas/:zona',function (req,res) {
   var zonas = articulos.getZonas();
    res.render('zonasAfectadas',{zonas:zonas});
});