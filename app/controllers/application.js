import Controller from '@ember/controller';
import {inject} from '@ember/service';
import { computed } from '@ember/object';
import Config from '../models/config';
// PRUEBA DE GIT VERSION

export default Controller.extend({
  usersService : inject("user"),
  resources: null,
  selectedPage: "home",
  userName: "",
  password:"",

  estadoSecion: false,

  loggedIn: computed('userId','userFullName',function() {

  var token = document.cookie;         
      var token = document.cookie;      
      if(token == "" || token == "null"){
          return true;
      }
      else{          
      this.set('estadoSecion',true);
      var res = token.split(";");
      var id = res[0].split("=");
      var erp = res[1].split("=");
     
      Config.usuario_id = id[1]; 
      Config.usuario_id_erp = erp[1]; 
      this.transitionToRoute('/');
    }
    return false;    
  }),
  session: "",
  userId:"",
  userFullName:"",
  showCookies: false,

  actions: {
    acceptCookies(){
      var d = new Date();
      d.setTime(d.getTime() + (365*24*60*60*1000));
      var expires = "expires="+ d.toUTCString();
      document.cookie = "acceptCookies=true;" + expires + ";path=/";
      this.set("showCookies",false);
    },
    toogleLoginDiv(){
      $("#headerSeparator").toggle();
      $('#loginDiv').toggle();
    },
  
    submitKey(value, event) {      
      if (event.keyCode === 13) {        
        this.send("loginAction");   
      }
      if (event.keyCode === 38) {        
        this.set("password",'');    
      }      
    },

    clearKey(value, event) { 
      if (event.keyCode === 13) {        
        this.send("loginAction");   
      }     
      if (event.keyCode === 38) {        
        this.set("userName",'');
      }
    },

    loginAction(){
      var _this = this;
      var usersService = this.get("usersService");      
      var userName = this.get("userName");
      var password = this.get("password");

      // var encriptado = this.actions.encode(1233);
      // console.log("Numeros codificados", encriptado);
      
      usersService.login2(userName, password )
                .then(resultado=>{    
                    if(resultado.codigo != 0){
                        alertify.success("Bienvenido " + resultado.objeto.model.userName);                       
                        Config.usuario_id_erp = resultado.objeto.idErp.IdEmpleadoENDE;
                        Config.usuario_id = resultado.codigo;

                        

                        var expires = new Date();
                        // 1800000 30 minutos validez 
                        // 3600000 1 hora validez 
                        expires.setTime(expires.getTime() + 3600000); // Estableces el tiempo de expiración, genius
                        document.cookie = 'usuarioID='+resultado.codigo + ";expires=" + expires.toUTCString();
                        document.cookie = 'usuarioERP='+resultado.objeto.idErp.IdEmpleadoENDE + ";expires=" + expires.toUTCString();
                        
                        const state = this.get('estadoSecion');                        
                        this.set('estadoSecion', Config.estadoSecion );  
                        
                        this.transitionToRoute('/');
                        location.reload();                               
                    }
                    else{                        
                        alertify.error(resultado.mensaje);
                    }                                                                              
                })
                .catch(error=>{
                  alertify.error('Vuelva a intentarlo gracias');               
                });
            },

    
    logout(){
      const state = this.get('estadoSecion');
      this.set('estadoSecion', !state ); 
      Config.usuario_id = 0;      
    
      document.cookie = 'usuarioID' +'=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
      document.cookie = 'usuarioERP' +'=; expires=Thu, 01-Jan-70 00:00:01 GMT;';     
      
      location.reload();       
    },
    selectLanguage(language) {
      if (language == "es") {
        this.resourceLoader.loadInitialResources("es");
        this.set("selectedLanguage", this.resourceLoader.resourcesES.Spanish);
        this.set("language", "es");
        this.send("refreshRoute");

      } else {
        this.resourceLoader.loadInitialResources("en");
        this.set("selectedLanguage", this.resourceLoader.resourcesES.English);
        this.set("language", "en");
        this.send("refreshRoute");
      }
    },
    updatePath(path) {
      alert(path);
    },
    navigationAction: function (sender) {
      this.set("selectedPage", sender);
      switch (sender) {
        case "home":
          
          break;
        case "training":
          
          break;
        case "aboutus":
          
          break;
        case "trainingdevices":
          
          break;
        case "faq":
          
          break;
        case "contactus":
          
          break;
      }
    },







  








  }
});
