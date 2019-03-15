import Route from '@ember/routing/route';
import {inject} from '@ember/service';

export default Route.extend({
     formularioService: inject("perfil-servicio"),
     servicioCombo: inject("combos"),         

     model() {
      var formularioService = this.get("formularioService");
      var servicioCombo = this.get("servicioCombo");
      var resultTotal = {};

      return formularioService.callPerfil()
      .then(resultado=>{
          resultTotal.resultPerfil= resultado;      
          return resultTotal;
      })
      .then(resultTotal=>{
        return servicioCombo.callEstadoCivil()
        .then(resultado=>{
            resultTotal.EstadoCivil= resultado;
            return resultTotal;
        })
      })    
      .catch(()=>{
          return resultTotal;
      });       
  }
  ,

     setupController(controller, model) {
        
        if(model.resultPerfil[0].LugarDeNacimiento == null){
            var Ciudad = "";
            var Pais = "";
        }
        else{
            var Ciudad = model.resultPerfil[0].LugarDeNacimiento.split('/')[0];
            var Pais = model.resultPerfil[0].LugarDeNacimiento.split('/')[1];        
        }        
       
        this._super(controller, model);
        this.controller.set('formp.Nombre1',  model.resultPerfil[0].Nombre1);
        this.controller.set('formp.Apellido1',  model.resultPerfil[0].Apellido1);
        this.controller.set('formp.Apellido2',  model.resultPerfil[0].Apellido2);        
        this.controller.set("formp.FechaVencimiento",model.resultPerfil[0].FechaNacimiento);       
        this.controller.set("vFrom",model.resultPerfil[0].FechaNacimiento);            
        this.controller.set('formp.Nacionalidad',  model.resultPerfil[0].Nacionalidad);
        
        this.controller.set('formp.CiudadNacimiento', Ciudad);
        this.controller.set('formp.LugarDeNacimiento', Pais);        
        this.controller.set('formp.Direccion',  model.resultPerfil[0].Direccion);
        this.controller.set('formp.EstadoCivil',  model.resultPerfil[0].EstadoCivil);
        controller.set('webapidataPerfil',model.resultPerfil);
        controller.set('EstadoCivil',model.EstadoCivil);
      }
    
});


