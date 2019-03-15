import RSVP from 'rsvp';
import $ from 'jquery';
import Service from '@ember/service';
import Config from '../models/config';

export default Service.extend({

    login2: function(userName,password){
        return new RSVP.Promise(function(resolve, reject){           

            var request = $.ajax({
                type: 'POST',            
                data:{
                    userName: userName,
                    Password: password
                },
                url: Config.serverpath + '/api/Usuario/',
                //url:  'http://localhost:36302/api/Usuario/'
              });

            request.done(function (response){
                resolve(response);
            });
            request.fail(function (response){
                reject(response);
            });
        });
    },
    login: function(userName,password) {
        return new RSVP.Promise(function(resolve,reject){
    
          var request = $.ajax({
            type: 'POST',            
            data:{
                userName: userName,
                Password: password
                // RememberMe: false,
                // returnUrl: 'www.url.com'
            },
            url: Config.serverpath + '/api/Usuario/',
            //url:  'http://localhost:36302/api/Usuario/'
          });
    
          request.done(function(response) {
            if(response.Error){
              reject(response.Error);
            }
            else{
              resolve(response.Result);
            }
          });
    
          request.fail(function(response) {
            reject(response.responseText);
          });
    
        });
      }    
});
