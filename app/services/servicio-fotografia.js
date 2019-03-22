import Service from '@ember/service';

import $ from 'jquery'
import RSVP from 'rsvp';

import Config from '../models/config';
//import Config2 from 'md5';
import md5 from 'md5';
//import toBase64 from "ember-cli-base64-converter/computed/img-to-64";

export default Service.extend({
    callFotografia: function(){
        return new RSVP.Promise(function(resolve, reject){
            var parametros = {
                 id_funcionario : Config.usuario_id_erp //"53"//53" 2460
            };
             var pss = md5('sistema.dotaciones' /* key, raw */);  
             console.log("contraseña Cifrada",pss); 

                //var pss = md5('aaaaa');
              
                //var prefix = uniqid(pss);
                
                // var pss1 = Base64.encode(mcrypt.Encrypt('$$' + pss, undefined, pss, 'rijndael-256', 'ecb'));
                // console.log("PSS1 ", pss1);


        //      var t=function(){console.log("INGRESA EL PASSWORD ",a.default.passwordERP)
        //      var e=md5("sistema.dotaciones")
        //      console.log(e)
        //      var n=md5("pxp")
        //  return Base64.encode(mcrypt.Encrypt(n+"$$"+e,void 0,e,"rijndael-256","ecb"))}(),i=Ember.$.ajax({type:"POST",url:"http://erp.obairlines.bo/lib/rest/organigrama/Funcionario/urlFotoFuncionario",headers:{"content-type":"application/x-www-form-urlencoded","pxp-user":a.default.passwordERP,"php-auth-user":'\\"'+t+'\\"'},data:o,contentType:"application/json"})
 
        //       var avatarBase64 = Base64('avatarUrl');
        //       console.log("contraseña Cifrada Base64",avatarBase64); 

             //var avatarBase64 = toBase64('avatarUrl')
             //console.log("contraseña Cifrada",avatarBase64); 
            // function funcionPass() {
            //     var passt = 'sistema.dotaciones';
            //     var pss = md5('sistema.dotaciones' /* key, raw */);   
            //     //var pss = md5(passt);                
            //     var prefix = uniqid('pxp');
            //     console.log("Fotografias servicio", pss1);
            //     var pss1 = Base64.encode(mcrypt.Encrypt(prefix + '$$' + pss, undefined, pss, 'rijndael-256', 'ecb'));
                
            //     return pss1;
            // }
            
            // var credencial = funcionPass();
            //console.log("Credenciales Fotografia = ", credencial);
            console.log("parametros "+ parametros);
            var request = $.ajax({
                type: "POST",                
                //url: 'https://erpmobile.obairlines.bo/rest/organigrama/Funcionario/urlFotoFuncionario',
                url:'http://erp.obairlines.bo/lib/rest/organigrama/Funcionario/urlFotoFuncionario',
                //url: credencial,
                headers: {
                          "content-type": "application/x-www-form-urlencoded",
                          "pxp-user": "sistema.dotaciones",
                          "php-auth-user":"\\\"yYDOsv2ukd2ODiXYrGMyoUWxCPGriCEjpggzCZs5AhdStU0FKVYrcpRy93wRbbQS0T46oxUhfFIqmWUSe0qv6w==\\\""                          
                          //"sistema.dotaciones", //
                        },
                data: parametros,
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







// var settings = {
//     "async": true,
//     "crossDomain": true,
//     "url": "https://erpmobile.obairlines.bo/rest/organigrama/Funcionario/urlFotoFuncionario",
//     "method": "POST",
//     "headers": {
//       "content-type": "application/x-www-form-urlencoded",
//       "pxp-user": "sistema.dotaciones",
//       "php-auth-user": "\\\"yYDOsv2ukd2ODiXYrGMyoUWxCPGriCEjpggzCZs5AhdStU0FKVYrcpRy93wRbbQS0T46oxUhfFIqmWUSe0qv6w==\\\"",
//       "cache-control": "no-cache",
//       "postman-token": "6caefed1-291e-275a-afff-6b286c257e96"
//     },
//     "data": {
//       "id_funcionario": "280"
//     }
//   }
  
//   $.ajax(settings).done(function (response) {
//     console.log(response);
//   });