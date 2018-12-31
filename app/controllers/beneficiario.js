import Controller from '@ember/controller';
import {inject} from '@ember/service';

import { match, not } from '@ember/object/computed';
import Validar from '../models/validaciones'
import { and } from '@ember/object/computed';
//import { or } from '@ember/object/computed';
//import valida from '../models/validaciones';

export default Controller.extend({
    servicioFormulario: inject("servicio-declaracion"),    

    form:  {                                
        datosFamiliaresID: '',
        parentescoID: '',
        Nombres: '',
        Apellido1: '',
        Apellido2: '',
        Tipo_NroDocumento: '',
        Beneficiario: '',    
        Estado: '', 
        Finado: '', 
        Identificador: '', 
    }, 
    
    formeditar:  {                                
        datosFamiliaresID: '',
        parentescoID: '',
        Nombres: '',
        Apellido1: '',
        Apellido2: '',
        Tipo_NroDocumento: '',
        Beneficiario: '',    
        Estado: '', 
        Finado: '', 
        Identificador: '', 
    }, 
        datosFamiliaresID: -1,
        parentescoID: -1,
        Nombres: -1,
        Apellido1: -1,
        Apellido2: -1,
        Tipo_NroDocumento: -1,
        Beneficiario: -1,
        Estado: -1,
        Finado: -1,
        Identificador: -1,

        CheckBoxEstado: false,

        // mensajeErrorTexto: '',
        // mensajeErrorNumerosFijo: '',
        // mensajeErrorNumerosCelular: '',
        // mensajeErrorDireccion: '',
        // mensajeErrorFecha: '',        

        // nombreCol: match('form.nombreColegio', Validar.texto),
        // maxMinCol: match('form.nombreColegio' , Validar.textoMinMax),
        // colegioValido: and('nombreCol', 'maxMinCol'),
        // nombreColegio: not('colegioValido'),     

        //nombresVal: match('form.Nombres', /^[a-zA-Z ]+$/),
        // nombresVal: match('form.Nombres', Validar.texto),
        // estadoNombres: not('nombresVal'),

        //--------------------
        //  Validacion Edicion
        //--------------------
        mensajeErrorNombre: 'Porfavor Ingrese un nombre valido',
        mensajeErrorApellidoPat: 'Ingrese un apellido Valido',
        mensajeErrorApellidoMat: 'Ingrese un apellido Valido',
        mensajeErrorNumeros: '',

        NombreValido: match('formeditar.Nombres',Validar.textoMinMax),
        apellidoValido: match('formeditar.Apellido1', Validar.textoMinMax),
        apellidoMaValido: match('formeditar.Apellido2', Validar.textoMinMax),
        numeroValido: match('formeditar.Tipo_NroDocumento', Validar.carnet),

        habilitarEdit: and('NombreValido', 'apellidoValido', 'apellidoMaValido'),// 'numeroValido'),
        isDisabledBeneficiarioEdit: not('habilitarEdit'),

        // nombresVal: match('formeditar.Nombres', Validar.texto),
        // maxMinnombre: match('formeditar.Nombres' , Validar.textoMinMax),
        // NombreValido: and('nombresVal', 'maxMinnombre'),       

        // apellidoVal: match('formeditar.Apellido1', Validar.texto),
        // maxMinApellido: match('formeditar.Apellido1' , Validar.textoMinMax),
        // apellidoValido: and('apellidoVal', 'maxMinApellido'),         

        // apellidoValMa: match('formeditar.Apellido2', Validar.texto),
        // maxMinApellidoMA: match('formeditar.Apellido2' , Validar.textoMinMax),
        // apellidoMaValido: and('apellidoValMa', 'maxMinApellidoMA'), 
        
        // numeroVal: match('formeditar.Tipo_NroDocumento', Validar.numeros),
        // maxMinNumero: match('formeditar.Tipo_NroDocumento' , Validar.maxMinNumero),
        // validarNumero: match('formeditar.Tipo_NroDocumento' , Validar.numeros),
        // numeroValido: and('numeroVal', 'maxMinNumero' ),// 'validarNumero'),

        // NombreValido: match('formeditar.Nombres', Validar.textoMinMax),
        // apellidoValido: match('formeditar.Apellido1', Validar.textoMinMax),
        // apellidoMaValido: match('formeditar.Apellido2', Validar.textoMinMax),

        

        // habilitar: and('NombreValido', 'apellidoValido', 'apellidoMaValido'),// 'numeroValido'),
        // isDisabledBeneficiario: not('habilitar'),

        //--------------------
        //  Validacion Nuevo
        //--------------------

        nombresVal2: match('form.Nombres', Validar.texto),
        maxMinnombre2: match('form.Nombres' , Validar.textoMinMax),
        NombreValido2: and('form', 'maxMinnombre2'),

        apellidoVal2: match('form.Apellido1', Validar.texto),
        maxMinApellido2: match('form.Apellido1' , Validar.textoMinMax),
        apellidoValido2: and('apellidoVal2', 'maxMinApellido2'),

        apellidoVal3: match('form.Apellido2', Validar.texto),
        maxMinApellido3: match('form.Apellido2' , Validar.textoMinMax),
        apellidoValido3: and('apellidoVal3', 'maxMinApellido3'),

        //numeroVal2: match('form.Tipo_NroDocumento',Validar.TextNum),

        habilitar: and('NombreValido2','apellidoValido2', 'apellidoValido3'),
        isDisabledBeneficiario: not('habilitar'),

    clearFields(){
        this.set("nombreContacto",null);             
    },

    //actions: {  } 

    actions:{

        // reload: function()
        //  {
        //       this.get('model').reload();
        //      }

        validateFieldsBeneEdit(){
            console.log("Validate Fields Ingreso");
            if(this.get("formeditar.Nombres") == -1){
                this.set("mensajeErrorNombre", Validar.mensajeTexto);
                this.set("formValidBeneficiario",false);
            }
            if(this.get("formeditar.Apellido1") == -1){
                this.set("mensajeErrorApellidoPat", Validar.mensajeTexto);
                this.set("formValidBeneficiario",false);
            }
            if(this.get("formeditar.Apellido2ApellidoMat") == -1){
                this.set("mensajeError", Validar.mensajeTexto);
                this.set("formValidBeneficiario",false);
            }   
            // if(this.get("formeditar.Tipo_NroDocumento") == -1){
            //     this.set("mensajeErrorNumeros", Validar.mensajeTexto);
            //     this.set("formValidBeneficiario",false);
            // }                        
        },

        validateFieldsBeneNuevo(){
            console.log("Validate Fields Ingreso" , this.get("form.Nombres"));
            if(this.get("form.Nombres") == ''){
                console.log("Validate Fields Ingreso Nombre");
                this.set("mensajeErrorNombre", "Porfavor Ingrese un nombre valido");
                this.set("formValidBeneficiarioNuevo",false);
            }

            if(this.get("form.Apellido1") == ''){
                this.set("mensajeErrorApellidoPat", "Ingrese un apellido Valido");
                this.set("formValidBeneficiarioNuevo",false);
            }
            if(this.get("form.Apellido2ApellidoMat") == ''){
                this.set("mensajeError","Ingrese un apellido Valido" );
                this.set("formValidBeneficiarioNuevo",false);
            }   
            // if(this.get("form.Tipo_NroDocumento") == ''){                
            //     //this.set("formValidBeneficiarioNuevo",false);
            //     this.set("mensajeErrorNumeros","Este no es un numero valido")
            // }                        
        },

        onGuardar(){
            const formularioService = this.get("formeditar"); 

            console.log("DATOS BENEFICIARIOS **** " , formularioService)
            var parentesco = null;
            if(this.get("parentescoID") == undefined || this.get("parentescoID") == -1){
                console.log("Estado parentesco ID = " , this.get("parentescoID"));
                //console.log("Mi Estado Civil Actual ", formularioService.EstadoCivil);    
                parentesco = formularioService.parentescoID; 
            }
            else{
                parentesco = this.get("parentescoID");
            }

            console.log("**** FINADO  ****", this.get("CheckBoxEstado"));


            var fin = 1;
            if(this.get("CheckBoxEstado") == false){
                fin = 1;
            }
            else{
                fin = 0;
            }

            var tipoDocumento ="";

            if(formularioService.Tipo_NroDocumento != null){
                tipoDocumento = formularioService.Tipo_NroDocumento;
            }


            console.log("Nombres De familiar: " + formularioService.Nombres);
            var userData = {                                    
                parentescoID: parentesco, 
                Nombres : formularioService.Nombres,
                Apellido1: formularioService.Apellido1,
                Apellido2 : formularioService.Apellido2,
                Tipo_NroDocumento : tipoDocumento, // formularioService.Tipo_NroDocumento,
                datosFamiliaresID: formularioService.datosFamiliaresID,
                Finado : fin
            };      
            
            console.log("userData", userData);            
            //alert(idioma , habla, lee, escribe);         
            console.log("Ingresa al controlador principal");
            var resultTotal = {};
            var servicioFormulario = this.get("servicioFormulario");
            
            console.log("Datos Declaracion",formularioService);
            servicioFormulario.updateFormulario(userData)
            .then(resultado=>{                
                console.log("controlador servicio", resultado);                 
                alertify.success(resultado.mensaje); 
                //this.get('beneficiario').reload();
                //function() {
                    //return this.get("model.beneficiario.length");
                  //}.property("model.posts.[]");
                
                //EmberHandlebarsLoader.loadTemplates('beneficiario');
                //this.destroyRecord();
                //this.removeObserver();
                //(exampleModalLabel).empty();
                //(exampleModalLabel).remove();
                // $(this).dialog("close");
                //$(exampleModalLabel).Close();
                //this.transitionToRoute('beneficiario');                 
                //alert(resultado.mensaje); 
                //setTimeout(location.reload(),1000);                   
                //location.reload();  
                //this.transitionToRoute('beneficiario'); 
                //this.flashMessage('success', 'Content saved!');                
                //alert(resultado.mensaje);
                //location.reload();              
                // alert(resultTotal.books.mensaje);                                                                
            })
            .catch(error=>{
                // alert(resultTotal.books.mensaje);
                alertify.error(resultado.mensaje);  
                
            });
        },  

       

        ///***** Nuevo 

        onGuardarNuevo(){
            const formularioService = this.get("form"); 
            console.log("DATOS BENEFICIARIOS **** " , formularioService)
            // var parentesco = null;
            // if(this.get("parentescoID") == undefined || this.get("parentescoID") == -1){
            //     console.log("Estado parentesco ID = " , this.get("parentescoID"));                
            //     parentesco = formularioService.parentescoID; 
            // }
            // else{
            //     parentesco = this.get("parentescoID");
            // }

            console.log("**** FINADO  ****", this.get("CheckBoxEstado"));
            // var fin = 1;
            // if(formularioService.Finado == "NO"){
            //     fin = 1;
            // }
            // else{
            //     fin = 0;
            // }
            var fin = 1;
            if(this.get("CheckBoxEstado") == false){
                fin = 1;
            }
            else{
                fin = 0;
            }



            var tipoDocumento ="";

            if(formularioService.Tipo_NroDocumento != null){
                tipoDocumento = formularioService.Tipo_NroDocumento;
            }

            console.log("Nombres De familiar: " + formularioService.Nombres);
            var userData = {                                    
                parentescoID: this.get("parentesco"), 
                Nombres : formularioService.Nombres,
                Apellido1: formularioService.Apellido1,
                Apellido2 : formularioService.Apellido2,
                Tipo_NroDocumento : tipoDocumento,
                datosFamiliaresID: formularioService.datosFamiliaresID,
                Finado : fin
            };      
            
            console.log("userData", userData);   
            console.log("Ingresa al controlador principal");
            var resultTotal = {};
            var servicioFormulario = this.get("servicioFormulario");

            this.set("formValidBeneficiarioNuevo",true);
            this.send("validateFieldsBeneNuevo");  
            
            console.log("validateFieldssss", this.get("formValidBeneficiarioNuevo"));

            if(this.get("formValidBeneficiarioNuevo") == true){
                console.log("SU FORMULARIO ES CORRECTO NUEVO **** ");
            }
            else{
                console.log("SU FORMULARIO NO ES CORRECTO  NUEVO ###### ");
            }  

            if(this.get("formValidBeneficiarioNuevo")){
                console.log("Datos Declaracion",formularioService);
                servicioFormulario.nuevoFormulario(userData)
                .then(resultado=>{                
                    console.log("controlador servicio", resultado);                 
                    alertify.success(resultado.mensaje);
                    
                    // setTimeout(closeVentana(),1000);
                    // (exampleModalLabel).empty();
                    // (exampleModalLabel).remove();
                    // // $(this).dialog("close");
                    // (exampleModalLabel).Close();
                    // //this.transitionToRoute('beneficiario');                 
                    // //alert(resultado.mensaje);                    
                    // location.reload();                                                                                          
                })
                .catch(error=>{
                    alertify.error(resultado.mensaje);                 
                });
            }
            else{
                alert("Debe llenar todo el formulario correctamente");
            }
            
            
        },  
        
        parentescoSelected(value){
            console.log("Ingresa parentesco" , value);
            this.set("parentesco",value);
        },

        finadoCheckBoxEstado() {
            const state = this.get('CheckBoxEstado'); // cbState is not updated when use 'change' event
            this.set('CheckBoxEstado', !state );
            console.log("Ingresa estado check Box",  state);
        },
        idEditar(event){

            this.set("formeditar.parentescoID", event.parentescoID);
            this.set("formeditar.FechaEmision", event.FechaEmision);
            this.set("formeditar.Nombres", event.Nombres);
            this.set("formeditar.Apellido1", event.Apellido1);
            this.set("formeditar.Apellido2", event.Apellido2);
            this.set("formeditar.Tipo_NroDocumento", event.Tipo_NroDocumento);
            this.set("formeditar.Apellido1", event.Apellido1);
            this.set("formeditar.Beneficiario", event.Beneficiario);
            this.set("formeditar.datosFamiliaresID", event.datosFamiliaresID);
            this.set("formeditar.Finado", event.Finado);
            
            if(event.Finado == "SI"){                
                this.set('CheckBoxEstado', true );
            }
            else{
                this.set('CheckBoxEstado', false );
            }   
            // console.log("GET DEL DOCUMENTO ", this.get("formeditar.Numero"));            
           console.log("ACCION **" , event);
           //console.log("ACCION **" , event.DocumentoPersonalID);
        },
        idEliminar(dato){
            console.log("eliminar benefi" , dato);

            var servicioFormulario = this.get("servicioFormulario");  
            
            servicioFormulario.deleteFormulario(dato)
            .then(resultado=>{                
                this.transitionToRoute('principal');                  
                 //alert(resultado.mensaje);
                 alertify.success(resultado.mensaje);    
                 location.reload();                                                              
            })
            .catch(error=>{
                //alert(resultado.mensaje); 
                alertify.error(resultado.mensaje);
                
            });

        }
    }   
    
});
