import Controller from '@ember/controller';
import {inject} from '@ember/service';
import { match, not } from '@ember/object/computed';

//import EmberValidations from 'ember-validations';

//import EmberValidator from 'ember-validator';

import Validar from '../models/validaciones'
import { and } from '@ember/object/computed';
import { or } from '@ember/object/computed';

import Ember from 'ember';
  
export default Ember.Controller.extend( {
    servicioFormulario: inject("servicio-documentos-personales"),

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
    formNuevo:  {                                
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

        // Nueva validacion
        selectValidoDoc: false,    
        validateFieldsDocumentoN: true,
        validacionFechaCorrecta:true, 
    
        NumeroValido: match('form.Numero',Validar.TextNum),        
        FechaIniValido: match('FechaEmision', Validar.fecAMD),
        FechaFinValido: match('FechaVencimiento', Validar.fecAMD),
        observacionval: match('form.Observacion', Validar.texto),

        NumeroValido2: match('formeditar.Numero',Validar.TextNum),        
        FechaIniValido: match('FechaEmision', Validar.fecAMD),
        FechaFinValido: match('FechaVencimiento', Validar.fecAMD),
        observacionval: match('formeditar.Observacion', Validar.texto),

        habilitar2: or('CheckBoxEstado','FechaFinValido'),
        habilitar: and('NumeroValido' , 'FechaIniValido',  'selectValidoDoc', 'habilitar2' ),
        
        isDisabled: not('habilitar'),
        
        documentosV: true,          
          
        //  -----   Mensajes Formulario Nuevos
        mensajeNumero: '',
        mensajeFechaEmision: '',
        mensajeFechaVencimiento: '',        
        mensajeDocumento: '',   

    clearFields(){ 

        this.set("form.DocumentoID",''); 
        this.set("form.Numero", ''); 
        this.set("form.FechaEmision",'null'); 
        this.set("form.FechaVencimiento",'null'); 
        this.set("form.Observacion",'null'); 
        this.set("form.ConAlerta",'null'); 
        this.set("form.Referencia",'null'); 
        this.set("form.DocumentoPersonalID",'null'); 
        
        this.set("mensajeErrorTexto","");                
        this.set("mensajeErrorObservacion","");
        this.set("mensajeErrorFecFin","");
        this.set("mensajeErrorFecIni","");
        this.set("mensajeErrorSelectDoc","");
        this.set("mensajeErrorSelectRef","");  
    },

    actions:{ 
        clearFieldsDocumento(){ 
            this.set("form.DocumentoID",''); 
            this.set("form.Numero", '');             
            this.set("FechaEmision",null);    
            this.set("FechaVencimiento",null); 

            this.set("mensajeErrorTexto","");                
            this.set("mensajeErrorObservacion","");
            this.set("mensajeErrorFecFin","");
            this.set("mensajeErrorFecIni","");
            this.set("mensajeErrorSelectDoc","");
            this.set("mensajeErrorSelectRef","");  
        },     
        validateFields(){  
            
            console.log("Numero",this.get("NumeroValido2"));
            console.log("FechaIniValido",this.get("FechaIniValido"));
            console.log("FechaFinValido",this.get("FechaFinValido"));
            console.log("observacionval",this.get("observacionval"));

            if(this.get("Numero") == -1){
                this.set("formValid",false);
                this.set("mensajeErrorTexto",Validar.mensajeNumeros);               
            }           
           
            if(this.get("FechaVencimiento") == -1){
                this.set("formValid",false);
                this.set("mensajeErrorFecFin",Validar.mensajeFecha);                  
            }    
            
            if(this.get("FechaEmision") == -1){
                this.set("formValid",false);
                this.set("mensajeErrorFecIni",Validar.mensajeFecha);                
            }
         
            if(this.get("selectValidoDoc") == false){               
                this.set("formValid",false);
                this.set("mensajeErrorSelectDoc",Validar.mensajeSelectable);                
            }            
            
            this.set("mensajeErrorSelectRef",Validar.mensajeSelectable);
            this.set("selectValidoDoc", true);
        },

        validateFieldsNuevo(){

            console.log("Numero",this.get("NumeroValido2"));
            console.log("FechaIniValido",this.get("FechaIniValido"));
            console.log("FechaFinValido",this.get("FechaFinValido"));
            console.log("observacionval",this.get("observacionval"));   

            
            console.log("Validar selectValidoDoc:", this.get("selectValidoDoc"));            
            if(this.get("habilitar") != true || this.get("selectValidoDoc") != true){
                this.set("mensajeErrorTexto",Validar.mensajeNumeros);               
                this.set("mensajeErrorFecFin",Validar.mensajeFecha);                
                this.set("mensajeErrorFecIni",Validar.mensajeFecha);                            
                this.set("mensajeErrorSelectDoc",Validar.mensajeSelectable);                
                this.set("formValid",false);
                this.set("mensajeErrorSelectRef",Validar.mensajeSelectable);
                //this.set("selectValidoDoc", true);

                // if(this.get("validacionFechaCorrecta") != true){                         
                //     this.set("validateFieldsTituloN", false);
                //     this.set("mensajeFormulario", "Fechas no validas la fecha inicio debe ser Menor a la fecha Fin.");
                // }
            }
            else{
                this.set("mensajeFormulario", "ok.");
            }            
            //console.log("validateFieldsTituloN: ", this.get("validateFieldsTituloN"));
         },

        onGuardarDocumentoNuevo(){
            var FechaIndefinida = new Date();            
            var dia = FechaIndefinida.getDate();
            var mes = FechaIndefinida.getMonth()+1;// +1 porque los meses empiezan en 0
            var anio = FechaIndefinida.getFullYear() + 100;            

            if(this.get("CheckBoxEstado") == !false)
            {
                FechaIndefinida = (anio+"/"+mes+"/"+dia);            
            }
            else{
                FechaIndefinida = this.get("FechaVencimiento")                
            }           

            const formularioService = this.get("form"); 
            this.set("Numero", formularioService.Numero);
            this.set("FechaEmision", this.get("FechaEmision"));
            this.set("FechaVencimiento", FechaIndefinida);            

            this.set("formValid",true);
            
            

            // if(this.get("formValid") == true){
            //    // console.log("SU FORMULARIO ES CORRECTO NUEVO **** ");
            // }
            // else{
            //    // console.log("SU FORMULARIO NO ES CORRECTO  NUEVO ###### ");
            // }   
            var ref = 0;
            if(this.get("referencia") == undefined || this.get("referencia") == -1){                
                ref = 0;
            }
            else{
                ref = this.get("referencia");
            }
            var obs = ' ';
            if(this.get("Observacuion") == '' || this.get("Observacuion") == null){                
                obs = ' ';
            }
            else{
                obs = this.get("form.Observacion");
            }
            
            console.log("Observacuion ", this.get("form.Observacion"));         
            
            var userData = {
                DocumentoID: this.get("tipoDocumento"),
                Numero: this.get("Numero"),
                Referencia: ref,
                FechaEmision: this.get("FechaEmision"),
                FechaVencimiento: FechaIndefinida, 
                Observacion: obs,            
            };                          
            console.log("USER DATA : = REFERENCIA ", userData);
            var resultTotal = {};
            var servicioFormulario = this.get("servicioFormulario");
            //this.send("validateFields"); 
            this.send("validateFieldsNuevo");   //aaa

            console.log("Datos Documentos Personales FORM",formularioService);

            // if(this.get("formValid")){
            //     servicioFormulario.updateFormulario(userData)
            //     .then(resultado=>{                               
            //         console.log("controlador servicio Resultado", resultado);
            //         alertify.success(resultado.mensaje);
            //         //_this.refresh("/formulario-documentos");
            //         //this.refresh();
            //         //_this.clearFieldsPerfil();
            //         //_this.send("clearFieldsPerfil");                    
            //         //_this.clearFields();
            //         //formulario-docmentos.relo
            //         this.send("refreshRoute");                 
            //             // if(!resultado.Error){
            //             //     _this.clearFields();
            //             //     _this.transitionToRoute("/documentos-personales");
            //             // }                             
            //     })
            //     .catch(error=>{
            //         alertify.error(resultado.mensaje); 
                                      
            //     });
            // }
            // else{
            //     alert("Debe llenar todos los campos correctamente");
            // }
        },  

        onGuardarEdicion(){           
            var FechaIndefinida = new Date();            
            var dia = FechaIndefinida.getDate();
            var mes = FechaIndefinida.getMonth()+1;// +1 porque los meses empiezan en 0
            var anio = FechaIndefinida.getFullYear() + 100;       
            // if(this.get("CheckBoxEstado") == !false)
            // {
            //     FechaIndefinida = (anio+"/"+mes+"/"+dia);
            //     //console.log("FECHA IDEFINIDA", FechaIndefinida)
            // }
            // else{
            //     FechaIndefinida = this.get("FechaVencimiento")
            //     //console.log("FECHA IGUAL: ",this.get("FechaVencimiento"));
            // }
            
            // console.log("GET DEL Referencia ", this.get("formeditar.Referencia"));

            // //console.log("**** FECHA FIN **** ", this.get("formeditar.FechaVencimiento"));
            if(this.get("FechaVencimiento") == undefined || this.get("FechaVencimiento") == "-1"){
                this.set("FechaVencimiento" , this.get("formeditar.FechaVencimiento")) ;
            }
            if(this.get("FechaEmision") == undefined || this.get("FechaEmision") == "-1"){
                this.set("FechaEmision" , this.get("formeditar.FechaEmision")) ;
            }
            if(this.get("formeditar.Observacion") == null ){
                this.set("formeditar.Observacion", '');
            }

            var ref = 0;
            if(this.get("referencia") == undefined || this.get("referencia") == -1){                
                ref = this.get("formeditar.Referencia");
            }
            else{
                ref = this.get("referencia");
            }
            
            var userData = {                
                DocumentoID: this.get("formeditar.DocumentoID"),
                Numero : this.get("formeditar.Numero"),
                FechaEmision : this.get("FechaEmision"),
                FechaVencimiento : this.get("FechaVencimiento"),
                Referencia : ref, //this.get("formeditar.Referencia"),
                Observacion : this.get("formeditar.Observacion"),
                DocumentoPersonalID: this.get("formeditar.DocumentoPersonalID")                
            };                          
            
            console.log("userData", userData);                                        
            var servicioFormulario = this.get("servicioFormulario");        
            servicioFormulario.callDocumentosPersonalesEditar(userData)
            .then(resultado=>{                    
                alertify.success(resultado.mensaje);
                this.send("refreshRoute");   
            })
            .catch(error=>{
                alertify.error(resultado.mensaje);
            });
        },  


        tipoDocumentoSelected(value){
            console.log("value tipoDocumentoSelected ", value);
            this.set("selectValidoDoc", true);
            this.set("tipoDocumento",value);
            switch(value) {
                case '10':
                        this.set("visibleCiudad" , true);
                        this.set("visibleLicencia" , false);                        
                        this.set("visiblePaises" , false);
                        this.set("visibleVacuna" , false);
                    break;
                case '12':
                        this.set("visibleLicencia" , true);                        
                        this.set("visibleCiudad" , false);
                        this.set("visiblePaises" , false);
                        this.set("visibleVacuna" , false);
                    break;
                case '9':                       
                        this.set("visibleVacuna" , true);
                        this.set("visiblePaises" , false);
                        this.set("visibleLicencia" , false);
                        this.set("visibleCiudad" , false);                        
                        
                    break;
                case '5':                        
                        this.set("visiblePaises" , true);
                        this.set("visibleLicencia" , false);
                        this.set("visibleCiudad" , false);                        
                        this.set("visibleVacuna" , false);
                    break;
                case '6':
                        this.set("visiblePaises" , true);
                        this.set("visibleLicencia" , false);
                        this.set("visibleCiudad" , false);                        
                        this.set("visibleVacuna" , false);
                break;
                    case '22':                    
                    this.set("visiblePaises" , true);
                    this.set("visibleCiudad" , false);
                break;
                default:                    
                    this.set("visibleLicencia" , false);
                    this.set("visibleCiudad" , false);
                    this.set("visiblePaises" , false);
                    this.set("visibleVacuna" , false);
            }
        },
        referenciaSelected(value){      
            this.set("isDisabled", false);
            console.log("Seleccion = ",value);
            this.set("selectValidoRef", true);
            this.set("referencia",value);
            this.set("formeditar.referencia",value);            
        },

        indefinidoCheckBoxEstado() {
            const state = this.get('CheckBoxEstado'); // cbState is not updated when use 'change' event
            this.set('CheckBoxEstado', !state );    
            this.set("FechaVencimiento",null);         
        },       
        
        onFechaIni(data){
            //this.send("validateFields"); 
            this.send("validateFieldsNuevo"); 

            this.set("FechaEmision", moment(data).format('YYYY/MM/DD'));
        },
        onFechaFin(data){
            //this.send("validateFields");
            this.send("validateFieldsNuevo");
            this.set("FechaVencimiento",moment(data).format('YYYY/MM/DD'));
        },
        signUp(event){            
            var servicioFormulario = this.get("servicioFormulario");
            servicioFormulario.callDocumentosPersonalesEditar(event.DocumentoPersonalID);

            this.set("formeditar.DocumentoID", event.DocumentoID);
            this.set("formeditar.FechaEmision", event.FechaEmision);
            this.set("formeditar.FechaVencimiento", event.FechaVencimiento);
            this.set("formeditar.Observacion", event.Observacion);
            this.set("formeditar.Referencia", event.Referencia);
            this.set("formeditar.Numero", event.NumeroDocumento);
            this.set("formeditar.DocumentoPersonalID", event.DocumentoPersonalID);
        },

        idEditar(event){  
            console.log("Referencia --- " , event.Referencia)          ;
            this.set("formeditar.DocumentoID", event.DocumentoID);
            this.set("formeditar.FechaEmision", event.FechaEmision);
            this.set("formeditar.FechaVencimiento", event.FechaVencimiento);
            this.set("formeditar.Observacion", event.Observacion);
            this.set("formeditar.Referencia", event.Referencia);
            this.set("formeditar.Numero", event.NumeroDocumento);
            this.set("formeditar.DocumentoPersonalID", event.DocumentoPersonalID);
           var dato = event.DocumentoID.toString();
            switch(dato) {                
                case '10':
                console.log("Ingreso al switch 10");
                        this.set("visibleCiudad" , true);
                        this.set("visibleLicencia" , false);                        
                        this.set("visiblePaises" , false);
                        this.set("visibleVacuna" , false);
                    break;
                case '12':
                console.log("Ingreso al switch 12");
                        this.set("visibleLicencia" , true);                        
                        this.set("visibleCiudad" , false);
                        this.set("visiblePaises" , false);
                        this.set("visibleVacuna" , false);
                    break;
                case '9':                       
                console.log("Ingreso al switch 9");
                        this.set("visibleVacuna" , true);
                        this.set("visiblePaises" , false);
                        this.set("visibleLicencia" , false);
                        this.set("visibleCiudad" , false);                        
                        
                    break;
                case '5':   
                console.log("Ingreso al switch 5");                     
                        this.set("visiblePaises" , true);
                        this.set("visibleLicencia" , false);
                        this.set("visibleCiudad" , false);                        
                        this.set("visibleVacuna" , false);
                    break;
                case '6':
                console.log("Ingreso al switch 6");
                        this.set("visiblePaises" , true);
                        this.set("visibleLicencia" , false);
                        this.set("visibleCiudad" , false);                        
                        this.set("visibleVacuna" , false);
                break;
                    case '22':                    
                    this.set("visiblePaises" , true);
                    this.set("visibleCiudad" , false);
                break;
                default:                    
                console.log("Ingreso al switch defaul");
                    this.set("visibleLicencia" , false);
                    this.set("visibleCiudad" , false);
                    this.set("visiblePaises" , false);
                    this.set("visibleVacuna" , false);
            }  
             //visibleCiudad
             console.log("MI ID DEL FOR ES : ", event.DocumentoID);
             console.log("visibleCiudad ", this.get("visibleVacuna"));         
        },
        
        nuevoDocu(){
            
            this.send("clearFieldsDocumento");
            
            // this.set("NumeroValido",true);
            // this.set("FechaIniValido",true);
            // this.set("FechaFinValido",true);
            
            document.getElementById("miForm").reset();
            //this.clearFields();
            
            //document.getElementById("exampleModalLabel").reset();
            console.log("Nuevo Formulario");
//            this.store.unloadAll('PARTICULAR MAODEL NAME');
            this.set("form.DocumentoID",-1); 
            this.set("form.Numero", ''); 
            this.set("form.FechaEmision",''); 
            this.set("form.FechaVencimiento",''); //2019/01/16'); 
            this.set("form.Observacion",''); 
            this.set("form.ConAlerta",''); 
            this.set("form.Referencia",''); 
            this.set("form.DocumentoPersonalID",0); 

        },

        idEliminar(dato){           
            var servicioFormulario = this.get("servicioFormulario");
            servicioFormulario.deleteFormulario(dato)
            .then(resultado=>{     
                alertify.success(resultado.mensaje);
                this.send("refreshRoute");    
            })
            .catch(error=>{
                alertify.error(resultado.mensaje);
            });
        }        
    },   
    
});
