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
         console.log("Ingreso al servicio UPDATE Formacion Academica");
         console.log(form);
        return new RSVP.Promise(function(resolve,reject){
            var parametros = {
                empleadoID: Config.usuario_id ,                
                nivelAcademicoID: form.nivelAcademicoID,
                titulo: form.titulo,
                institucion: form.institucion,
                fechainicio: form.fechainicio,
                fechafin: form.fechafin,
                educacionSuperiorID: form.educacionSuperiorID,
                Identificador: 1
           };           
      
            var request = $.ajax({
            type: 'POST',            
            data: parametros,
            url: Config.serverpath + '/api/GetFormacionAcademica',
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

    newFormulario:function(form){
        // console.log("New Datos Titulo Servicio");
        // console.log(form);
        return new RSVP.Promise(function(resolve,reject){
            var parametros = {               
                empleadoID: Config.usuario_id,                
                nivelAcademicoID: form.nivelAcademicoID,
                titulo: form.titulo,
                institucion: form.institucion,
                fechainicio: form.fechainicio,
                fechafin: form.fechafin,
                educacionSuperiorID: 0,
                Identificador: 0
           };
        //    console.log("PARAMETROS SERVICIO");
        //    console.log(parametros);                             
          var request = $.ajax({
            type: 'POST',            
            data: parametros,
            url: Config.serverpath + '/api/GetFormacionAcademica',
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
         console.log("ELIMINAR Datos Titulo Servicio");
         console.log(form);
        return new RSVP.Promise(function(resolve,reject){
            var parametros = {               
                empleadoID: Config.usuario_id,                
                nivelAcademicoID: form.nivelAcademicoID,
                titulo: form.titulo,
                institucion: form.institucion,
                fechainicio: form.fechainicio,
                fechafin: form.fechafin,
                educacionSuperiorID: form.educacionSuperiorID,
                Identificador: 3
           };
        //    console.log("PARAMETROS SERVICIO");
        //    console.log(parametros);                             
          var request = $.ajax({
            type: 'POST',            
            data: parametros,
            url: Config.serverpath + '/api/GetFormacionAcademica',
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



    

});
