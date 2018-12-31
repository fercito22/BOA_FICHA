import Controller from '@ember/controller';
import {inject} from '@ember/service';

export default Controller.extend({
    servicioFormulario: inject("idiomas"),
    
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
            
            //if(this.get("formValid")){
                // var usersService = this.get("usersService");
                // var language = this.get("language");
                var userData = {
                    //FirstName : this.get("name"),                    
                    idioma: this.get("selectedIdioma"),                    
                    habla: this.get("nivelHabla"),
                    lee: this.get("nivelLee"),
                    escribe: this.get("nivelEscribe")
                };
            
            //console.log("Datos",value);
            // var idioma = this.get("selectedIdioma"); 
            // var habla = this.get("nivelHabla");
            // var lee = this.get("nivelLee");
            // var escribe = this.get("nivelEscribe");
            // if(idioma == null || idioma == undefined){
            //     console.log(idioma , habla, lee, escribe);
            //     idioma = a;
            // }
            console.log("userData", userData);
            
            //alert(idioma , habla, lee, escribe);         
            console.log("Ingresa al controlador principal");
            var resultTotal = {};
            var servicioFormulario = this.get("servicioFormulario");
            const formularioService = this.get("formi"); 
            console.log("Datos",formularioService);
            servicioFormulario.updateFormulario(userData)
            .then(resultado=>{
                console.log("controlador servicio");              
                // alert(resultTotal.books.mensaje);                                                                
            })
            .catch(error=>{
                // alert(resultTotal.books.mensaje); 
                
            });
        },  
        idiomaSelected(value){
            //console.log('selected state: ' + state);
            let selectedRow = this.get('formi');
            console.log('dayRow before: ' + selectedRow.value);
            // this.get('dayRow').set('state', state);
            // console.log('dayRow after: ' + selectedRow.state);

            console.log("Ingresa selectable" , value);
            this.set("selectedIdioma",value);
        },
        nivelSelectedHabla(value){
            console.log("Ingresa nivel-habla" , value);
            this.set("nivelHabla",value);
        },
        nivelSelectedLee(value){
            console.log("Ingresa selectable-nivel-lee" , value);
            this.set("nivelLee",value);
        },
        nivelSelectedEscribe(value){
            console.log("Ingresa selectable-nivel-escribe" , value);
            this.set("nivelEscribe",value);
        }

    }

   
    
});
