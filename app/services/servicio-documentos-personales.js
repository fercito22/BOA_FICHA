import Service from '@ember/service';

import $ from 'jquery'
import RSVP from 'rsvp';

import Config from '../models/config';

export default Service.extend({
    callDocumentosPersonales: function(){
        return new RSVP.Promise(function(resolve, reject){
            var parametros = {
                id: Config.usuario_id
           };
            var request = $.ajax({
                type: "GET",
                data: parametros,
                url: Config.serverpath + '/api/GetDocumentos/',
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
         console.log("Ingreso al servicio Nuevo Contacto Emergencia");
         console.log(form);
        return new RSVP.Promise(function(resolve,reject){
            var parametros = {
                empleadoID: Config.usuario_id ,
                DocumentoID: form.DocumentoID,
                Numero: form.Numero,
                FechaEmision: form.FechaEmision,
                FechaVencimiento: form.FechaVencimiento,
                Observacion: form.Observacion,
                ConAlerta: 1,
                Estado: "V",
                Referencia: form.Referencia,
                Identificador: 0
           };
            console.log("PARAMETROS SERVICIO");
            console.log(parametros);

          var request = $.ajax({
            type: 'POST',
            data: parametros,
            url: Config.serverpath + '/api/GetDocumentos',
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

    callDocumentosPersonalesEditar: function(formeditar){
        return new RSVP.Promise(function(resolve, reject){
             console.log("Ingreso al callDocumentosPersonalesEditar : ", formeditar);
            // console.log("**** USUARIO *****", Config.usuario_id);
            // console.log("**** DocumentoID *****", formeditar.DocumentoID);
            var parametros = {
                empleadoID: Config.usuario_id,
                DocumentoID: formeditar.DocumentoID,
                numero: formeditar.Numero,
                FechaEmision: formeditar.FechaEmision,
                FechaVencimiento: formeditar.FechaVencimiento,
                Observacion: formeditar.Observacion,
                ConAlerta: 1,
                Estado: 1,
                Referencia:formeditar.Referencia,
                Identificador: 1
           };
           //console.log("Parametros Editar ", parametros);
            var request = $.ajax({
                type: "POST",
                data: parametros,
                url: Config.serverpath + '/api/GetDocumentos/',
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
        // console.log("Ingreso al servicio ELIMINAR Documento ");
        // console.log(form);
        return new RSVP.Promise(function(resolve,reject){
            var parametros = {               
                empleadoID: Config.usuario_id ,
                DocumentoID: form.DocumentoID,
                Numero: form.TelefonoMedico,
                FechaEmision: form.NroCelularMedico,
                FechaVencimiento: form.AlergiasMedicas,
                Observacion: form.Medicamentos,
                ConAlerta: form.DireccionMedico,
                Referencia: form.GrupoSanquineo,
                Identificador: 3
           };
           console.log("PARAMETROS SERVICIO");
           console.log(parametros);

          var request = $.ajax({
            type: 'POST',
            data: parametros,
            url: Config.serverpath + '/api/GetDocumentos',
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
