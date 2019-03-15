
import Route from '@ember/routing/route';
import {inject} from '@ember/service';

import Config from '../models/config';

export default Route.extend({
    beforeModel() {
        if(Config.usuario_id == 0){
            this.replaceWith('application');
        }
        else{
            this.replaceWith('tallas');
        }
      },
    
      valuesService: inject("perfil-servicio"),
      servicioFotografia: inject("servicio-fotografia"), 
      servicioTallas: inject("servicio-tallas"), 
      servicioCombo: inject("combos"),        
   
    model(){
             
        var valuesService = this.get("valuesService");
        var servicioFotografia = this.get("servicioFotografia");
        var servicioTallas = this.get("servicioTallas");
        var servicioCombo = this.get("servicioCombo");       
        var resultTotal = {};

        return valuesService.callPerfil()
            .then(resultado=>{
                resultTotal.resultPerfil= resultado;
                //console.log("Perfil",resultTotal.resultPerfil);
                return resultTotal;
            })
            .then(resultTotal=>{
                return servicioTallas.callTallas()
                .then(resultado=>{              
                    resultTotal.resultTallas= resultado;
                    //console.log("Tallas",resultTotal.resultTallas);                  
                    return resultTotal;
                })
            })
            .then(resultTotal=>{
                return servicioTallas.callComboDetalleTallas()
                .then(resultado=>{                   
                    resultTotal.ComboDetalleTallas= resultado;
                    //console.log("ComboDetalleTallas",resultTotal.ComboDetalleTallas);                  
                    return resultTotal;
                })
            }) 
            .then(resultTotal=>{
                return servicioTallas.callDetalleTallas()
                .then(resultado=>{
                    resultado.objeto.forEach(element => {
                        var str= element.CodigoTran ;
                        element.CodigoTran  = str.replace("$$$",element.CantidadMovimiento);
                        if(element.EsExtra == false){
                            element.EsExtra = "NO";
                        }
                        else{
                            element.EsExtra = "SI";
                        }
                    });
                    resultTotal.resultDetalle= resultado.objeto;
                    //console.log("Detalle",resultTotal.resultDetalle);                  
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
        this.controller.set('fechaActual',  Config.fechaActual );         
        if(model.resultTallas.Validar == ""){            
            this.controller.set('desabilitado',  false ); 
            this.controller.set('isDisabledTallas',  false ); 
        }
        else{
            this.controller.set('desabilitado',  true ); 
            this.controller.set('isDisabledTallas',  true ); 
        }        

        this.controller.set('objeto2',  model.resultDetalle ); 
        controller.set('webapidata',model.resultPerfil);                
        controller.set('webapidataTallas',model.resultTallas);        
        controller.set('ComboTallasDetalle',model.ComboDetalleTallas);
        controller.set('webapidataTallasDetalle',model.resultDetalle);
    },
    actions: {
        refreshRoute: function () {
          this.refresh();
        }
      }    
});


