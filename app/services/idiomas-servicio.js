import Service from '@ember/service';
import $ from 'jquery'
import RSVP from 'rsvp';
import Config from '../models/config';

export default Service.extend({
    callIdiomas: function(){
        var parametros = {
            id: Config.usuario_id                             
       };
        return new RSVP.Promise(function(resolve, reject){
            var request = $.ajax({
                type: "GET",                
                data: parametros,
                url: Config.serverpath + '/api/GetIdiomas/',
                contentType:'application/json',
            });

            request.done(function (response){
                resolve(response);
            });
            request.fail(function (response){
                reject(response);
            });
        });
    },
    
    updateFormulario:function(form){
        //console.log("Ingreso al servicio UPDATE IDIOMAS");
        //console.log(form);
        return new RSVP.Promise(function(resolve,reject){
            var parametros = {               
                empleadoID: Config.usuario_id ,                
                idiomaID: form.idioma,
                Lee: form.lee,
                Habla: form.habla,
                Escribe: form.escribe,
                Identificador: 2
           };
        //    console.log("PARAMETROS SERVICIO");
        //    console.log(parametros);                       
      
          var request = $.ajax({
            type: 'POST',            
            data: parametros,
            url: Config.serverpath + '/api/GetIdiomas',
            //contentType:'application/json',
          });          

        request.done(function (response){
            resolve(response);
        });
        request.fail(function (response){
            reject(response);
        });        
     });
    },

    deleteFormulario:function(form){
        // console.log("Ingreso al servicio Elimina IDIOMAS");
        // console.log(form);
        return new RSVP.Promise(function(resolve,reject){
            var parametros = {                
                 empleadoID: Config.usuario_id ,                
                 idiomaID: form.idiomaID,
                 Lee: form.lee,
                 Habla: form.habla,
                 Escribe: form.escribe,
                 Identificador: 3
            };
        //    console.log("PARAMETROS SERVICIO Eliminado");
        //    console.log(parametros);                             
          var request = $.ajax({
            type: 'POST',            
            data: parametros,
            url: Config.serverpath + '/api/GetIdiomas',
            //contentType:'application/json',
          });          

        request.done(function (response){
            resolve(response);
        });
        request.fail(function (response){
            reject(response);
        });        
     });
    } 
});
