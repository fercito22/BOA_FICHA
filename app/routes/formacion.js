import Route from '@ember/routing/route';
//import hasEmberVersion from 'ember-test-helpers/has-ember-version';

import {inject} from '@ember/service';
import Config from '../models/config';

export default Route.extend({
    beforeModel() {
        if(Config.usuario_id == 0){
            this.replaceWith('application');
        }
        else{
            this.replaceWith('formacion');
        }
      },
     valuesService: inject("perfil-servicio"),
     servicioBachiller: inject("servicio-bachiller"),
     servicioFormacionAcademica: inject("servicio-formacion-academica"),
     servicioCombo: inject("combos"),         
     formaV : true,
     bachillerV: true,
   
    model(){             
       var valuesService = this.get("valuesService");
       var servicioBachiller = this.get("servicioBachiller");
       var servicioFormacionAcademica = this.get("servicioFormacionAcademica");
       var servicioCombo = this.get("servicioCombo");
       
        var resultTotal = {};

        return valuesService.callPerfil()
            .then(resultado=>{
                resultTotal.resultPerfil= resultado;               
                return resultTotal;
            })   
            .then(resultTotal=>{
                return servicioBachiller.callBachiller()
                .then(resultado=>{
                    if(resultado.length == 0){
                        this.set('bachillerV',  false);  
                    }
                    else{
                        resultTotal.resultBachiller= resultado;
                    //  console.log("BACHILER");
                    //  console.log(resultTotal.resultBachiller);
                    }                    
                    return resultTotal;
                })
            })    
            .then(resultTotal=>{
                return servicioFormacionAcademica.callFormacionAcademica()
                    .then(resultado=>{
                        if(resultado.length == 0){
                            //resultTotal.resultFormacion = '';                            
                            this.set('formaV',  false);                              
                        }
                        else{
                            resultTotal.resultFormacion= resultado;
                            // console.log("Formacion");
                            // console.log(resultTotal.resultFormacion);
                        }
                        resultTotal.resultFormacion= resultado;
                    //    console.log("Formacion");
                    //    console.log(resultTotal.resultFormacion);
                        return resultTotal;
                    })
            })       
            .then(resultTotal=>{
                    return servicioCombo.callTipoColegio()
                        .then(resultado=>{
                            resultTotal.resultTipoColegio= resultado;
                        //    console.log("Colegio");
                        //    console.log("Tipo Colegio",resultTotal.resultTipoColegio);
                            return resultTotal;
                        })
                }) 
                .then(resultTotal=>{
                    return servicioCombo.callGradoColegio()
                        .then(resultado=>{
                            resultTotal.resultGradoColegio= resultado;
                          //  console.log("Grado Colegio",resultTotal.resultGradoColegio);
                            return resultTotal;
                        })
                })  
                .then(resultTotal=>{
                    return servicioCombo.callCombosNivelAcademico()
                    .then(resultado=>{
                        resultTotal.NivelAcademico= resultado;
                      //  console.log("TipoDocumento",resultTotal.NivelAcademico);
                        return resultTotal;
                    })
                  })
                
            .catch(()=>{
                return resultTotal;
            }); 
    },   
    
    // asignamos el modelo al controlador
    setupController(controller , model ){           
        this._super(controller, model);

        if(this.get('bachillerV') == true){
            this.controller.set('form.nombreColegio',  model.resultBachiller[0].NombreColegio);
            this.controller.set('form.lugar',  model.resultBachiller[0].Lugar);
            this.controller.set('form.tipoColegio',  model.resultBachiller[0].TipoColegio);
            this.controller.set('form.ultimoCursoVencido',  model.resultBachiller[0].UltimoCursoVencido);
            this.controller.set('form.Identificador',  model.resultBachiller[0].Identificador);
        }       
        
        
        if(model.resultFormacion.length == 0){          
            this.controller.set('formac.titulo',  '');
            this.controller.set('formac.institucion',  '');
            this.controller.set("formac.fechainicio",'');
            this.controller.set("formac.fechafin",'');
            controller.set('nuevosDatosTitulos',this.get('formaV'));
        }
        else{
            this.controller.set('formac.titulo',  model.resultFormacion[0].titulo);
            this.controller.set('formac.institucion',  model.resultFormacion[0].institucion);
            this.controller.set("formac.fechainicio",moment(model.resultFormacion[0].fechainicio).format('YYYY/MM/DD'));
            this.controller.set("formac.fechafin",moment(model.resultFormacion[0].fechafin).format('YYYY/MM/DD'));
        }
       
        controller.set('Bachiller',model.resultBachiller);
        controller.set('TipoColegio',model.resultTipoColegio);
        controller.set('GradoColegio',model.resultGradoColegio);
       
        controller.set('webapidata',model.resultPerfil);
        controller.set('webapidataE',model.resultBachiller);
        controller.set('webapidataF',model.resultFormacion);

        controller.set('FormacionAcademic',model.resultFormacion);        
        controller.set('NivelAcademico',model.NivelAcademico); 
    },
    actions: {
        refreshRoute: function () {
          this.refresh();
        }
      }
    
});


