import Controller from '@ember/controller';
import {inject} from '@ember/service';
import { match, not } from '@ember/object/computed';

import Validar from '../models/validaciones'
import { and } from '@ember/object/computed';

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

    //// **********     Formacion Academica
    formac:  {                                
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

    // **** VALIDACION ***
    mensajeErrorColegio: '',
    mensajeErrorLugar: '',

    nombreColegioVal: match('form.nombreColegio', Validar.textoMinMax),
    lugarVal: match('form.lugar', Validar.Direccion),   

    habilitarBachiller: and('nombreColegioVal','lugarVal' ),
    isDisabledBachiller: not('habilitarBachiller'), 

    tituloVal: match('formac.titulo', /^([A-Za-z0-9_. ]){7,50}$/),
    institucionVal: match('formac.institucion', /^[a-zA-Z ]+$/ ),
    fechainicioVal: match('fechainicio',  /^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/),

    habilitarFormaicon: and('tituloVal','institucionVal'), // 'fechainicioVal' ),
    isDisabledFormacion: not('habilitarFormaicon'), 
    

    // nombreCol: match('form.nombreColegio', Validar.texto),
    // maxMinCol: match('form.nombreColegio' , Validar.textoMinMax),
    // colegioValido: and('nombreCol', 'maxMinCol'),
    // nombreColegio: not('colegioValido'),     

    // lugarVal: match('form.lugar', Validar.texto),
    // maxMinlugar: match('form.lugar' , Validar.textoMinMax),
    // lugarValido: and('lugarVal', 'maxMinlugar'),    
    // estadoInvitado2: not('lugarVal'),    

    
    //caracteresValidos: match('formac.titulo', /^[0-9]+([.][0-9]{1,2})?$/ ),    
    //caracteresValidos: match('formac.titulo', Validar.textoMinMax),
    //tituloValido: and('tituloVal', 'caracteresValidos'),

    //tituloVal: match('titulo', /^[a-zA-Z ]+$/ ),
    ///^[0-9]+([.][0-9]{1,2})?$/
    
    //fechafinVal: match('formac.fechafin',  /^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/),
    //fechafinVal: match('fechafin',  /^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/),
    


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
                alertify.success(resultado.mensaje);            
                // alert(resultTotal.books.mensaje);                                                                
            })
            .catch(error=>{
                alertify.error(resultado.mensaje);
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
        }

    }   
    
});
