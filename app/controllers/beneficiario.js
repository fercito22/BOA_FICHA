import Controller from '@ember/controller';
import {inject} from '@ember/service';

import { match, not } from '@ember/object/computed';
import Validar from '../models/validaciones'
import { and } from '@ember/object/computed';

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

        //--------------------
        //  Validacion Edicion
        //--------------------

        // isValid: match('emailAddress', /^.+@.+\..+$/),
        // sDisabled: not('isValid'),

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

        habilitar: and('NombreValido2','apellidoValido2', 'apellidoValido3'),
        isDisabledBeneficiario: not('habilitar'),

    clearFields(){
        this.set("nombreContacto",null);             
    },
    

    actions:{

        validateFieldsBeneEdit(){           
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
        },

        validateFieldsBeneNuevo(){           
            if(this.get("form.Nombres") == ''){               
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
        },

        onGuardar(){
            const formularioService = this.get("formeditar"); 
            var parentesco = null;
            if(this.get("parentescoID") == undefined || this.get("parentescoID") == -1){               
                parentesco = formularioService.parentescoID; 
            }
            else{
                parentesco = this.get("parentescoID");
            }

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
           
            var userData = {                                    
                parentescoID: parentesco, 
                Nombres : formularioService.Nombres,
                Apellido1: formularioService.Apellido1,
                Apellido2 : formularioService.Apellido2,
                Tipo_NroDocumento : tipoDocumento, // formularioService.Tipo_NroDocumento,
                datosFamiliaresID: formularioService.datosFamiliaresID,
                Finado : fin
            };                  
            
            var resultTotal = {};
            var servicioFormulario = this.get("servicioFormulario");            
           
            servicioFormulario.updateFormulario(userData)
            .then(resultado=>{                                             
                alertify.success(resultado.mensaje);      
                this.send("refreshRoute");                                                                           
            })
            .catch(error=>{                
                alertify.error(resultado.mensaje);  
                
            });
        },         

        ///***** Nuevo 

        onGuardarNuevo(){
            const formularioService = this.get("form");            
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
           
            var userData = {                                    
                parentescoID: this.get("parentesco"), 
                Nombres : formularioService.Nombres,
                Apellido1: formularioService.Apellido1,
                Apellido2 : formularioService.Apellido2,
                Tipo_NroDocumento : tipoDocumento,
                datosFamiliaresID: formularioService.datosFamiliaresID,
                Finado : fin
            };                  
           
            var resultTotal = {};
            var servicioFormulario = this.get("servicioFormulario");

            this.set("formValidBeneficiarioNuevo",true);
            this.send("validateFieldsBeneNuevo");              

            if(this.get("formValidBeneficiarioNuevo")){                
                servicioFormulario.nuevoFormulario(userData)
                .then(resultado=>{                                    
                    alertify.success(resultado.mensaje);    
                    this.send("refreshRoute");                                                                                
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
            this.set("parentesco",value);
        },

        finadoCheckBoxEstado() {
            const state = this.get('CheckBoxEstado'); // cbState is not updated when use 'change' event
            this.set('CheckBoxEstado', !state );            
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
        },
        idEliminar(dato){   
            var servicioFormulario = this.get("servicioFormulario");              
            servicioFormulario.deleteFormulario(dato)
            .then(resultado=>{                
                this.transitionToRoute('/index');                                   
                 alertify.success(resultado.mensaje);    
                 this.send("refreshRoute");   
                 //location.reload();                                                              
            })
            .catch(error=>{                
                alertify.error(resultado.mensaje);                
            });
        }
    }   
    
});
