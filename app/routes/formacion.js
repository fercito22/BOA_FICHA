import Route from '@ember/routing/route';
//import hasEmberVersion from 'ember-test-helpers/has-ember-version';

import {inject} from '@ember/service';

export default Route.extend({
     valuesService: inject("perfil-servicio"),
     servicioBachiller: inject("servicio-bachiller"),
     servicioFormacionAcademica: inject("servicio-formacion-academica"),
     servicioCombo: inject("combos"),         
   
    model(){             
       var valuesService = this.get("valuesService");
       var servicioBachiller = this.get("servicioBachiller");
       var servicioFormacionAcademica = this.get("servicioFormacionAcademica");
       var servicioCombo = this.get("servicioCombo");
       
        var resultTotal = {};
       // console.log("Ingresa");
      

        return valuesService.callPerfil()
            .then(resultado=>{
                resultTotal.resultPerfil= resultado;
                console.log(resultTotal.resultPerfil);
                return resultTotal;
            })   
            .then(resultTotal=>{
                return servicioBachiller.callBachiller()
                .then(resultado=>{
                    resultTotal.resultBachiller= resultado;
                    console.log("BACHILER");
                    console.log(resultTotal.resultBachiller);
                    return resultTotal;
                })
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
                            console.log("Colegio");
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

        console.log("Ingreso formulario Idioomas ruta");               
        this._super(controller, model);
        this.controller.set('form.nombreColegio',  model.resultBachiller[0].NombreColegio);
        this.controller.set('form.lugar',  model.resultBachiller[0].Lugar);
        this.controller.set('form.tipoColegio',  model.resultBachiller[0].TipoColegio);
        this.controller.set('form.ultimoCursoVencido',  model.resultBachiller[0].UltimoCursoVencido);
        this.controller.set('form.Identificador',  model.resultBachiller[0].Identificador);

        this.controller.set('formac.titulo',  model.resultFormacion[0].titulo);
        this.controller.set('formac.institucion',  model.resultFormacion[0].institucion);
        this.controller.set("formac.fechainicio",moment(model.resultFormacion[0].fechainicio).format('YYYY/MM/DD'));
        this.controller.set("formac.fechafin",moment(model.resultFormacion[0].fechafin).format('YYYY/MM/DD'));
        //this.controller.set('formac.fechainicio',  model.resultFormacion[0].fechainicio);
        //this.controller.set('formac.fechafin',  model.resultFormacion[0].fechafin);
        


        controller.set('Bachiller',model.resultBachiller);
        controller.set('TipoColegio',model.resultTipoColegio);
        controller.set('GradoColegio',model.resultGradoColegio);


        //console.log("Ingresa controller" , controller.set('webapidata',model.resultA));           
        controller.set('webapidata',model.resultPerfil);
        controller.set('webapidataE',model.resultBachiller);
        controller.set('webapidataF',model.resultFormacion);

        controller.set('FormacionAcademic',model.resultFormacion);        
        controller.set('NivelAcademico',model.NivelAcademico); 
    }
    
});


