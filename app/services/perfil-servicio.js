import Service from '@ember/service';

import $ from 'jquery'
import RSVP from 'rsvp';

import Config from '../models/config';

export default Service.extend({
    callPerfil: function(){
        return new RSVP.Promise(function(resolve, reject){
            var parametros = {
                id: Config.usuario_id                             
           };
            var request = $.ajax({
                type: "GET",                
                data: parametros,
                url: Config.serverpath + '/api/GetPerfilCom/',
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
        console.log("Ingreso al servicio UPDATE");
        console.log(form);
        return new RSVP.Promise(function(resolve,reject){
            var parametros = {
                tipo: 2,
                empleadoID: Config.usuario_id ,                
                Nombre1: form.Nombre1,
                Apellido1: form.Apellido1,
                Apellido2: form.Apellido2,
                FechaNacimiento: form.FechaNacimiento,
                Nacionalidad: form.Nacionalidad,
                LugarDeNacimiento: form.LugarDeNacimiento,  
                CiudadNacimiento: form.CiudadNacimiento,                              
                Direccion: form.Direccion,
                EstadoCivil: form.EstadoCivil
           };
           console.log("PARAMETROS SERVICIO");
           console.log(parametros);            
           console.log(Config.serverpath );
      
          var request = $.ajax({
            type: 'POST',            
            data: parametros,
        //     data: {
        //         tipo: 2,
        //         empleadoID: Config.usuario_id ,                
        //         Nombre1: form.Nombre1,
        //         Apellido1: form.Apellido1,
        //         // Apellido2: form.Apellido2,
        //         FechaNacimiento: form.FechaNacimiento,
        //         Nacionalidad: form.Nacionalidad,
        //         LugarDeNacimiento: form.LugarDeNacimiento,  
        //         CiudadNacimiento: form.CiudadNacimiento,                              
        //         Direccion: form.Direccion,
        //         EstadoCivil: 1
        //    } ,
            url: Config.serverpath + '/api/GetPerfilCom',
            //contentType:'application/json',
          });          

        request.done(function (response){
            console.log(response);
            resolve(response);
        });
        request.fail(function (response){
            reject(response);
        });
        
    });
}   ,

    updateFormularioComunicacion:function(form){
        console.log("Ingreso al servicio UPDATE COMUNICACION ");
        console.log(form);
        return new RSVP.Promise(function(resolve,reject){
            var parametros = {                
                empleadoID: Config.usuario_id ,                
                tipoComunicacionID: form.tipoComunicacionID,
                Valor: form.Valor
        };
        console.log("PARAMETROS SERVICIO");
        console.log(parametros);            
        console.log(Config.serverpath );
    
        var request = $.ajax({
            type: 'POST',            
            data: parametros,
            url: Config.serverpath + '/api/GetComunicacion',
            //contentType:'application/json',
        });          

        request.done(function (response){
            console.log(response);
            resolve(response);
        });
        request.fail(function (response){
            reject(response);
        });        
    });
    },
    
    

    updateFormularioMedico:function(form){
        console.log("Ingreso al servicio UPDATE Contacto Emergencia");
        console.log(form);
        return new RSVP.Promise(function(resolve,reject){
            var parametros = {
               // tipo: 2,
                empleadoID: Config.usuario_id ,                
                NombreMedico: form.NombreMedico,
                TelefonoMedico: form.TelefonoMedico,
                NroCelularMedico: form.NroCelularMedico,
                AlergiasMedicas: form.AlergiasMedicas,
                Medicamentos: form.Medicamentos,
                DireccionMedico: form.DireccionMedico,
                GrupoSanquineo: form.GrupoSanquineo,
                RH_Sanguineo: form.RH_Sanguineo,
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

