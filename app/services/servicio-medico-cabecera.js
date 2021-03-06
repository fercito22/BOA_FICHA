import Service from '@ember/service';
import $ from 'jquery'
import RSVP from 'rsvp';
import Config from '../models/config';

export default Service.extend({
    callMedicoCabecera: function(){
        return new RSVP.Promise(function(resolve, reject){
            var parametros = {
                id: Config.usuario_id                             
           };
            var request = $.ajax({
                type: "GET",                
                data: parametros,
                url: Config.serverpath + '/api/GetMedicoCabecera/',
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
         console.log("Ingreso al servicio UPDATE Medico CAbecera");
         console.log(form);
        return new RSVP.Promise(function(resolve,reject){
            var parametros = {
                empleadoID: Config.usuario_id ,                
                NombreMedico: form.NombreMedico.toUpperCase(),
                TelefonoMedico: form.TelefonoMedico,
                Nrocelular: form.NroCelularMedico,
                AlergiasMedicas: form.AlergiasMedicas,
                Medicamentos: form.Medicamentos,
                DireccionMedico: form.DireccionMedico,
                GrupoSanquineo: form.GrupoSanquineo,
                RH_Sanguineo: form.RH_Sanguineo,
                Identificador: 2
           };
        //    console.log("PARAMETROS SERVICIO");
        //    console.log(parametros);                       
      
          var request = $.ajax({
            type: 'POST',            
            data: parametros,
            url: Config.serverpath + '/api/GetMedicoCabecera',
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
