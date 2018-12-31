import Controller from '@ember/controller';
import {inject} from '@ember/service';
import { match, not } from '@ember/object/computed';

export default Controller.extend({
    servicioFormulario: inject("servicio-bachiller"),
    
    form:  {                
        nombreColegio: '',
        lugar: '',
        tipoColegio: '',
        ultimoCursoVencido: '',
        Identificador: '',     
    },
    tipoColegio: -1,
    ultimoCursoVencido: -1, 
    
    nombreCol: match('form.nombreColegio', /^[a-zA-Z ]+$/),
    estadoInvitado: not('numerosva'),

    lugarVal: match('form.lugar', /^[a-zA-Z ]+$/),
    estadoInvitado2: not('lugarVal'),

    ///////////////////////////// **********************************

    form2:  {                                
        nivelAcademicoID: '',
        titulo: '',
        institucion: '',
        fechainicio: '',
        fechafin: '',
        Identificador: '',
    },
        nivelAcademicoID: -1,
        titulo: -1,
        institucion: -1,
        fechainicio: -1,
        fechafin: -1,
        Identificador: -1,
        
        visibleCiudad: false,
        visibleLicencia: false,
        visiblePaises: false,
        visibleVacuna: false,

        CheckBoxEstado: false,

    rhSanguineo:[{Code:1,Label:"+"},{Code:2,Label:"-"}],

    tituloVal: match('form.titulo', /^[a-zA-Z ]+$/ ),
    institucionVal: match('form.institucion', /^[a-zA-Z ]+$/ ),
    fechainicioVal: match('fechainicio',  /^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/),
    fechafinVal: match('form.fechafin',  /^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/),
    //FechaFinErrorMessage: not( 'fechafinVal' ),
    // numeroVal: match('form.Tipo_NroDocumento', /^[0-9]+$/ ),   

    //validarFechaIni: match('FechaEmision', /^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/),
    //FechaIniErrorMessage: not( 'validarFechaIni' ),
    
    










    clearFields(){
        this.set("tipoColegio",null);    
        this.set("ultimoCursoVencido",null);    
    },

    validateFields(){
        if(this.get("tipoColegio") == -1){
            //this.set("nivelHablaErrorMessage",resourceLoader.resourcesES.ThisFieldIsMandatory);
            //this.set("formValid",false);
        }
        if(this.get("ultimoCursoVencido") == -1){
            //this.set("nivelHablaErrorMessage",resourceLoader.resourcesES.ThisFieldIsMandatory);
            //this.set("formValid",false);
        }           
    },

    actions:{

        onGuardar2(){
            const formularioService = this.get("form2"); 
            
            var userData = {
                DocumentoID: this.get("nombreContacto"),
                Referencia: this.get("nombreContacto")                
            };                          
            
            console.log("userData", userData);            
            //alert(idioma , habla, lee, escribe);         
            console.log("Ingresa al controlador principal");
            var resultTotal = {};
            var servicioFormulario = this.get("servicioFormulario");
            
            console.log("Datos Contactos De Emergencia",formularioService);
            servicioFormulario.updateFormulario(userData)
            .then(resultado=>{
                console.log("controlador servicio");              
                // alert(resultTotal.books.mensaje);                                                                
            })
            .catch(error=>{
                // alert(resultTotal.books.mensaje); 
                
            });
        },


        onGuardar(){
            const formularioService = this.get("form"); 
            
            var userData = {                    
                tipoColegio: this.get("tipoColegio"),                    
                ultimoCursoVencido: this.get("ultimoCursoVencido"),
                lugar : formularioService.lugar,
                nombreColegio: formularioService.nombreColegio
            };                          
            
            console.log("userData", userData);            
            //alert(idioma , habla, lee, escribe);         
            console.log("Ingresa al controlador principal");
            var resultTotal = {};
            var servicioFormulario = this.get("servicioFormulario");
            
            console.log("Datos Bachiller",formularioService);
            servicioFormulario.updateFormulario(userData)
            .then(resultado=>{
                console.log("controlador servicio");              
                // alert(resultTotal.books.mensaje);                                                                
            })
            .catch(error=>{
                // alert(resultTotal.books.mensaje); 
                
            });
        },  
        tipoColegioSelected(value){
            console.log("Ingresa tipoColegio" , value);
            this.set("tipoColegio",value);
        },
        gadoColegioHabla(value){
            console.log("Ingresa gradoColegio" , value);
            this.set("gradoColegio",value);
        },

        nivelAcademicoSelected(value){
            console.log("Ingresa nivelAcademicoSelected" , value);
            this.set("nivelAcademico",value);
        },

        onFechaIni(data){
            //this.set("birthDateErrorMessage","");
            console.log("Fecha Seleccionada",  data);
           // this.set("FechaVencimiento",data);
           this.set("fechainicio", moment(data).format('YYYY/MM/DD'));
        },
        onFechaFin(data){
            //this.set("birthDateErrorMessage","");
            console.log("Fecha Seleccionada fin",  moment(data).format('YYYY/MM/DD'));
           // this.set("FechaVencimiento",data);
           this.set("fechafin", moment(data).format('YYYY/MM/DD'));
        },


    }   
    
});
