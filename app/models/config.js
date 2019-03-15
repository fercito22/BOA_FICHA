var fecha = new Date();
fecha = fecha.getFullYear();
//this.controller.set('fechaActual',  fecha); 


var config = {    
    serverpath: "http://localhost:5803",
    //           http://localhost/fichapersonal2
    //serverpath: "http://localhost/FichaPersonal",
    //serverpath: "http://sms.obairlines.bo/FichaPersonal2",
    
    //localpath: "http://localhost:51325",
    localpath: "http://localhost:5803",
    token:null,
    usuario_id: 0 , //7396, //280 , //5467  //15 7396 //280, 312
    usuario_id_erp: 0,
    fechaActual: fecha,
    Variable: 0,
    estadoSecion: true,
    fotografiaV: true
  }; 
  
  export default config