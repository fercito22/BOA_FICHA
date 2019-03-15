import Controller from '@ember/controller';
import {inject} from '@ember/service';
import { match, not } from '@ember/object/computed';
import Validar from '../models/validaciones'
import { and } from '@ember/object/computed';
import Ember from 'ember';

export default Ember.Controller.extend( {
    servicioFormulario: inject("servicio-bachiller"),
    servicioFormularioTitulo: inject("servicio-formacion-academica"),
    
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
        educacionSuperiorID: ''
    },
    formaN:  {                                
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
        visibleFormulario: false,
        nuevosDatosTitulos: true,        

    rhSanguineo:[{Code:1,Label:"+"},{Code:2,Label:"-"}],

    // **** VALIDACION ***
    mensajeErrorColegio: '',
    mensajeErrorLugar: '',

    nombreColegioVal: match('form.nombreColegio', Validar.textoMinMax),
    lugarVal: match('form.lugar', Validar.Direccion),   

    habilitarBachiller: and('nombreColegioVal','lugarVal' ),
    isDisabledBachiller: not('habilitarBachiller'), 

    mensajeErrorGradoTitulo: '',
    selectGrado: false,
    isDisabledTitulo: not('selectGrado'), 

    selectFechaFin: false,
    selectFechaIni: false,
    formValidTitulo: false,    
    

    tituloVal: match('formac.titulo', /^([A-Za-z0-9_. ]){7,50}$/),
    institucionVal: match('formac.institucion', /^[a-zA-Z ]+$/ ),
    fechainicioVal: match('fechainicio',  /^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/),

    habilitarFormaicon: and('tituloVal','institucionVal'), // 'fechainicioVal' ),
    //isDisabledFormacion: not('habilitarFormaicon'), 
    

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
    validateFieldsTitulo(){
       console.log("Ingreso validateFieldsTitulo "); 
        // if(this.get("titulo") == -1){
        //     //this.set("nivelHablaErrorMessage",resourceLoader.resourcesES.ThisFieldIsMandatory);
        //     this.set("formValidTitulo",false);
        // }
        // if(this.get("institucion") == -1){
        //     //this.set("nivelHablaErrorMessage",resourceLoader.resourcesES.ThisFieldIsMandatory);
        //     this.set("formValidTitulo",false);
        // }
        if(this.get("selectFechaIni") == false){
            //this.set("nivelHablaErrorMessage",resourceLoader.resourcesES.ThisFieldIsMandatory);
            this.set("formValidTitulo",false);
        }
        if(this.get("selectFechaFin") == false){
            //this.set("nivelHablaErrorMessage",resourceLoader.resourcesES.ThisFieldIsMandatory);
            this.set("formValidTitulo",false);
        }           
    },

    actions:{
        onGuardar(){
            const formularioService = this.get("form"); 
            //console.log("DAtos vbachiller", formularioService.ultimoCursoVencido);
            var tipoCol ='';
            var ultGra ='';
            if(this.get("tipoColegio") == -1){
                tipoCol= this.get('form.tipoColegio');
            }
            else{
                tipoCol = this.get("tipoColegio");
            }
            
            if(this.get("gradoColegio") == undefined){
                ultGra= this.get('form.ultimoCursoVencido');
            }
            else{
                ultGra = this.get("gradoColegio");
            }
            
            var userData = {                    
                tipoColegio: tipoCol,                    
                ultimoCursoVencido: ultGra,
                lugar : formularioService.lugar,
                nombreColegio: formularioService.nombreColegio
            };                          
            
            //console.log("userData", userData);                        
            var resultTotal = {};
            var servicioFormulario = this.get("servicioFormulario");            
            
            servicioFormulario.updateFormulario(userData)
            .then(resultado=>{                
                if(resultado.codigo == 1){
                    alertify.success(resultado.mensaje);
                      
                }  
                else{
                    alertify.error(resultado.mensaje);
                }
                this.send("refreshRoute");   
            })
            .catch(error=>{
                alertify.error(resultado.mensaje);
            });
        },  

        onGuardarTitulo(){           

            if(this.get("nivelAcademico") == undefined){
                this.set("mensajeErrorGradoTitulo", 'Debe seleccionar una grado academico');
            } 
            const FormularioTitulo = this.get("formaN");     
            
            var fecIni = '';
            var fecFin = '';
            
            if(this.get('selectFechaIni') == true ) {
                fecIni = this.get('fechainicio');
            }
            if(this.get('selectFechaFin') == true){
                fecFin = this.get('fechafin');
            }
                        
            var userData = {                            
                nivelAcademicoID: this.get("nivelAcademico"),
                titulo: FormularioTitulo.titulo,
                institucion: FormularioTitulo.institucion,
                fechainicio: fecIni,
                fechafin: fecFin
            };                          
            
             //console.log("userData", userData); 
             var servicioFormularioTitulo = this.get("servicioFormularioTitulo");            
             this.set("formValidTitulo",true);
 
             if(this.get("formValidTitulo")){
                servicioFormularioTitulo.newFormulario(userData)
                .then(resultado=>{
                    if(resultado.codigo == 1){
                        alertify.success(resultado.mensaje);  
                    }  
                    else{
                        alertify.error(resultado.mensaje);
                    } 
                    this.send("refreshRoute");                                                                
                })
                .catch(error=>{
                    alertify.error(resultado.mensaje);
                });
             }
        },
        

        onGuardarTituloEditar(){           


            if(this.get("nivelAcademico") == undefined){
                this.set("mensajeErrorGradoTitulo", 'Debe seleccionar una grado academico');
            } 
            const FormularioTitulo = this.get("formac");     
            
            var fecIni = '';
            var fecFin = '';
            //console.log("this.get('selectFechafechafin') == ", this.get('selectFechaFin'));
            //console.log("FormularioTitulo.fechafin == ", FormularioTitulo.fechafin);
            if(this.get('selectFechaIni') == true ) {
                fecIni = this.get('fechainicio');
            }
            else{
                fecIni = FormularioTitulo.fechainicio;
            }
            if(this.get('selectFechaFin') == true){
                console.log("Fecha fin : === ",this.get('fechafin'));
                fecFin = this.get('fechafin');
            }
            else{
                console.log("Fecha fin : === ",FormularioTitulo.fechafin);
                fecFin = FormularioTitulo.fechafin;
            }
            var nivel = 0;
            if(this.get("nivelAcademico") == undefined){
                nivel = FormularioTitulo.nivelAcademicoID;
            }
            else{
                nivel = this.get("nivelAcademico");
            }            
                        
            var userData = {                            
                nivelAcademicoID: nivel,
                titulo: FormularioTitulo.titulo,
                institucion: FormularioTitulo.institucion,
                fechainicio: fecIni,
                fechafin: fecFin,
                educacionSuperiorID: FormularioTitulo.educacionSuperiorID
            };                          
            
             console.log("userData Editar", userData); 
             var servicioFormularioTitulo = this.get("servicioFormularioTitulo");            
             this.set("formValidTitulo",true);
 
             if(this.get("formValidTitulo")){
                servicioFormularioTitulo.updateFormulario(userData)
                .then(resultado=>{
                    if(resultado.codigo == 1){
                        alertify.success(resultado.mensaje);  
                    }  
                    else{
                        alertify.error(resultado.mensaje);
                    } 
                    this.send("refreshRoute");                                                                
                })
                .catch(error=>{
                    alertify.error(resultado.mensaje);
                });
             }
        },
        
        idEditarTitulo(event){
            console.log("evento" , event);         
            
            this.set('selectFechaIni', false);
            this.set('selectFechaFin', false);
            this.set("formac.nivelAcademicoID", event.nivelAcademicoID);
            this.set("formac.titulo", event.titulo);
            this.set("formac.institucion", event.institucion);
            this.set("formac.fechainicio", event.fechainicio);
            this.set("formac.fechafin", event.fechafin);    
            this.set("formac.educacionSuperiorID", event.educacionSuperiorID);
        },
        //corrigiendo
        nuevoTitulo(){                       
            document.getElementById("miFormTituloID").reset();            
            console.log("Nuevo Titulo");

            this.set('selectFechaIni', false);
            this.set('selectFechaFin', false);
            //this.set("formac.nivelAcademicoID", null);
            this.set("formaN.titulo", '');
            this.set("formaN.institucion", '');
            this.set("formaN.fechainicio", '');
            this.set("formaN.fechafin", '');    
            //this.set("formac.educacionSuperiorID", null);

            console.log('titulo => ',this.get('formac.titulo'));
        },

        tipoColegioSelected(value){        
            this.set("tipoColegio",value);
        },

        gadoColegio(value){        
            this.set("gradoColegio",value);
        },
        nivelAcademicoSelected(value){            
            this.set("nivelAcademico",value);
            this.set("selectGrado",true);            
        },
        onFechaIni(data){    
            console.log(data);                    
           this.set("selectFechaIni",true);
           this.set("fechainicio", moment(data).format('YYYY/MM/DD'));
        },
        onFechaFin(data){     
            console.log("Ingreso la fecha ", moment(data).format('YYYY/MM/DD'));       
           this.set("selectFechaFin",true);
           this.set("fechafin", moment(data).format('YYYY/MM/DD'));
        },
        idEliminar(dato){           
            console.log("DATOS ELIMINAR ", dato);
            var servicioFormularioTitulo = this.get("servicioFormularioTitulo");
            servicioFormularioTitulo.deleteFormulario(dato)
            .then(resultado=>{     
                alertify.success("Se elimino corectamente.");
                this.send("refreshRoute");    
            })
            .catch(error=>{
                alertify.error(resultado.mensaje);
            });
        }
        
        

    }   
    
});
