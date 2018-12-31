import Route from '@ember/routing/route';
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
                    console.log("MEmo");
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
        controller.set('webapidataK',model.resultMemo);
    }    
});


