
// import Route from '@ember/routing/route';

// export default Route.extend({
//     beforeModel() {
//         this.replaceWith('principal');
//       }
// });


import Controller from '@ember/controller';

import Route from '@ember/routing/route';
import {inject} from '@ember/service';
//import educacion from '../../controllers/educacion/educacion';

export default Route.extend({
    // beforeModel() {
    //     this.replaceWith('principal');
    //   },
      
      servicioBachiller: inject("servicio-bachiller"),
      servicioFormacionAcademica: inject("servicio-formacion-academica"), 
      servicioCombo: inject("combos"),       
   
    model(){            
        
       var servicioBachiller = this.get("servicioBachiller");
       var servicioFormacionAcademica = this.get("servicioFormacionAcademica");  

       //var formularioService = this.get("formularioService");
       var servicioCombo = this.get("servicioCombo");
        console.log("Datos formulario Perfil");     
        //var pruebaVar = this.get("servicioBachiller");
        //console.log("Prueba variable",pruebaVar);
       
        var resultTotal = {};
       // console.log("Ingresa");
      

        return servicioBachiller.callBachiller()
            .then(resultado=>{
                resultTotal.resultBachiller= resultado;
                console.log("BACHILER",resultTotal.resultBachiller);
                return resultTotal;
            })   
            .then(resultTotal=>{
                return servicioFormacionAcademica.callFormacionAcademica()
                .then(resultado=>{
                    resultTotal.resultFormacion= resultado;
                    console.log("Formacion");
                    console.log(resultTotal.resultFormacion);
                    return resultTotal;
                })
            })
            .then(resultTotal=>{
                return servicioCombo.callTipoColegio()
                .then(resultado=>{
                    resultTotal.resultTipoColegio= resultado;
                    console.log("Tipo Colegio",resultTotal.resultTipoColegio);
                    return resultTotal;
                })
              }) 
            .then(resultTotal=>{
            return servicioCombo.callGradoColegio()
            .then(resultado=>{
                    resultTotal.resultGradoColegio= resultado;
                    console.log("Grado Colegio",resultTotal.resultGradoColegio);
                    return resultTotal;
                })
            })  
            .then(resultTotal=>{
                return servicioCombo.callCombosNivelAcademico()
                .then(resultado=>{
                    resultTotal.NivelAcademico= resultado;
                    console.log("TipoDocumento",resultTotal.NivelAcademico);
                    return resultTotal;
                })
              })
            .catch(()=>{
                return resultTotal;
            }); 
    },   
    
    // asignamos el modelo al controlador
    setupController(controller , model ){            
        
        this.controller._super(controller, model);
        controller.set('form.nombreColegio', this);
        controller.set('form.nombreColegio', model.resultBachiller[0].NombreColegio);
        console.log("Ingreso");


        controller.set('form.nombreColegio',  model.resultBachiller[0].NombreColegio);

        console.log("Ingreso formulario Idioomas ruta");               
        this._super(controller, model);
        // this.controller.set('form.nombreColegio',  model.resultBachiller[0].NombreColegio);
        // this.controller.set('form.lugar',  model.resultBachiller[0].Lugar);
        // this.controller.set('form.tipoColegio',  model.resultBachiller[0].TipoColegio);
        // this.controller.set('form.ultimoCursoVencido',  model.resultBachiller[0].UltimoCursoVencido);
        // this.controller.set('form.Identificador',  model.resultBachiller[0].Identificador);

        // this.controller.set('form2.titulo',  model.resultFormacion[0].titulo);
        // this.controller.set('form2.institucion',  model.resultFormacion[0].institucion);
        // this.controller.set('form2.fechainicio',  model.resultFormacion[0].fechainicio);
        // this.controller.set('form2.fechafin',  model.resultFormacion[0].fechafin);

        controller.set('Bachiller',model.resultBachiller);
        controller.set('TipoColegio',model.resultTipoColegio);
        controller.set('GradoColegio',model.resultGradoColegio);

        controller.set('FormacionAcademic',model.resultFormacion);
        controller.set('NivelAcademico',model.NivelAcademico);
        
       
        controller.set('webapidataE',model.resultBachiller);
        controller.set('webapidataF',model.resultFormacion);
    }
    
});


