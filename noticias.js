var articulo = function (titulo,id,contenido,img,tipo,zonas,fecha,imagenes) {
    this.visitas = 0;
    this.likes = 0;
    this.fecha = fecha;
    this.titulo = titulo;
    this.id = id;
    this.contenido = contenido;
    this.img = img;
    this.imagenes = imagenes;
    this.tipo = tipo;
    this.zona = zona;
};

var articulos = [];

var zona = function (nombre,tipo) {
    this.nombre = nombre;
    this.tipo = tipo;
};

var zonasAfectadas = [];
var id = 0;

module.exports ={
    start: function() {

        //Aca se cargan los nuevos articulos
        // newNoticia: function (titulo,contenido,img,tipo,zona)

        var zona1 = new zona("Saavedra", "Corte Luz");
        var imagenes = ["http://bucket1.glanacion.com/anexos/fotos/83/actualidad-1859283w620.jpg","http://bucket1.glanacion.com/anexos/fotos/83/actualidad-1859283w620.jpg"];
        this.newNoticia("Corte de Luz General en Saavedra", "Debido al alto consumo por el calor sofocante, casi todos los vecinos de Saavedra no disponen de luz actualmente" ,"http://bucket1.glanacion.com/anexos/fotos/83/actualidad-1859283w620.jpg", "Corte Luz", zona1,imagenes);
        var zona2 = new zona("Floresta", "Corte Gas");
        this.newNoticia("Explosion del Gasoducto de Floresta", "Causado por un golpe, ha explotado el gasoducto general de Floresta, hay gran cantidad de heridos y muertos", "https://i.ytimg.com/vi/zhBxfNm3rJE/maxresdefault.jpg","Corte gas",zona2,imagenes);
        var zona3 = new zona("Villa Urquiza", "Corte Subte");
        this.newNoticia("Corte en el Subte B Estacion Urquiza", "Debido a un reclamo gremial, los trabajadores prometen cortar el subte durante todo el dia, las personas deberan ir hasta otra estacion o tomar otro medio de transporte", "http://cdn.girabsas.com/072015/1467222333526.jpg","Corte Subte", zona3,imagenes);
        var zona4 = new zona("Belgrano", "Corte Luz");
        this.newNoticia("Corte de Luz Parcial en Belgrano", "Causado por un desperfecto tecnico en los generadores de la zona, los trabajadores prometen repararlo antes del atardecer", "http://ftp.pilardetodos.com/media/k2/items/cache/64337ffeaae67237594d79a8ceda7ce6_XL.jpg","Cortes Luz" ,zona4,imagenes);

    },


    newNoticia: function (titulo,contenido,img,tipo,lugar,imagenes) {
        var today = new Date();
        var dd = today.getDate(); var mm = today.getMonth()+1; var yyyy = today.getFullYear();

        if(dd<10) {
            dd='0'+dd
        }

        if(mm<10) {
            mm='0'+mm
        }

        today = mm+'/'+dd+'/'+yyyy;

        var newArticulo = new articulo(titulo,id,contenido,img,tipo,lugar,today,imagenes);
        id++;

        var existe = false;
        for(var i=0; i<zonasAfectadas.length && !existe; i++){
            if(zonasAfectadas[i].nombre == lugar.nombre && zonasAfectadas[i].tipo == lugar.tipo){
                existe = true;
            }
        }

        if(!existe){
            zonasAfectadas.push(lugar);
        }
        articulos.push(newArticulo)
    },

    getNoticias: function () {
        return articulos;
    },

    getZonas: function(){
        return zonasAfectadas;
    },

    getNoticia:function (id) {
        for(var i = 0; i<articulos.length;i++){
            if(articulos[i].id == id){
                articulos[i].visitas++;
                return articulos[i];
            };
        }
    },

}