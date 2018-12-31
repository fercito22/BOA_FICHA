var fecha = new Date();
fecha = fecha.getFullYear();
//this.controller.set('fechaActual',  fecha); 


var config = {
    // serverpath: "http://192.168.11.76/CEACServer",
    serverpath: "http://localhost:5803",
    // localpath: "http://192.168.11.76/CEACPortal",
    localpath: "http://localhost:51325",
    token:null,
    usuario_id: 280 , //5467  //15 //7396 //280,
    fechaActual: fecha,
    Variable: 0
  };


  
  
  export default config