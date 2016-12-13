var user = function (name,id,intereses) {
    this.nombre = nombre;
    this.id = id;
    this.intereses = intereses;
};

var users = [];
var id = 0;

user.exports ={
    start: function() {
      this.newUser("juan",[]);

    },

    newUser: function (nombre,intereses) {
        var newUser = new user(nombre,id,intereses);
        id++;
        users.push(newUser);
    },


    addInterestToUser: function(id,interest){
        user[id].intereses.push(interest);
    },

    getZonas: function(){
        return zonasAfectadas;
    },

    getNoticia:function (id) {
        for(var i = 0; i<articulos.length;i++){
            if(articulos[i].id == id){
                articulos[i].visitas++;
                return articulos[i];
            }
        }
    },

}