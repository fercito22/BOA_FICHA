import Route from '@ember/routing/route';
import {inject} from '@ember/service';
import Config from '../models/config';

export default Route.extend({
    beforeModel() {
        if(Config.usuario_id == 0){
            this.replaceWith('application');
        }
        else{
            this.replaceWith('documentos-personales');
        }
      },
     valuesService: inject("perfil-servicio"),
     servicioDocumentosPersonales: inject("servicio-documentos-personales"),
     servicioDocumentosPersonalesEditar: inject("servicio-documentos-personales"),
     servicioCombo: inject("combos"), 

     documentoV : true,
   
    model(){
             
        var valuesService = this.get("valuesService");
        var servicioDocumentosPersonales = this.get("servicioDocumentosPersonales");
        var servicioDocumentosPersonalesEditar = this.get("servicioDocumentosPersonalesEditar");
        var servicioCombo = this.get("servicioCombo");
       
        var resultTotal = {};    

        return valuesService.callPerfil()
            .then(resultado=>{
                resultTotal.resultPerfil= resultado;
                return resultTotal;
            })
            .then(resultTotal=>{
                return servicioDocumentosPersonales.callDocumentosPersonales()
                .then(resultado=>{
                    console.log("Documentos Personales", resultado.length);

                    if(resultado.length === 0){                                                          
                        this.set('documentoV',  false);                               
                    }
                    else{
                        resultTotal.DocumentosPersonales= resultado;
                        console.log("Documentos Personales");
                        console.log(resultTotal.DocumentosPersonales);                                              
                    } 
                    
                    return resultTotal;
                })
            })             
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
         

        controller.set('webapidata',model.resultPerfil);  
        if(this.get('documentoV') == true){

            this._super(controller, model);
            //this.controller.set('formeditar.DocumentoID',  model.DocumentosPersonalesEditar);         
            this._super(controller, model);         
            this.controller.set("formeditar.FechaEmision",model.DocumentosPersonales[0].FechaEmision);   
            this.controller.set("vFrom",model.DocumentosPersonales[0].FechaEmision);  
            this.controller.set("vFrom2",model.DocumentosPersonales[0].FechaVencimiento); 

            controller.set('webapidataDocumentos',model.DocumentosPersonales);         
            controller.set('DocumentosPersonales',model.DocumentosPersonales);        
                       
            //controller.set('DocumentosPersonalesEditar',model.DocumentosPersonalesEditar); 
        }

        controller.set('TipoDocumento',model.TipoDocumento);
            controller.set('DepartamentosBolivia',model.DepartamentosBolivia);
            controller.set('ListaPaises',model.ListaPaises);
            controller.set('CombosVacunas',model.CombosVacunas);
            controller.set('TipoLicencia',model.TipoLicencia);  
                    
    },
    
    actions: {
        refreshRoute: function () {
          this.refresh();
        }
      }
      
});


