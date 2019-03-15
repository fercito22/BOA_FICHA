import Route from '@ember/routing/route';
import {inject} from '@ember/service';
import Config from '../models/config';

export default Route.extend({
    beforeModel() {
        if(Config.usuario_id == 0){
            this.replaceWith('application');
        }
        else{
            this.replaceWith('beneficiario');
        }
      },
     formularioService: inject("servicio-declaracion"), 
     formularioServiceBeneficiario: inject("servicio-beneficiarios"), 
     servicioCombo: inject("combos"),    

     model() {
        var formularioService = this.get("formularioService");
        var formularioServiceBeneficiario = this.get("formularioServiceBeneficiario");
        var servicioCombo = this.get("servicioCombo");               
        var resultTotal = {};

      return formularioService.getDeclaracion()
      .then(resultado=>{
          resultTotal.Declaracion= resultado;        
          return resultTotal;
      })
      .then(resultTotal=>{
        return servicioCombo.callCombosParentesco()
        .then(resultado=>{
            resultTotal.Parentesco= resultado;          
            return resultTotal;
        })
      }) 
      .then(resultTotal=>{
        return formularioServiceBeneficiario.callBeneficiarios()
        .then(resultado=>{
            resultTotal.Beneficiario = resultado;  
            console.log("Beneficiarios", resultTotal.Beneficiario);        
            return resultTotal;
        })
      })     
  },

     setupController(controller, model) {
        controller.set('Declaracion',model.Declaracion);        
        controller.set('Parentesco',model.Parentesco);        
        controller.set('Beneficiario',model.Beneficiario);        
      },
      actions: {
        refreshRoute: function () {
          this.refresh();
        }
      }
    
});


