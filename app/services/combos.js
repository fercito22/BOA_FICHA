import Service from '@ember/service';
import $ from 'jquery'
import RSVP from 'rsvp';
import Config from '../models/config';

export default Service.extend({
   

    callCombosIdiomas: function(){
        var parametros = {
            id: Config.usuario_id                             
       };        
        return new RSVP.Promise(function(resolve, reject){
            var request = $.ajax({
                type: "GET", 
                data: parametros,                               
                url: Config.serverpath + '/api/Combo/ComboIdioma/',
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

    callCombosNivelAcademico: function(){
        
        return new RSVP.Promise(function(resolve, reject){
            var request = $.ajax({
                type: "GET",                                
                url: Config.serverpath + '/api/Combo/NivelAcademico',
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

    callCombosListaPaises: function(){
        
        return new RSVP.Promise(function(resolve, reject){
            var request = $.ajax({
                type: "GET",                                
                url: Config.serverpath + '/api/Combo/ListaPaises',
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

    callCombosParentesco: function(){
        
        return new RSVP.Promise(function(resolve, reject){
            var request = $.ajax({
                type: "GET",                                
                url: Config.serverpath + '/api/Combo/Parentesco',
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
    
    callCombosVacunas: function(){
        
        return new RSVP.Promise(function(resolve, reject){
            var request = $.ajax({
                type: "GET",                                
                url: Config.serverpath + '/api/Combo/Vacunas',
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

    callCombosAlergiasMedicas: function(){
        
        return new RSVP.Promise(function(resolve, reject){
            var request = $.ajax({
                type: "GET",                                
                url: Config.serverpath + '/api/Combo/AlergiasMedicas',
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

    callCombosDepartamentosBolivia: function(){
        
        return new RSVP.Promise(function(resolve, reject){
            var request = $.ajax({
                type: "GET",                                
                url: Config.serverpath + '/api/Combo/DepartamentosBolivia',
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

    callTipoLicencia: function(){
        
        return new RSVP.Promise(function(resolve, reject){
            var request = $.ajax({
                type: "GET",                                
                url: Config.serverpath + '/api/Combo/TipoLicencia',
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

    callFactorSanguineo: function(){
        
        return new RSVP.Promise(function(resolve, reject){
            var request = $.ajax({
                type: "GET",                                
                url: Config.serverpath + '/api/Combo/FactorSanguineo',
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

    callTipoColegio: function(){
        
        return new RSVP.Promise(function(resolve, reject){
            var request = $.ajax({
                type: "GET",                                
                url: Config.serverpath + '/api/Combo/TipoColegio',
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

    callGradoColegio: function(){
        
        return new RSVP.Promise(function(resolve, reject){
            var request = $.ajax({
                type: "GET",                                
                url: Config.serverpath + '/api/Combo/GradoColegio',
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

    callTipoDocumento: function(){
        
        return new RSVP.Promise(function(resolve, reject){
            var parametros = {
                id: Config.usuario_id                             
           }; 
            var request = $.ajax({
                type: "GET", 
                data: parametros,                                 
                url: Config.serverpath + '/api/Combo/TipoDocumento',
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

    callEstadoCivil: function(){
        
        return new RSVP.Promise(function(resolve, reject){
            var request = $.ajax({
                type: "GET",                                
                url: Config.serverpath + '/api/Combo/EstadoCivil',
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

    callComboComunicacion: function(){
        var parametros = {
            id: Config.usuario_id                             
       };        
        return new RSVP.Promise(function(resolve, reject){
            var request = $.ajax({
                type: "GET", 
                data: parametros,                               
                url: Config.serverpath + '/api/Combo/Comunicacion/',
                contentType:'application/json',
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
