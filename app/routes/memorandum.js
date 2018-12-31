import Route from '@ember/routing/route';
//import hasEmberVersion from 'ember-test-helpers/has-ember-version';

import {inject} from '@ember/service';

export default Route.extend({
     valuesService: inject("perfil-servicio"),
     servicioMemorandum: inject("servicio-memorandum"),

    model(){
             
        var valuesService = this.get("valuesService");        
        var servicioMemorandum = this.get("servicioMemorandum");
       
        var resultTotal = {};
        return valuesService.callPerfil()
            .then(resultado=>{
                resultTotal.resultPerfil= resultado;
                console.log(resultTotal.resultPerfil);
                return resultTotal;
            })
            .then(resultTotal=>{
                return servicioMemorandum.callMemorandum()
                .then(resultado=>{
                    resultTotal.resultMemo= resultado;
                    console.log("Memo");
                    console.log(resultTotal.resultMemo);
                    return resultTotal;
                })
            }) 
            .catch(()=>{
                return resultTotal;
            }); 
    },   
    
    // asignamos el modelo al controlador
    setupController(controller , model ){     
        //console.log("Ingresa controller" , controller.set('webapidata',model.resultA));           
        controller.set('webapidata',model.resultPerfil);
        controller.set('webapidataK',model.resultMemo);
    }
});


