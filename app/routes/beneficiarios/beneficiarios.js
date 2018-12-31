import Route from '@ember/routing/route';
import {inject} from '@ember/service';

export default Route.extend({
    valuesService: inject("perfil-servicio"),
     servicioBeneficiarios: inject("servicio-beneficiarios"),
     servicioDeclaracion: inject("servicio-declaracion"),     
   
    model(){
             
        var valuesService = this.get("valuesService");
       var servicioBeneficiarios = this.get("servicioBeneficiarios");
       var servicioDeclaracion = this.get("servicioDeclaracion");
       
        var resultTotal = {};     

        return valuesService.callPerfil()
            .then(resultado=>{
                resultTotal.resultPerfil= resultado;
                console.log(resultTotal.resultPerfil);
                return resultTotal;
            })
            .then(resultTotal=>{
                return servicioBeneficiarios.callBeneficiarios()
                .then(resultado=>{
                    resultTotal.resultBeneficiarios= resultado;
                    console.log("Beneficiarios");
                    console.log(resultTotal.resultBeneficiarios);
                    return resultTotal;
                })
            })   
            .then(resultTotal=>{
                return servicioDeclaracion.getDeclaracion()
                .then(resultado=>{
                    resultTotal.resultDeclaracion= resultado;
                    console.log("Declaracion");
                    console.log(resultTotal.resultDeclaracion);
                    return resultTotal;
                })
            })     
            .catch(()=>{
                return resultTotal;
            }); 
    },   
    
    // asignamos el modelo al controlador
    setupController(controller , model ){
        controller.set('webapidataI',model.resultBeneficiarios);
        controller.set('webapidataL',model.resultDeclaracion);  
    }
    
});


