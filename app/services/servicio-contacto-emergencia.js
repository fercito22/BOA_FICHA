import Service from '@ember/service';
import $ from 'jquery'
import RSVP from 'rsvp';
import Config from '../models/config';

export default Service.extend({
    callContactoEmergencia: function(){
        return new RSVP.Promise(function(resolve, reject){
            var parametros = {
                id: Config.usuario_id                             
           };
            var request = $.ajax({
                type: "GET",                
                data:parametros,
                url: Config.serverpath + '/api/GetContactoEmergencia/',
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
        // console.log("Ingreso al servicio UPDATE Contacto Emergencia");
        // console.log(form);
        return new RSVP.Promise(function(resolve,reject){
            var parametros = {
               // tipo: 2,
                empleadoID: Config.usuario_id ,                
                NombreContacto: form.nombreContacto,
                Relacion: form.Relacion,
                Direccion: form.Direccion,
                TelefonoDomicilio: form.TelefonoDomicilio,
                DireccionTrabajo: form.DireccionTrabajo,
                TelefonoTrabajo: form.TelefonoTrabajo,
                NroCelular: form.NroCelular,                
                Identificador: 2
           };
        //    console.log("PARAMETROS SERVICIO");
        //    console.log(parametros);                       
      
          var request = $.ajax({
            type: 'POST',            
            data: parametros,
            url: Config.serverpath + '/api/GetContactoEmergencia',
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
