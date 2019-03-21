import Controller from '@ember/controller';
import {inject} from '@ember/service';
import { match, not } from '@ember/object/computed';
import Validar from '../models/validaciones'
import Mensaje from '../models/mensajes-validacion'
import { and } from '@ember/object/computed';
import { or } from '@ember/object/computed';
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

    // // **** VALIDACION ***
    // mensajeErrorColegio: '',
    // mensajeErrorLugar: '',

    // nombreColegioVal: match('form.nombreColegio', Validar.textoMinMax),
    // lugarVal: match('form.lugar', Validar.Direccion),   

    // habilitarBachiller: and('nombreColegioVal','lugarVal' ),
    // isDisabledBachiller: not('habilitarBachiller'), 

    // mensajeErrorGradoTitulo: '',
    // selectGrado: false,
    // isDisabledTitulo: not('selectGrado'), 

    selectFechaFin: false,
    selectFechaIni: false,
    formValidTitulo: false,    
    

    // tituloVal: match('formac.titulo', /^([A-Za-z0-9_. ]){7,50}$/),
    // institucionVal: match('formac.institucion', /^[a-zA-Z ]+$/ ),
    // fechainicioVal: match('fechainicio',  /^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/),

    // habilitarFormaicon: and('tituloVal','institucionVal'), // 'fechainicioVal' ),
    // //isDisabledFormacion: not('habilitarFormaicon'), 
  
    

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


    //  --  formac  Modificar
    //  --  formaN  Nuevo
    //  -----   Formulario Nuevos Validacion
    selectGrado: false,    
    validateFieldsTituloN: true,
    validacionFechaCorrecta:true,    
    nombresTitulo: match('formaN.titulo', Validar.textoMinMax),        
    nombresinstitucion: match('formaN.institucion', Validar.textoMinMax),   
    fechainicioTitulo: match('fechainicio', Validar.fecAMD),   
    fechafinTitulo: match('fechafin', Validar.fecAMD),
    //fechaCorrecta: or('validacionFechaCorrecta','fechafinTitulo'),
    ValidacionTitulo: and('nombresTitulo' , 'nombresinstitucion', 'fechainicioTitulo', 'fechafinTitulo', 'validacionFechaCorrecta', 'selectGrado'),
    isDisabledTitulo: not('ValidacionTitulo'),
    //  -----   Mensajes Formulario Nuevos
    mensajeNombreTitulo: '',
    mensajeNombreInstituto: '',
    mensajeFechaInicio: '',
    mensajeFechaFin: '',
    mensajeGrado: '',       

    ///formac
    selectGradoE: false,    
    validateFieldsTituloE: true,
    validacionFechaCorrectaE:true,    
    nombresTituloE: match('formac.titulo', Validar.textoMinMax),        
    nombresinstitucionE: match('formac.institucion', Validar.textoMinMax),   
    fechainicioTituloE: match('fechainicio', Validar.fecAMD),   
    fechafinTituloE: match('fechafin', Validar.fecAMD),   
    ValidacionTituloE: and('nombresTituloE' , 'nombresinstitucionE', 'fechainicioTituloE', 'fechafinTituloE'),// 'validacionFechaCorrectaE', 'selectGradoE'),
    isDisabledTituloE: not('ValidacionTituloE'),

    mensajeFormulario: '',
    //isDisabledFechaInicio: true,

    actions:{
        clearFields(){
            this.set("validateFieldsTituloN",true);
            console.log("Limpiar Formulario");;
            this.set("mensajeNombreTitulo", '');
            this.set("mensajeNombreInstituto", '');
            this.set("mensajeFechaInicio", '');
            this.set("mensajeFechaFin", '');
            this.set("mensajeGrado", '');

            this.set("tipoColegio",null);    
            this.set("ultimoCursoVencido",null);
            this.set("fechainicio",null);    
            this.set("selectFechaFin",null);      
        },        

        validateFieldsTituloNuevo(){
            console.log("ValidacionTitulo: ", this.get("ValidacionTitulo"));
            console.log("Validar Grado:", this.get("selectGrado"));            
            if(this.get("ValidacionTitulo") != true || this.get("validacionFechaCorrecta") != true || this.get("selectGrado") != true){
                this.set("mensajeNombreTitulo", Mensaje.mensajeNombre);
                this.set("mensajeNombreInstituto", Mensaje.mensajeNombre);
                this.set("mensajeFechaInicio", Mensaje.mensajeFecha);
                this.set("mensajeFechaFin", Mensaje.mensajeFecha);
                this.set("validateFieldsTituloN", false);
                this.set("mensajeFormulario", Mensaje.mensajeFormularioInvalido);
                this.set("mensajeGrado", Mensaje.mensajeSelectable);
                if(this.get("validacionFechaCorrecta") != true){
                    console.log("Fechas Incorrectas");                         
                    this.set("validateFieldsTituloN", false);
                    this.set("mensajeFormulario", "Fechas no validas la fecha inicio debe ser Menor a la fecha Fin.");
                    //this.set("mensajeFechaFin", "La fecha fin debe ser mayor ala inicial.");
                    this.set("mensajeFechaFin", Mensaje.mensajeFecha);
                }
            }
            else{
                this.set("mensajeFormulario", "ok.");
            }            
            console.log("validateFieldsTituloN: ", this.get("validateFieldsTituloN"));
         },

         validateFieldsTituloEditar(){
            
            console.log("nombresTituloE: EDITAR ", this.get("nombresTituloE"));
            console.log("nombresinstitucionE: EDITAR ", this.get("nombresinstitucionE"));
            console.log("fechainicioTituloE: EDITAR ", this.get("fechainicioTituloE"));
            console.log("fechafinTituloE: EDITAR ", this.get("fechafinTituloE"));

            console.log("ValidacionTitulo: EDITAR ", this.get("ValidacionTituloE"));
            console.log("Validar Grado: EDITAR", this.get("selectGradoE"));            
            if(this.get("ValidacionTituloE") != true || this.get("validacionFechaCorrectaE") != true || this.get("selectGradoE") != true){
                this.set("mensajeNombreTitulo", Mensaje.mensajeNombre);
                this.set("mensajeNombreInstituto", Mensaje.mensajeNombre);
                this.set("mensajeFechaInicio", Mensaje.mensajeFecha);
                this.set("mensajeFechaFin", Mensaje.mensajeFecha);
                this.set("validateFieldsTituloN", false);
                this.set("mensajeFormulario", Mensaje.mensajeFormularioInvalido);
                this.set("mensajeGrado", Mensaje.mensajeSelectable);
                if(this.get("validacionFechaCorrectaE") != true){                         
                    this.set("validateFieldsTituloE", false);
                    this.set("mensajeFormulario", "Fechas no validas la fecha inicio debe ser Menor a la fecha Fin.");
                    
                }
            }
            else{
                this.set("mensajeFormulario", "ok.");
            }            
            console.log("validateFieldsTituloN: ", this.get("validateFieldsTituloN"));
         },


         //  Guardar Nuevo Titulo
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
             this.set("validateFieldsTituloN",true);
             
             this.send("validateFieldsTituloNuevo");

            //  if(this.get("validateFieldsTituloN") == true){
            //     console.log("Prueba de validacion: ");
            //     alertify.success(this.get("mensajeFormulario"));  
            //  }
            //  else{
            //     alertify.error(this.get("mensajeFormulario"));  
            //  }
             
             // Descomentar
             if(this.get("validateFieldsTituloN") == true){
                servicioFormularioTitulo.newFormulario(userData)
                .then(resultado=>{
                    if(resultado.codigo == 1){
                        alertify.success(this.get("mensajeFormulario"));  
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

             this.set("validateFieldsTituloE",true);             
             this.send("validateFieldsTituloEditar");
             
            //  console.log("Prueba de validacion:xx ", this.get("validateFieldsTituloE"));
            //  if(this.get("validateFieldsTituloE") == true){
            //     console.log("Prueba de validacion EDITAR: ", this.get("validateFieldsTituloE"));
            //     alertify.success(this.get("mensajeFormulario"));  
            //  }
            //  else{
            //     alertify.error(this.get("mensajeFormulario"));  
            //  }
             if(this.get("validateFieldsTituloE") == true){
                servicioFormularioTitulo.updateFormulario(userData)
                .then(resultado=>{
                    if(resultado.codigo == 1){
                        this.send("clearFields");
                        alertify.success(this.get("mensajeFormulario"));
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
            this.set("selectGradoE",true);
            //this.set("mensajeGrado", ''); 
            this.set('selectFechaIni', false);
            this.set('selectFechaFin', false);
            this.set("formac.nivelAcademicoID", event.nivelAcademicoID);
            this.set("formac.titulo", event.titulo);
            this.set("formac.institucion", event.institucion);
            this.set("formac.fechainicio", event.fechainicio);
            this.set("formac.fechafin", event.fechafin);    
            this.set("formac.educacionSuperiorID", event.educacionSuperiorID);

            this.set("fechainicioTituloE", true);
            this.set("fechafinTituloE", true);
        },

        
        //corrigiendo
        nuevoTitulo(){
            this.send("clearFields");                         
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


         /// Crear Colegio
        onGuardarBachiller(){
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

        

        tipoColegioSelected(value){        
            this.set("tipoColegio",value);
        },

        gadoColegio(value){        
            this.set("gradoColegio",value);
        },
        nivelAcademicoSelected(value){            
            this.set("nivelAcademico",value);
            this.set("selectGrado",true); 
            console.log("Nivel Academico ", value)           
        },
        onFechaIni(data){    
            console.log(data);                    
           this.set("selectFechaIni",true);
           this.set("fechainicio", moment(data).format('YYYY/MM/DD'));
           this.send("validarFechas");  
           //this.set("isDisabledFechaInicio",false);
        },
        onFechaFin(data){     
            console.log("Ingreso la fecha ", moment(data).format('YYYY/MM/DD'));       
           this.set("selectFechaFin",true);
           this.set("fechafin", moment(data).format('YYYY/MM/DD'));
           this.send("validarFechas");  
        },
        
        validarFechas(){                        
            if(this.get("fechainicio") < this.get("fechafin")){
                this.set("validacionFechaCorrecta",true);
                alertify.success("Fecha Correcta");
            }
            else{
                alertify.error("Fecha Inicio Debe ser Menor ala Fecha Fin.");
                this.set("validacionFechaCorrecta",false);   
                // this.set("fechainicioTitulo",false);
                // this.set("fechafinTitulo",false);
                // this.set("mensajeFechaInicio", Mensaje.mensajeFecha);
                // this.set("mensajeFechaFin", Mensaje.mensajeFecha);
            }                        
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
