import Controller from '@ember/controller';
import {inject} from '@ember/service';
import { match, not } from '@ember/object/computed';

//import EmberValidations from 'ember-validations';

//import EmberValidator from 'ember-validator';

import Validar from '../models/validaciones'
import { and } from '@ember/object/computed';

import Ember from 'ember';
  
export default Ember.Controller.extend( {
    servicioFormulario: inject("servicio-documentos-personales"),

//   Numero: false,
//   validations: {   
//         Numero: {
//         length: { minimum: 5, maximum: 20}
//         }
//     },
    

    form:  {                                
        DocumentoID: '',
        Numero: '',
        FechaEmision: '',
        FechaVencimiento: '',
        Observacion: '',
        ConAlerta: '',
        Referencia: '',
        DocumentoPersonalID: '',    
        Identificador: '',  
    },
    formeditar:  {                                
        DocumentoID: '',
        Numero: '',
        FechaEmision: '',
        FechaVencimiento: '',
        Observacion: '',
        ConAlerta: '',
        Referencia: '',
        DocumentoPersonalID: '',    
        Identificador: '',  
    },
        DocumentoID: -1,
        Numero: -1,
        FechaEmision: -1,
        FechaVencimiento: -1,
        Observacion: '',
        ConAlerta: -1,
        Referencia: -1,  
        DocumentoPersonalID: -1,  
        Identificador: -1,
        
        visibleCiudad: false,
        visibleLicencia: false,
        visiblePaises: false,
        visibleVacuna: false,

        CheckBoxEstado: false,

        formValid: false,

        vFrom: '11-8-2018', 

        mensajeErrorTexto: '',
        mensajeErrorObservacion: '',
        mensajeErrorFecFin: '',
        mensajeErrorFecIni: '',
        mensajeErrorSelectDoc: '',
        mensajeErrorSelectRef: '',        
        selectValidoDoc: false,
        selectValidoRef: false,        

        DocumentoID: -1,
        Numero: -1,
        FechaEmision: -1,
        FechaVencimiento: -1,
        Observacion: '',
        ConAlerta: -1,
        Referencia: -1,  
        DocumentoPersonalID: -1,  
        Identificador: -1,
    
        NumeroValido: match('form.Numero',Validar.TextNum),        
        FechaIniValido: match('FechaEmision', Validar.fecAMD),
        FechaFinValido: match('FechaVencimiento', Validar.fecAMD),
        observacionval: match('form.Observacion', Validar.texto),

        NumeroValido2: match('formeditar.Numero',Validar.TextNum),        
        FechaIniValido: match('FechaEmision', Validar.fecAMD),
        FechaFinValido: match('FechaVencimiento', Validar.fecAMD),
        observacionval: match('formeditar.Observacion', Validar.texto),

        habilitar: and('NumeroValido' ,  'FechaIniValido', 'FechaFinValido' , 'selectValidoDoc' ),
        isDisabled: not('habilitar'),        
        

    // // //http://w3.unpocodetodo.info/utiles/regex-ejemplos.php?type=fechas
    // validarFechaIni: match('FechaEmision', /^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/),
    // //FechaIniErrorMessage: not( 'validarFechaIni' ),    
    // validarFechaFin: match('FechaVencimiento', /^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/),
    // //FechaFinErrorMessage: not( 'validarFechaFin' ),

    // //validarObservacion: match('formeditar.Observacion', Validar.texto),

    clearFields(){
        this.set("mensajeErrorTexto","");                
        this.set("mensajeErrorObservacion","");
        this.set("mensajeErrorFecFin","");
        this.set("mensajeErrorFecIni","");
        this.set("mensajeErrorSelectDoc","");
        this.set("mensajeErrorSelectRef","");  
    },

    actions:{
        validateFields(){
            console.log("Ingreso al validador" , this.get("Numero") );
            
            // if(this.get("Nombre1") == -1){
            //     this.set("mensajeErrorTexto", Validar.mensajeTexto);
            //     //this.set("formValid",false);
            // }

            if(this.get("Numero") == -1){
                console.log("Validate Fields Ingreso");
                //this.set("mensajeErrorTexto2","No es valido el numero");
                this.set("formValid",false);
                this.set("mensajeErrorTexto",Validar.mensajeNumeros);               
            }
            // console.log("Numero del editar #####",this.get("Numero"));
            // if(this.get("formeditar.Numero") == ""){
            //     console.log("Validate Fields Ingreso numero 2");
            //     this.set("mensajeErrorTexto","No es valido el numero");
            //     this.set("formValid",false);
            // }
           
            if(this.get("FechaVencimiento") == -1){
                //this.set("FechaFinErrorMessage","No es valido la fecha fin");
                this.set("formValid",false);
                this.set("mensajeErrorFecFin",Validar.mensajeFecha);                  
            }    
            
            if(this.get("FechaEmision") == -1){
                console.log("FECHA NACIMIENTO ---- ", this.get("FechaNacimiento"));
                //this.set("mensajeErrorFechaEmnicion", Validar.mensajeFecha);
                this.set("formValid",false);
                this.set("mensajeErrorFecIni",Validar.mensajeFecha);                
            }
            console.log("*** *** observacionval *** ****", this.get("observacionval"));
            console.log("*** *** observacionval *** ****", this.get("Observacion"));
            // if( this.get("Observacion" ) ==  -1 ){
            //     if(this.get("observacionval") == false){
            //         //this.get("observacionval") == false &&
            //         console.log("FECHA NACIMIENTO ---- ", this.get("FechaNacimiento"));
            //         //this.set("mensajeErrorFechaEmnicion", Validar.mensajeFecha);
            //         this.set("formValid",false);
            //         this.set("mensajeErrorObservacion",Validar.mensajeTexto);
            //     }                
            // }

            if(this.get("selectValidoDoc") == false){
                console.log("FECHA NACIMIENTO ---- ", this.get("FechaNacimiento"));                
                this.set("formValid",false);
                this.set("mensajeErrorSelectDoc",Validar.mensajeSelectable);                
            }
            
            
                this.set("mensajeErrorSelectRef",Validar.mensajeSelectable);
            this.set("selectValidoDoc", true);
        },

        onGuardar(){
            var FechaIndefinida = new Date();            
            var dia = FechaIndefinida.getDate();
            var mes = FechaIndefinida.getMonth()+1;// +1 porque los meses empiezan en 0
            var anio = FechaIndefinida.getFullYear() + 100;            

            if(this.get("CheckBoxEstado") == !false)
            {
                FechaIndefinida = (anio+"/"+mes+"/"+dia);
                console.log("FECHA IDEFINIDA", FechaIndefinida)
            }
            else{
                FechaIndefinida = this.get("FechaVencimiento")
                console.log("FECHA IGUAL: ",this.get("FechaVencimiento"));
            }           

            const formularioService = this.get("form"); 
            this.set("Numero", formularioService.Numero);
            this.set("FechaEmision", this.get("FechaEmision"));
            this.set("FechaVencimiento", FechaIndefinida);            

            this.set("formValid",true);
            this.send("validateFields");       

            console.log("validateFieldssss", this.get("formValid"));

            if(this.get("formValid") == true){
                console.log("SU FORMULARIO ES CORRECTO NUEVO **** ");
            }
            else{
                console.log("SU FORMULARIO NO ES CORRECTO  NUEVO ###### ");
            }   

            console.log("REFERENCIA POR DEFECTO **" , this.get("Referencia"));       
            
            if(this.get("Referencia") == undefined || this.get("Referencia") == -1){                
                this.set("Referencia", 1)
                console.log("REFERENCIA POR DEFECTO **" , this.get("Referencia"));
            }
            else{
                this.set("Referencia", this.get("referencia")) ;
            }         
            
            var userData = {
                DocumentoID: this.get("tipoDocumento"),
                Numero: this.get("Numero"),
                Referencia: this.get("Referencia"),
                FechaEmision: this.get("FechaEmision"),
                FechaVencimiento: FechaIndefinida, 
                Observacion: this.get("form.Observacion"),            
            };                          
            
            console.log("userData", userData);        
            console.log("Ingresa al controlador principal Documentos Personales");
            var resultTotal = {};
            var servicioFormulario = this.get("servicioFormulario");
            this.send("validateFields");
            console.log("Datos Documentos Personales FORM",formularioService);

            if(this.get("formValid")){
                console.log("validateFields", this.get("validateFields"))                

                servicioFormulario.updateFormulario(userData)
                .then(resultado=>{    
                    _this.clearFields();            
                    console.log("controlador servicio Resultado", resultado);
                    alertify.success(resultado.mensaje);              
                        if(!resultado.Error){
                            _this.clearFields();
                            _this.transitionToRoute("/");
                        }         
                    // alert(resultTotal.books.mensaje);                                                                
                })
                .catch(error=>{
                    alertify.error(resultado.mensaje);
                    // alert(resultTotal.books.mensaje); 
                    
                });
            }
            else{
                alert("Debe llenar todos los campos correctamente");
            }
        },  

        onGuardarEdicion(){
            console.log("Ingreso al Contolador de Guardar y editar");
            var FechaIndefinida = new Date();            
            var dia = FechaIndefinida.getDate();
            var mes = FechaIndefinida.getMonth()+1;// +1 porque los meses empiezan en 0
            var anio = FechaIndefinida.getFullYear() + 100;       
            
            console.log("GET DEL DOCUMENTO ", this.get("formeditar.Numero"));

            if(this.get("CheckBoxEstado") == !false)
            {
                FechaIndefinida = (anio+"/"+mes+"/"+dia);
                console.log("FECHA IDEFINIDA", FechaIndefinida)
            }
            else{
                FechaIndefinida = this.get("FechaVencimiento")
                console.log("FECHA IGUAL: ",this.get("FechaVencimiento"));
            }
            
            if(this.get("formValid")){
                console.log("SU FORMULARIO ES CORRECTO **** ");
            }
            else{
                console.log("SU FORMULARIO NO ES CORRECTO ###### ");
            }                   

            console.log("GET DEL DOCUMENTO ", this.get("formeditar.Numero"));
            console.log("GET DEL Referencia ", this.get("formeditar.Referencia"));

            console.log("**** FECHA FIN **** ", this.get("formeditar.FechaVencimiento"));
            if(this.get("FechaVencimiento") == undefined || this.get("FechaVencimiento") == "-1"){
                this.set("FechaVencimiento" , this.get("formeditar.FechaVencimiento")) ;
            }
            if(this.get("FechaEmision") == undefined || this.get("FechaEmision") == "-1"){
                this.set("FechaEmision" , this.get("formeditar.FechaEmision")) ;
            }
            
            var userData = {                
                DocumentoID: this.get("formeditar.DocumentoID"),
                Numero : this.get("formeditar.Numero"),
                FechaEmision : this.get("FechaEmision"),
                FechaVencimiento : this.get("FechaVencimiento"),
                Referencia : this.get("formeditar.Referencia"),
                Observacion : this.get("formeditar.Observacion"),
                DocumentoPersonalID: this.get("formeditar.DocumentoPersonalID")
                
            };                          
            
            console.log("userData", userData);                            
            console.log("Ingresa al controlador principal Documentos Personales");            
            var servicioFormulario = this.get("servicioFormulario");            
            
            servicioFormulario.callDocumentosPersonalesEditar(userData)
            .then(resultado=>{    
                _this.clearFields();            
                console.log("controlador servicio Resultado", resultado);              
                alertify.success(resultado.mensaje);
                    if(!resultado.Error){
                        _this.clearFields();
                        _this.transitionToRoute("/");
                    }         
                // alert(resultTotal.books.mensaje);                                                                
            })
            .catch(error=>{
                alertify.error(resultado.mensaje);
                // alert(resultTotal.books.mensaje); 
                
            });
        },  


        tipoDocumentoSelected(value){
            console.log("Ingresa tipoDocumento" , value);
            //this.set("mensajeErrorSelectDoc" , "" );
            
            this.set("selectValidoDoc", true);
            //mensajeErrorSelectDoc
            
            this.set("tipoDocumento",value);
            switch(value) {
                //console.log("Valor value: ", value);
                case '10':
                        console.log("Valor value: ", value);
                        console.log("Ingreso al documento carnet identidad ");
                        this.set("visibleCiudad" , true);
                        this.set("visibleLicencia" , false);                        
                        this.set("visiblePaises" , false);
                        this.set("visibleVacuna" , false);
                    break;
                case '12':
                        console.log("Valor value: ", value);
                        console.log("Ingreso al documento Licencia  ");
                        this.set("visibleLicencia" , true);                        
                        this.set("visibleCiudad" , false);
                        this.set("visiblePaises" , false);
                        this.set("visibleVacuna" , false);
                    break;
                case '9':
                        console.log("Valor value: ", value);
                        console.log("Ingreso al documento Vacunas  ");
                        this.set("visibleVacuna" , true);
                        this.set("visiblePaises" , false);
                        this.set("visibleLicencia" , false);
                        this.set("visibleCiudad" , false);                        
                        
                    break;
                case '5':
                        console.log("Valor value: ", value);
                        console.log("Ingreso al documento Visa Residente  ");
                        this.set("visiblePaises" , true);
                        this.set("visibleLicencia" , false);
                        this.set("visibleCiudad" , false);                        
                        this.set("visibleVacuna" , false);
                    break;
                case '6':
                        console.log("Valor value: ", value);
                        console.log("Ingreso al documento Visa Tripulante   ");
                        this.set("visiblePaises" , true);
                        this.set("visibleLicencia" , false);
                        this.set("visibleCiudad" , false);                        
                        this.set("visibleVacuna" , false);
                break;
                    case '22':
                    console.log("Valor value: ", value);
                    console.log("Ingreso al documento Visa Turista  ");
                    this.set("visiblePaises" , true);
                    this.set("visibleCiudad" , false);
                break;
                default:
                    console.log("No selecciono ningun documento");
                    this.set("visibleLicencia" , false);
                    this.set("visibleCiudad" , false);
                    this.set("visiblePaises" , false);
                    this.set("visibleVacuna" , false);
            }
        },
        referenciaSelected(value){            
            this.set("selectValidoRef", true);
            console.log("Ingresa referencia" , value);
            this.set("referencia",value);
            this.set("formeditar.referencia",value);
            console.log("Mi refe: ", this.get("referencia"));
        },

        indefinidoCheckBoxEstado() {
            const state = this.get('CheckBoxEstado'); // cbState is not updated when use 'change' event
            this.set('CheckBoxEstado', !state );
            console.log("Ingresa estado check Box",  state);
        },       
        
        onFechaIni(data){
            //_this.clearFields();
            //this.send("clearFields");
            this.send("validateFields");            
            //this.set("birthDateErrorMessage","");
            console.log("Fecha Seleccionada Inicio",   moment(data).format('YYYY/MM/DD'));
            //this.set("FechaEmision",moment(data).format('DD/MM/YYYY'));
            console.log(this.get("FechaEmision"));
            this.set("FechaEmision", moment(data).format('YYYY/MM/DD'));
        },
        onFechaFin(data){
            //_this.clearFields();
            this.send("validateFields");
            //this.set("birthDateErrorMessage","");
            console.log("Fecha Seleccionada Fin",  moment(data).format('YYYY/MM/DD'));
            this.set("FechaVencimiento",moment(data).format('YYYY/MM/DD'));
        },
        signUp(event){
            
            var servicioFormulario = this.get("servicioFormulario");
            servicioFormulario.callDocumentosPersonalesEditar(event.DocumentoPersonalID);
            console.log(event.DocumentoID );

            this.set("formeditar.DocumentoID", event.DocumentoID);
            this.set("formeditar.FechaEmision", event.FechaEmision);
            this.set("formeditar.FechaVencimiento", event.FechaVencimiento);
            this.set("formeditar.Observacion", event.Observacion);
            this.set("formeditar.Referencia", event.Referencia);
            this.set("formeditar.Numero", event.NumeroDocumento);
            this.set("formeditar.DocumentoPersonalID", event.DocumentoPersonalID);
            
            console.log("GET DEL DOCUMENTO ", this.get("formeditar.Numero"));            
           console.log("ACCION **" , event);
           console.log("ACCION **" , event.DocumentoPersonalID);
        },

        idEditar(event){            

            this.set("formeditar.DocumentoID", event.DocumentoID);
            this.set("formeditar.FechaEmision", event.FechaEmision);
            this.set("formeditar.FechaVencimiento", event.FechaVencimiento);
            this.set("formeditar.Observacion", event.Observacion);
            this.set("formeditar.Referencia", event.Referencia);
            this.set("formeditar.Numero", event.NumeroDocumento);
            this.set("formeditar.DocumentoPersonalID", event.DocumentoPersonalID);
            
            // if(event.Finado == "SI"){                
            //     this.set('CheckBoxEstado', true );
            // }
            // else{
            //     this.set('CheckBoxEstado', false );
            // }   
            // console.log("GET DEL DOCUMENTO ", this.get("formeditar.Numero"));            
           console.log("ACCION **" , event);
           //console.log("ACCION **" , event.DocumentoPersonalID);
        },

        idEliminar(dato){
            console.log("eliminar Documento Personal" , dato);
            var servicioFormulario = this.get("servicioFormulario");
            servicioFormulario.deleteFormulario(dato)
            .then(resultado=>{                
                //this.transitionToRoute('principal');                  
                 alert(resultado.mensaje);    
                 location.reload();                                                              
            })
            .catch(error=>{
                alert(resultado.mensaje); 
                
            });
        }

        
    },
   
    
});
