import Controller from '@ember/controller';
import {inject} from '@ember/service';
import { match, not } from '@ember/object/computed';

import Validar from '../models/validaciones'
import { and } from '@ember/object/computed';
import { or } from '@ember/object/computed';


export default Controller.extend({
    formp:  {        
        Nombre1: '',
        Apellido1: '',
        Apellido2: '',
        FechaNacimiento: '',
        Nacionalidad: '',
        CiudadNacimiento: '',
        LugarDeNacimiento: '',        
        Direccion: '',        
        EstadoCivil: ''
    },    

    Nombre1: -1,
    Apellido1: -1,
    Apellido2: -1,
    FechaNacimiento: -1,
    Nacionalidad: -1,
    CiudadNacimiento: -1,
    LugarDeNacimiento: -1,
    Direccion: -1,
    EstadoCivil: -1,

    servicioFormulario: inject("perfil-servicio"),
    
    //mes dia anio
    //vFrom: '11-8-2018',    

    // Nombre1Val: match('formp.Nombre1', /^[a-zA-Z ]+$/),    
    // Apellido1Val: match('formp.Apellido1', /^[a-zA-Z ]+$/),  
    // estadoInvitado: not( 'Nombre1Val'),

    mensajeErrorTexto: '',
    mensajeErrorNumerosFijo: '',
    mensajeErrorNumerosCelular: '',
    mensajeErrorDireccion: '',
    mensajeErrorFecha: '',

    NombreVal: match('formp.Nombre1', Validar.texto),
    longitudNombre: match('formp.Nombre1', Validar.textoMinMax ),    
    NombreValido: and('NombreVal', 'longitudNombre'),

    ApellidoPaternoVal: match('formp.Apellido1', Validar.texto),
    longitudApellidoPaterno: match('formp.Apellido1', Validar.textoMinMax ),    
    ApellidoPaternoValido: and('ApellidoPaternoVal', 'longitudApellidoPaterno'),

    ApellidoMaternoVal: match('formp.Apellido2', Validar.texto),
    longitudApellidoMaterno: match('formp.Apellido2', Validar.textoMinMax ),    
    ApellidoMaternoValido: and('ApellidoMaternoVal', 'longitudApellidoMaterno'),
    
    //FechaNacimientoVal: match('formp.FechaNacimiento', Validar.fecha),
    FechaNacimientoVal: match('FechaVencimiento', /^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/),
    isDisabled: not('FechaNacimientoVal'),

    NacionalidadVal: match('formp.Nacionalidad', Validar.texto),
    longitudNacionalidad: match('formp.Nacionalidad', Validar.textoMinMax ),    
    NacionalidadValido: and('NacionalidadVal', 'longitudNacionalidad'),

    CiudadNacimientoVal: match('formp.CiudadNacimiento', Validar.texto),
    longitudCiudadNacimiento: match('formp.CiudadNacimiento', Validar.textoMinMax ),    
    CiudadNacimientoValido: and('CiudadNacimientoVal', 'longitudCiudadNacimiento'),

    LugarDeNacimientoVal: match('formp.CiudadNacimiento', Validar.texto),
    longitudLugarDeNacimiento: match('formp.CiudadNacimiento', Validar.textoMinMax ),    
    LugarDeNacimientoValido: and('LugarDeNacimientoVal', 'longitudLugarDeNacimiento'),

    DireccionVal: match('formp.Direccion', Validar.texto),
    longitudDireccion: match('formp.Direccion', Validar.textoMinMax ),    
    DireccionValido: and('DireccionVal', 'longitudDireccion'),

    actions:{

        validateFields(){           
            if(this.get("Nombre1") == -1){
                this.set("mensajeErrorTexto", Validar.mensajeTexto);
                //this.set("formValid",false);
            }
            if(this.get("DireccionMedico") == -1){
                this.set("mensajeErrorDireccion", Validar.mensajeDireccion);
                //this.set("formValid",false);
            }
            if(this.get("TelefonoMedico") == -1){
                this.set("mensajeErrorNumeros", Validar.mensajeNumeros);
                //this.set("formValid",false);
            } 
            if(this.get("NroCelularMedico") == -1){
                this.set("mensajeErrorNumerosCelular", Validar.mensajeNumeros);
                //this.set("formValid",false);
            }
            if(this.get("FechaNacimiento") == -1){
                //console.log("FECHA NACIMIENTO ---- ", this.get("FechaNacimiento"));
                this.set("mensajeErrorFecha", Validar.mensajeFecha);
                //this.set("formValid",false);
            }             
             
        },
    
        onGuardar(){           
            this.send("validateFields");
            var resultTotal = {};
            var servicioFormulario = this.get("servicioFormulario");
            const formularioService = this.get("formp"); 
            var estadoCivil = 1
           
            if(this.get("estadoCivil") == undefined){           
                estadoCivil = formularioService.EstadoCivil; 
            }
            else{
                estadoCivil = this.get("estadoCivil");
            }
            
            var userData = {                    
                EstadoCivil: estadoCivil,    
                Nombre1 : formularioService.Nombre1,
                Apellido1 : formularioService.Apellido1,
                Apellido2 : formularioService.Apellido2,
                FechaNacimiento : formularioService.FechaNacimiento,
                Nacionalidad : formularioService.Nacionalidad,
                CiudadNacimiento : formularioService.CiudadNacimiento,
                LugarDeNacimiento : formularioService.LugarDeNacimiento,
                Direccion : formularioService.Direccion
            };    
            
            servicioFormulario.updateFormulario(userData)
            .then(resultado=>{                
                 this.transitionToRoute('/'); 
                 alertify.success(resultado.mensaje);
            })
            .catch(error=>{
                alertify.error(resultado.mensaje);
            });
        }, 
        estadoCivilSelected(value){
            this.set("estadoCivil",value);
        }, 
        onFechaNac(data){            
            this.send("validateFields");            
            this.set("FechaNacimiento",moment(data).format('YYYY/MM/DD'));           
        }
    }
    
});
