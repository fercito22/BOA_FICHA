import Service from '@ember/service';

import $ from 'jquery'
import RSVP from 'rsvp';

import Config from '../models/config';

export default Service.extend({
    callMemorandum: function(){
        return new RSVP.Promise(function(resolve, reject){
            var parametros = {
                id: Config.usuario_id                             
           };
            var request = $.ajax({
                type: "GET",     
                data: parametros,           
                url: Config.serverpath + '/api/GetMemo/', //42',
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
