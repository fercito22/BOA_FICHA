import Route from '@ember/routing/route';
//import hasEmberVersion from 'ember-test-helpers/has-ember-version';

import {inject} from '@ember/service';
//import { inject as service } from '@ember/service';

export default Route.extend({
     formularioService: inject("perfil-servicio"),
     servicioCombo: inject("combos"),    
     //store: service(),

     model() {
        var formularioService = this.get("formularioService");
        var servicioCombo = this.get("servicioCombo");
      console.log("Datos formulario Perfil");      
      //return this.store.findAll('perfil');   
      var resultTotal = {};

      return formularioService.callPerfil()
      .then(resultado=>{
          resultTotal.resultPerfil= resultado;
          console.log(resultTotal.resultPerfil);
          return resultTotal;
      })
      .then(resultTotal=>{
        return servicioCombo.callEstadoCivil()
        .then(resultado=>{
            resultTotal.EstadoCivil= resultado;
            console.log("Estado Civil Combo: ", resultTotal.EstadoCivil);
            return resultTotal;
        })
      })    
      .catch(()=>{
          return resultTotal;
      }); 
      //return this.store.createRecord('formulario-perfil');      
  }
  ,

     setupController(controller, model) {
         console.log("Ingreso formulario perfil ruta formulario perfil");
        
        //  console.log(model);
        if(model.resultPerfil[0].LugarDeNacimiento == null){
            var Ciudad = "";
            var Pais = "";
        }
        else{
            var Ciudad = model.resultPerfil[0].LugarDeNacimiento.split('/')[0];
            var Pais = model.resultPerfil[0].LugarDeNacimiento.split('/')[1];
            console.log(Ciudad ,Pais);
        }        
       
        this._super(controller, model);
        this.controller.set('formp.Nombre1',  model.resultPerfil[0].Nombre1);
        this.controller.set('formp.Apellido1',  model.resultPerfil[0].Apellido1);
        this.controller.set('formp.Apellido2',  model.resultPerfil[0].Apellido2);
        //this.set("FechaVencimiento",moment(model.resultPerfil[0].FechaNacimiento).format('YYYY/MM/DD'));
        this.controller.set("formp.FechaVencimiento",model.resultPerfil[0].FechaNacimiento);
        console.log(model.resultPerfil[0].FechaNacimiento);
        this.controller.set("vFrom",model.resultPerfil[0].FechaNacimiento);    
        
        
        //var fecha = model.resultPerfil[0].FechaNacimiento;
        
              
        //this.controller.set("vFrom",model.resultPerfil[0].FechaNacimiento); 
        //var fecha2 = this.controller.get('vFrom');
        //console.log("Fecha Seleccionada Fin",  this.controller.get('vFrom'));
        //console.log("Fecha Seleccionada Fin",  moment(fecha2).format('MM/DD/YYYY'));  
       // this.controller.set("vFrom", fecha2);   
        //console.log("vForm", fecha);
            //console.log("vForm", moment(fecha).format('DD/MM/YYYY'));
        //this.controller.set("vFrom",model.resultPerfil[0].FechaNacimiento);        
        //var fecha = moment(this.controller.get('FechaVencimiento').format('MM/DD/YYYY'));
        //this.controller.set("vFrom", fecha);
        //console.log(" fecha vFrom",fecha);       
        
        
        // this.set("vFrom", model.resultPerfil[0].FechaNacimiento);
        // this.controller.set("vFrom", this.controller.get('formp.FechaVencimiento'));
        // console.log("formp.FechaVencimiento", this.controller.get('formp.FechaVencimiento'));
        // console.log("vFromdf", moment(this.controller.get('FechaVencimiento')).format('MM/DD/YYYY'));
        //this.controller.set("vFrom",moment(this.controller.get('formpFechaVencimiento')).format('YYYY/MM/DD'));

        //this.controller.set('vFrom',  model.resultPerfil[0].FechaNacimiento.format('YYYY/MM/DD'));

        
        this.controller.set('formp.Nacionalidad',  model.resultPerfil[0].Nacionalidad);
        
        this.controller.set('formp.CiudadNacimiento', Ciudad);
        this.controller.set('formp.LugarDeNacimiento', Pais);        
        this.controller.set('formp.Direccion',  model.resultPerfil[0].Direccion);
        this.controller.set('formp.EstadoCivil',  model.resultPerfil[0].EstadoCivil);




        controller.set('webapidataPerfil',model.resultPerfil);
        controller.set('ModeloEstadoCivil',model.EstadoCivil);
        console.log("***************");    
      }
    
});


