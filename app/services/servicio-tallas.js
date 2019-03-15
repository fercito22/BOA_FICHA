import Service from '@ember/service';

import $ from 'jquery'
import RSVP from 'rsvp';

import Config from '../models/config'

export default Service.extend({
    callTallas: function(){
        return new RSVP.Promise(function(resolve, reject){
            var parametros = {
                id: Config.usuario_id                             
           };
            var request = $.ajax({
                type: "GET",          
                data: parametros,      
                url: Config.serverpath + '/api/Tallas/',
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

    callDetalleTallas: function(form){        
        return new RSVP.Promise(function(resolve, reject){            
            var parametros = {
                empleadoID: Config.usuario_id  ,
                controlDotacionID: Config.Variable                          
           };
            var request = $.ajax({
                type: "POST",    
                data: parametros,                             
                url: Config.serverpath + '/api/Talla/Detalle',
               // contentType:'application/json',
            });

            request.done(function (response){
                resolve(response);
            });
            request.fail(function (response){
                reject(response);
            });
        });
    },

    callComboDetalleTallas: function(){
        
        return new RSVP.Promise(function(resolve, reject){
            var parametros = {
                id: Config.usuario_id                             
           };
            var request = $.ajax({
                type: "GET",    
                data: parametros,                             
                url: Config.serverpath + '/api/Combo/DetalleTallas',
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
        // console.log("Ingreso al servicio UPDATE Bachiller");
        // console.log(form);
        return new RSVP.Promise(function(resolve,reject){
            var parametros = {
                EmpleadoItemID: form.EmpleadoItemID ,
                codTalla: form.CodTalla,
                Talla: form.Talla,
           };
        //    console.log("PARAMETROS SERVICIO");
        //    console.log(parametros);                       
      
          var request = $.ajax({
            type: 'POST',            
            data: parametros,
            url: Config.serverpath + '/api/Tallas',
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
