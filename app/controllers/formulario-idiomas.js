import Controller from '@ember/controller';
import {inject} from '@ember/service';

export default Controller.extend({
    servicioFormulario: inject("idiomas-servicio"),
    
    formi:  {        
        idiomaID: '',
        lee: '',
        habla : '',
        escribe: '',
        Identificador: ''
    },
    selectedIdioma: -1,
    nivelHabla: -1,
    nivelLee: -1,
    nivelEscribe: -1,

    idiomaCombo:[{Code:1,Label:"Español"},{Code:2,Label:"Quechua"},{Code:3,Label:"Aymara"},{Code:4,Label:"Ingles"}],
    idiomaNivel:[{Code:1,Label:"REGULAR"},{Code:2,Label:"BUENO"},{Code:3,Label:"Alto"}],
    servicioFormulario: inject("idiomas"),

    clearFields(){
        this.set("selectedIdioma",null);    
        this.set("nivelHabla",null);    
        this.set("nivelLee",null);    
        this.set("nivelEscribe",null);    
    },

    validateFields(){
        if(this.get("selectedIdioma") == -1){
            //this.set("nivelHablaErrorMessage",resourceLoader.resourcesES.ThisFieldIsMandatory);
            //this.set("formValid",false);
        }
        if(this.get("nivelHabla") == -1){
            //this.set("nivelHablaErrorMessage",resourceLoader.resourcesES.ThisFieldIsMandatory);
            //this.set("formValid",false);
        }
        if(this.get("nivelLee") == -1){
            //this.set("nivelHablaErrorMessage",resourceLoader.resourcesES.ThisFieldIsMandatory);
            //this.set("formValid",false);
        }  
        if(this.get("nivelEscribe") == -1){
            //this.set("nivelHablaErrorMessage",resourceLoader.resourcesES.ThisFieldIsMandatory);
            //this.set("formValid",false);
        }           
    },

    actions:{
        onGuardar(){            
                var userData = {                    
                    idioma: this.get("selectedIdioma"),                    
                    habla: this.get("nivelHabla"),
                    lee: this.get("nivelLee"),
                    escribe: this.get("nivelEscribe")
                };
            
            //console.log("userData", userData);            
            var resultTotal = {};
            var servicioFormulario = this.get("servicioFormulario");
            const formularioService = this.get("formi");            
            servicioFormulario.updateFormulario(userData)
            .then(resultado=>{                
                alertify.success(resultado.mensaje);                          
            })
            .catch(error=>{
                alertify.error(resultado.mensaje);
            });
        },  
        idiomaSelected(value){            
            //let selectedRow = this.get('formi');
            this.set("selectedIdioma",value);
        },
        nivelSelectedHabla(value){            
            this.set("nivelHabla",value);
        },
        nivelSelectedLee(value){          
            this.set("nivelLee",value);
        },
        nivelSelectedEscribe(value){
            this.set("nivelEscribe",value);
        }
    }   
    
});
