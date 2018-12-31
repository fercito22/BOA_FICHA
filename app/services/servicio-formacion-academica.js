import Service from '@ember/service';

import $ from 'jquery'
import RSVP from 'rsvp';

import Config from '../models/config';

export default Service.extend({
    callFormacionAcademica: function(){
        return new RSVP.Promise(function(resolve, reject){
            var parametros = {
                id: Config.usuario_id                             
           };
            var request = $.ajax({
                type: "GET",        
                data: parametros,        
                url: Config.serverpath + '/api/GetFormacionAcademica/', //200',
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
        console.log("Ingreso al servicio UPDATE Contacto Emergencia");
        console.log(form);
        return new RSVP.Promise(function(resolve,reject){
            var parametros = {
               // tipo: 2,
                empleadoID: Config.usuario_id ,                
                nivelAcademicoID: form.nivelAcademicoID,
                titulo: form.titulo,
                institucion: form.institucion,
                fechainicio: form.fechainicio,
                fechafin: form.fechafin,
                Identificador: 2
           };
           console.log("PARAMETROS SERVICIO");
           console.log(parametros);                       
      
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
