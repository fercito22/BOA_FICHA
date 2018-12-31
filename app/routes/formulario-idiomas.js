import Route from '@ember/routing/route';
import {inject} from '@ember/service';

export default Route.extend({
//      formularioService: inject("idiomas-servicio"), 
//      servicioComboIdioma: inject("combos"),    

//      model() {
//         var formularioService = this.get("formularioService");
//         var servicioComboIdioma = this.get("servicioComboIdioma");
//       console.log("Datos formulario Perfil");               
//       var resultTotal = {};

//       return formularioService.callIdiomas()
//       .then(resultado=>{
//           resultTotal.Idioma= resultado;
//           console.log(resultTotal.Idioma);
//           return resultTotal;
//       })
//       .then(resultTotal=>{
//         return servicioComboIdioma.callCombosIdiomas()
//         .then(resultado=>{
//             resultTotal.resultIdiomaCombo= resultado;
//             console.log(resultTotal.resultIdiomaCombo);
//             return resultTotal;
//         })
//       })  
//       .then(resultTotal=>{
//         return servicioComboIdioma.callCombosNivelAcademico()
//         .then(resultado=>{
//             resultTotal.resultNivelAcademico= resultado;
//             console.log("Nivel Academico",resultTotal.resultNivelAcademico);
//             return resultTotal;
//         })
//     }) 
//       .catch(()=>{
//           return resultTotal;
//       });       
//   },

//      setupController(controller, model) {
//         console.log("Ingreso formulario Idioomas ruta");               
//         this._super(controller, model);
//         this.controller.set('formi.idiomaID',  model.Idioma[0].idiomaID);
//         this.controller.set('formi.lee',  model.Idioma[0].Lee);
//         this.controller.set('formi.habla',  model.Idioma[0].Habla);
//         this.controller.set('formi.escribe',  model.Idioma[0].Escribe);
//         this.controller.set('formi.Identificador',  model.Idioma[0].Identificador);

//         controller.set('webapidataPerfil',model.Idioma);
//         controller.set('webapidataNivelAcademico',model.NivelAcademico);
//         controller.set('webapidataComboIdioma',model.resultIdiomaCombo);
//       }
    
});


