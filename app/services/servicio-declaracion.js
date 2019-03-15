import Service from '@ember/service';
import $ from 'jquery'
import RSVP from 'rsvp';

import Config from '../models/config';

export default Service.extend({
    getDeclaracion: function(){
        return new RSVP.Promise(function(resolve, reject){
            var parametros = {
                id: Config.usuario_id                             
           };
            var request = $.ajax({
                type: "GET",
                data: parametros,
                url: Config.serverpath + '/api/GetDeclaracion/',
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
        // console.log("Ingreso al servicio UPDATE declaracion");
        // console.log(form);
        var tipo = 0;
        if(form.datosFamiliaresID == null){
            tipo = 0;
        }
        return new RSVP.Promise(function(resolve,reject){
            var parametros = {    
               empleadoID: Config.usuario_id,            
               datosFamiliaresID: form.datosFamiliaresID,                
               parentescoID: form.parentescoID,
               Nombres: form.Nombres,
               Apellido1: form.Apellido1,
               Apellido2: form.Apellido2,
               Tipo_NroDocumento: form.Tipo_NroDocumento,               
               Estado: 1,                
               Finado: form.Finado,                 
               Identificador: 2    
           };
        //    console.log("PARAMETROS SERVICIO");
        //    console.log(parametros);                             
          var request = $.ajax({
            type: 'POST',            
            data: parametros,
            url: Config.serverpath + '/api/Beneficiarios',
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


    nuevoFormulario:function(form){
        // console.log("Ingreso al servicio NUEVA DECLARACION *");
        // console.log(form);
        var tipo = 0;
        if(form.datosFamiliaresID == null){
            tipo = 0;
        }
        
        return new RSVP.Promise(function(resolve,reject){
            var parametros = {    
               empleadoID: Config.usuario_id,            
               datosFamiliaresID: form.datosFamiliaresID,                
               parentescoID: form.parentescoID,
               Nombres: form.Nombres,
               Apellido1: form.Apellido1,
               Apellido2: form.Apellido2,
               Tipo_NroDocumento: form.Tipo_NroDocumento,               
               Estado: 1,                
               Finado: form.Finado,                 
               Identificador: 2    
           };
        //    console.log("PARAMETROS SERVICIO");
        //    console.log(parametros);                       
      
          var request = $.ajax({
            type: 'POST',            
            data: parametros,
            url: Config.serverpath + '/api/Beneficiarios',
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
        // console.log("Ingreso al servicio ELIMINAR declaracion");
        // console.log(form);       
        return new RSVP.Promise(function(resolve,reject){
            var parametros = {    
               empleadoID: Config.usuario_id,            
               datosFamiliaresID: form.datosFamiliaresID,                
               parentescoID: form.parentescoID,
               Nombres: form.Nombres,
               Apellido1: form.Apellido1,
               Apellido2: form.Apellido2,
               Tipo_NroDocumento: form.Tipo_NroDocumento,               
               Estado: 1,                
               Finado: form.Finado,                 
               Identificador: 3    
           };
        //    console.log("PARAMETROS SERVICIO");
        //    console.log(parametros);                       
      
          var request = $.ajax({
            type: 'POST',            
            data: parametros,
            url: Config.serverpath + '/api/Beneficiarios',
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
