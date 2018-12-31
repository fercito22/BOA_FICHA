import Route from '@ember/routing/route';
//import hasEmberVersion from 'ember-test-helpers/has-ember-version';

import {inject} from '@ember/service';

export default Route.extend({
     valuesService: inject("perfil-servicio"),
     servicioDocumentosPersonales: inject("servicio-documentos-personales"),
     servicioDocumentosPersonalesEditar: inject("servicio-documentos-personales"),
     servicioCombo: inject("combos"), 
   
    model(){
             
        var valuesService = this.get("valuesService");
        var servicioDocumentosPersonales = this.get("servicioDocumentosPersonales");
        var servicioDocumentosPersonalesEditar = this.get("servicioDocumentosPersonalesEditar");
        var servicioCombo = this.get("servicioCombo");
       
        var resultTotal = {};    

        return valuesService.callPerfil()
            .then(resultado=>{
                resultTotal.resultPerfil= resultado;
                console.log(resultTotal.resultPerfil);
                return resultTotal;
            })
            .then(resultTotal=>{
                return servicioDocumentosPersonales.callDocumentosPersonales()
                .then(resultado=>{
                    resultTotal.DocumentosPersonales= resultado;
                    console.log("Documentos Personales");
                    console.log(resultTotal.DocumentosPersonales);
                    return resultTotal;
                })
            })  
            //callDocumentosPersonalesEditar
            // .then(resultTotal=>{
            //     return servicioDocumentosPersonalesEditar.callDocumentosPersonalesEditar()
            //     .then(resultado=>{
            //         resultTotal.DocumentosPersonalesEditar= resultado;
            //         console.log("Documentos Personales Editar");
            //         console.log(resultTotal.DocumentosPersonalesEditar);
            //         return resultTotal;
            //     })
            // })             
            .then(resultTotal=>{
                return servicioCombo.callTipoDocumento()
                .then(resultado=>{
                    resultTotal.TipoDocumento= resultado;
                    console.log("TipoDocumento",resultTotal.TipoDocumento);
                    return resultTotal;
                })
            })
            .then(resultTotal=>{
                return servicioCombo.callCombosDepartamentosBolivia()
                .then(resultado=>{
                    resultTotal.DepartamentosBolivia= resultado;
                    console.log("DepartamentosBolivia",resultTotal.DepartamentosBolivia);
                    return resultTotal;
                })
            })
            .then(resultTotal=>{
                return servicioCombo.callCombosListaPaises()
                .then(resultado=>{
                    resultTotal.ListaPaises= resultado;
                    console.log("ListaPaises",resultTotal.ListaPaises);
                    return resultTotal;
                })
            })    
            .then(resultTotal=>{
                return servicioCombo.callCombosVacunas()
                .then(resultado=>{
                    resultTotal.CombosVacunas= resultado;
                    console.log("CombosVacunas",resultTotal.CombosVacunas);
                    return resultTotal;
                })
            })    
            .then(resultTotal=>{
                return servicioCombo.callTipoLicencia()
                .then(resultado=>{
                    resultTotal.TipoLicencia= resultado;
                    console.log("TipoLicencia",resultTotal.TipoLicencia);
                    return resultTotal;
                })
            })
            .catch(()=>{
                return resultTotal;
            }); 
    },   
    
    // asignamos el modelo al controlador
    setupController(controller , model ){          
//
         this._super(controller, model);
         this.controller.set('formeditar.DocumentoID',  model.DocumentosPersonalesEditar);
         this._super(controller, model);

         //this.controller.set("vFrom",model.DocumentosPersonales[0].FechaNacimiento);   
         this.controller.set("formeditar.FechaEmision",model.DocumentosPersonales[0].FechaEmision);   

         this.controller.set("vFrom",model.DocumentosPersonales[0].FechaEmision);  
         this.controller.set("vFrom2",model.DocumentosPersonales[0].FechaVencimiento);  



         //this.controller.set('formp.Nombre1',  model.resultPerfil[0].Nombre1);
         //console.log("Modelo" , model.DocumentosPersonalesEditar);
         //this.controller.set('formeditar.Numero',  model.DocumentosPersonalesEditar[0].NumeroDocumento);       
    //    this.controller.set("formeditar.FechaEmision",model.DocumentosPersonalesEditar[0].FechaEmision);
    //    this.controller.set("formeditar.FechaVencimiento",model.DocumentosPersonalesEditar[0].FechaVencimiento);       
    //    this.controller.set('formeditar.Observacion',  model.DocumentosPersonalesEditar[0].Observacion);
    //    this.controller.set('formeditar.Referencia',  model.DocumentosPersonalesEditar[0].Referencia);        

        //console.log("Ingresa controller" , controller.set('webapidata',model.resultA));           
        controller.set('webapidata',model.resultPerfil);  
        controller.set('webapidataDocumentos',model.DocumentosPersonales); 
        
        controller.set('DocumentosPersonales',model.DocumentosPersonales);        
        controller.set('TipoDocumento',model.TipoDocumento);
        controller.set('DepartamentosBolivia',model.DepartamentosBolivia);
        controller.set('ListaPaises',model.ListaPaises);
        controller.set('CombosVacunas',model.CombosVacunas);
        controller.set('TipoLicencia',model.TipoLicencia);             
        controller.set('DocumentosPersonalesEditar',model.DocumentosPersonalesEditar);             
    }
    
});


