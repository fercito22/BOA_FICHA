import Route from '@ember/routing/route';
import {inject} from '@ember/service';

export default Route.extend({
     formularioService: inject("servicio-declaracion"), 
     servicioCombo: inject("combos"),    

     model() {
        var formularioService = this.get("formularioService");
        var servicioCombo = this.get("servicioCombo");
      console.log("Datos formulario documentos-personales");               
      var resultTotal = {};

      return formularioService.getDeclaracion()
      .then(resultado=>{
          resultTotal.Declaracion= resultado;
          console.log("documentos-Declaracion",resultTotal.Declaracion);
          return resultTotal;
      })
      .then(resultTotal=>{
        return servicioCombo.callCombosParentesco()
        .then(resultado=>{
            resultTotal.Parentesco= resultado;
            console.log("Parentesco",resultTotal.Parentesco);
            return resultTotal;
        })
      })
      
  },

     setupController(controller, model) {
        console.log("Ingreso formulario Documentos Personales ruta");   
        
        controller.set('Declaracion',model.Declaracion);        
        controller.set('Parentesco',model.Parentesco);        
      }
    
});


