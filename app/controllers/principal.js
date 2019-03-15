import Controller from '@ember/controller';
import {inject} from '@ember/service';
import { match, not } from '@ember/object/computed';

import Validar from '../models/validaciones'
import { and } from '@ember/object/computed';

import { getOwner } from '@ember/application';

export default Controller.extend({
    servicioFormulario: inject("perfil-servicio"),
    servicioFormularioContacto: inject("servicio-contacto-emergencia"),
    servicioFormularioMedico: inject("servicio-medico-cabecera"),
    servicioIdiomas: inject("idiomas-servicio"),

    customMensaje:"Mensaje desde el Controlador",
    tipoComunicacionIDCelular: "1",
    visible: false,
    lista: [],
    lista2: [],
    fotografiaV: true,
    idiomasV:true,
    //formacionV:true,
    formacionV2:false,

    botEdi1 : false,    
    isDisabledComunicacion: not('botEdi1'),

    botEditIdioma : false,
    isDisabledIdiomaBoton: not('botEditIdioma'),

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

    formcont:  {                
        nombreContacto: '',
        Relacion: '',
        Direccion: '',
        TelefonoDomicilio: '',
        DireccionTrabajo: '',
        TelefonoTrabajo: '',
        NroCelular: '',
        Identificador: ''
    },
        nombreContacto: -1,
        Relacion: -1,
        Direccion: -1,
        TelefonoDomicilio: -1,
        DireccionTrabajo: -1,
        TelefonoTrabajo: -1,
        NroCelular: -1,
        Identificador: -1,

        formmedico:  {                        
            NombreMedico: '',
            TelefonoMedico: '',
            NroCelularMedico: '',
            AlergiasMedicas: '',
            Medicamentos: '',
            DireccionMedico: '',
            GrupoSanquineo: '',
            RH_Sanguineo: '',
            Identificador: ''
        },
        NombreMedico: -1,
        TelefonoMedico: -1,
        NroCelularMedico: -1,
        AlergiasMedicas: -1,
        Medicamentos: -1,
        DireccionMedico: -1,
        GrupoSanquineo: -1,
        RH_Sanguineo: -1,
        Identificador: -1,

        formidiomas:  {        
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
        idiomaNivel:[{Code:3,Label:"REGULAR"},{Code:2,Label:"BUENO"},{Code:1,Label:"Alto"}],

        formcomu:  {                
            tipoComunicacionID: '',
            Valor: '',
        },
        tipoComunicacionID: -1,
        Valor: -1,    
        name : '',    

    //servicioFormulario: inject("perfil-servicio"),
    rhSanguineoCombo:[{Code:1,Label:"+"},{Code:2,Label:"-"}],  

    mensajeErrorTexto: '',
    mensajeErrorNumerosFijo: '',
    mensajeErrorNumerosCelular: '',
    mensajeErrorDireccion: '',
    mensajeErrorFecha: '',    
    selectValidoIdioma: false,
    selectValidoLee: false,
    selectValidoHabla: false,
    selectValidoEscribe: false,
    selectValidoRelacion: false,

    //NumeroValido: match('form.Numero',Validar.TextNum),

    NombreVal: match('formp.Nombre1', Validar.textoMinMax),
    ApellidoPaternoVal: match('formp.Apellido1', Validar.textoMinMax),
    ApellidoMaternoVal: match('formp.Apellido2', Validar.textoMinMax),
    FechaNacimientoVal: match('formp.FechaNacimiento', Validar.fecAMD ),///^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/),
    NacionalidadVal: match('formp.Nacionalidad', Validar.textoMinMax),
    CiudadNacimientoVal: match('formp.CiudadNacimiento', Validar.textoMinMax),
    LugarDeNacimientoVal: match('formp.LugarDeNacimiento', Validar.textoMinMax),
    DireccionVal: match('formp.Direccion', Validar.Direccion),

    habilitar: and('NombreVal', 'ApellidoPaternoVal', 'ApellidoMaternoVal', 'FechaNacimientoVal', 'NacionalidadVal', 'CiudadNacimientoVal', 'LugarDeNacimientoVal', 'DireccionVal' ),
    isDisabledPerfil: not('habilitar'), 

    habilitarIdioma: and('selectValidoIdioma', 'selectValidoLee', 'selectValidoHabla', 'selectValidoEscribe' ),
    isDisabledIdioma: not('habilitarIdioma'), 

    contactoNombreVal: match('formcont.nombreContacto', Validar.textoMinMax),
    contactoDireccionVal: match('formcont.Direccion', Validar.Direccion),
    contactoTelefonoVal: match('formcont.TelefonoDomicilio', Validar.numerosMinMax),
    ContactoDirTrabajoVal: match('formcont.DireccionTrabajo', Validar.Direccion),
    contactoTelTrabajoVal: match('formcont.TelefonoTrabajo', Validar.numerosMinMax),
    contactoCelVal: match('formcont.NroCelular', Validar.numerosMinMax),

    habilitarContacto: and('contactoNombreVal', 'contactoDireccionVal', 'contactoTelefonoVal', 'ContactoDirTrabajoVal', 'contactoTelTrabajoVal', 'contactoCelVal' ),
    isDisabledContacto: not('habilitarContacto'), 

    nombreMedicoVal: match('formmedico.NombreMedico', Validar.textoMinMax),
    telefonoMedicoVal: match('formmedico.TelefonoMedico', Validar.numerosMinMax),
    celularMedicoVal: match('formmedico.NroCelularMedico', Validar.numerosMinMax),    
    medicamentosMedicoVal: match('formmedico.Medicamentos', Validar.Direccion),
    direccionMedicoVal: match('formmedico.DireccionMedico', Validar.Direccion),
    grupoSanguineoMedicoVal: match('formmedico.GrupoSanquineo', Validar.textoMinMax),
    rhSanguineoMedicoVal: match('formmedico.RH_Sanguineo', Validar.textoMinMax),

    habilitarMedico: and('nombreMedicoVal', 'telefonoMedicoVal' , 'celularMedicoVal',
                 'medicamentosMedicoVal', 'direccionMedicoVal' ),
    isDisabledMedico: not('habilitarMedico'),

    

    // longitudApellidoPaterno: match('formp.Apellido1', Validar.textoMinMax ),    
    // ApellidoPaternoValido: and('ApellidoPaternoVal', 'longitudApellidoPaterno'),

    // ApellidoMaternoVal: match('formp.Apellido2', Validar.texto),
    // longitudApellidoMaterno: match('formp.Apellido2', Validar.textoMinMax ),    
    // ApellidoMaternoValido: and('ApellidoMaternoVal', 'longitudApellidoMaterno'),
    
    //FechaNacimientoVal: match('formp.FechaNacimiento', Validar.fecha),
    
    isDisabled: not('FechaNacimientoVal'),

    // NacionalidadVal: match('formp.Nacionalidad', Validar.texto),
    // longitudNacionalidad: match('formp.Nacionalidad', Validar.textoMinMax ),    
    // NacionalidadValido: and('NacionalidadVal', 'longitudNacionalidad'),
    
    // longitudCiudadNacimiento: match('formp.CiudadNacimiento', Validar.textoMinMax ),    
    // CiudadNacimientoValido: and('CiudadNacimientoVal', 'longitudCiudadNacimiento'),

    // LugarDeNacimientoVal: match('formp.CiudadNacimiento', Validar.texto),
    // longitudLugarDeNacimiento: match('formp.CiudadNacimiento', Validar.textoMinMax ),    
    // LugarDeNacimientoValido: and('LugarDeNacimientoVal', 'longitudLugarDeNacimiento'),

    // DireccionVal: match('formp.Direccion', Validar.texto),
    // longitudDireccion: match('formp.Direccion', Validar.textoMinMax ),    
    // DireccionValido: and('DireccionVal', 'longitudDireccion'),

    actions:{
       
        validateFieldsPerfil(){
           // console.log("Validate Fields Ingreso");
            if(this.get("Nombre1") == -1){
                this.set("mensajeErrorTexto", Validar.mensajeTexto);
                this.set("formValidPerfil",false);
            }
            if(this.get("Apellido1") == -1){
                this.set("mensajeErrorDireccion", Validar.mensajeTexto);
                this.set("formValidPerfil",false);
            }
            if(this.get("Apellido2") == -1){
                this.set("mensajeErrorNumeros", Validar.mensajeTexto);
                this.set("formValidPerfil",false);
            }
            if(this.get("FechaNacimiento") == -1){
                this.set("mensajeErrorNumeros", Validar.mensajeFecha);
                this.set("formValidPerfil",false);
            }
            if(this.get("Nacionalidad") == -1){
                this.set("mensajeErrorNumeros", Validar.mensajeTexto);
                this.set("formValidPerfil",false);
            }
            if(this.get("CiudadNacimiento") == -1){
                this.set("mensajeErrorNumeros", Validar.mensajeTexto);
                this.set("formValidPerfil",false);
            }
            if(this.get("Direccion") == -1){
                this.set("mensajeErrorNumeros", Validar.mensajeNumeros);
                this.set("formValid",false);
            }              
        },

        validateFields(){
            //console.log("Validate Fields Ingreso");
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

        clicked(){
            var value = this.get("visible");
            this.set("visible" , !value);
            this.set("nombre", this.get("res").nombre);
        },
        onGuardarPerfil(){   
            //console.log("Ingresa al controlador principal");
            var resultTotal = {};
            var servicioFormulario = this.get("servicioFormulario");
            const formularioService = this.get("formp");             

            this.set("formValidPerfil",true);
            this.send("validateFields");       

            //console.log("validateFieldssss", this.get("formValid"));

            // if(this.get("formValidPerfil") == true){
            //     console.log("SU FORMULARIO ES CORRECTO NUEVO **** ");
            // }
            // else{
            //     console.log("SU FORMULARIO NO ES CORRECTO  NUEVO ###### ");
            // }  

            if(this.get("formValidPerfil")){
                //console.log("Ingreso ala validacion Perfil");
                servicioFormulario.updateFormulario(formularioService)
                .then(resultado=>{
                    //$().alert();
                    alertify.success(resultado.mensaje);
                    // resultTotal.books= resultado;
                    // console.log("Ingreso callformulario");
                    // console.log(resultTotal.books);                
                    // alert(resultTotal.books.mensaje);                                                                
                })
                .catch(error=>{
                    alertify.error(resultado.mensaje);
                    //alert(resultTotal.books.mensaje);                     
                });
            }           
        },  

        onGuardarContacto(){            
            var servicioFormularioContacto = this.get("servicioFormularioContacto");
            //console.log("Ingresa al controlador onGuardarContacto ** CONTACTO **");

           // console.log(this.get("formcont"));
            var rel = "";
            if(this.get("relacion") == undefined){
                rel = this.get("formcont.Relacion");
            }
            else{
                rel = this.get("relacion");
            }
            
            var userData = {                    
                nombreContacto: this.get("formcont.nombreContacto"),    
                Relacion : rel,  
                Direccion: this.get("formcont.Direccion") ,  
                TelefonoDomicilio: this.get("formcont.TelefonoDomicilio"),
                DireccionTrabajo: this.get("formcont.DireccionTrabajo"),
                TelefonoTrabajo: this.get("formcont.TelefonoTrabajo"),
                NroCelular: this.get("formcont.NroCelular"),
            };               
            
            console.log("USER DATA ", userData);
            servicioFormularioContacto.updateFormulario(userData)
            .then(resultado=>{                
                //console.log("controlador servicio", resultado);
                 
                 this.transitionToRoute('index'); 
                 //this.flashMessage('success', 'Content saved!');
                 //alert(resultado.mensaje);  
                 alertify.success(resultado.mensaje);
                 //this.transitionTo('posts');
                //  _this.clearFields();
                // _this.transitionToRoute("/");
            })
            .catch(error=>{
                alertify.error(resultado.mensaje);
                // alert(resultTotal.books.mensaje);                 
            });
        }, 

        onGuardarMedico(){     
            var servicioFormularioMedico = this.get("servicioFormularioMedico");      
           // console.log("Ingresa al controlador principal");
            //var servicioFormularioMedico = this.get("servicioFormularioMedico");
            const formularioService = this.get("formmedico"); 
            //console.log("** MEDICO ** " , servicioFormularioMedico);
           // console.log("** MEDICO FORM ** " , formularioService);            
           // console.log("Ingresa al controlador onGuardarMedico ** MEdico **");
                       
            var userData = {                    
                NombreMedico: this.get("formmedico.NombreMedico"),    
                TelefonoMedico : this.get("formmedico.TelefonoMedico"),    
                NroCelularMedico: this.get("formmedico.NroCelularMedico") ,  
                AlergiasMedicas: this.get("formmedico.AlergiasMedicas"),
                Medicamentos: this.get("formmedico.Medicamentos"),
                DireccionMedico: this.get("formmedico.DireccionMedico"),
                GrupoSanquineo: this.get("formmedico.GrupoSanquineo"),
                RH_Sanguineo: this.get("formmedico.RH_Sanguineo"),
                //Identificador: this.get("formmedico.Identificador"),     
            };  
           // console.log("Ingreso");

             servicioFormularioMedico.updateFormulario(userData)
            .then(resultado=>{                
                this.transitionToRoute('principal'); 
                alertify.success(resultado.mensaje);
                 //this.flashMessage('success', 'Content saved!');
                 //alert(resultado.mensaje);                                                                
            })
            .catch(error=>{
                //alert(resultado.mensaje); 
                alertify.error(resultado.mensaje);
                
            });
        },         

        onGuardarIdiomas(){     
            var servicioIdiomas = this.get("servicioIdiomas");                  
            //var servicioFormularioMedico = this.get("servicioFormularioMedico");
            const formularioService = this.get("formidiomas");             
           // console.log("** IDIOMA FORM ** " , formularioService);            
           // console.log("Ingresa al controlador onGuardarIdiomas ** MEdico **");

            var userData = {
                //FirstName : this.get("name"),                    
                idioma: this.get("selectedIdioma"),                    
                habla: this.get("nivelHabla"),
                lee: this.get("nivelLee"),
                escribe: this.get("nivelEscribe")
            };
           
            //console.log("Ingreso");
            servicioIdiomas.updateFormulario(userData)
            .then(resultado=>{                
                this.transitionToRoute('principal');   
                alertify.success(resultado.mensaje);               
                 //alert(resultado.mensaje);                                                                
            })
            .catch(error=>{
                alertify.error(resultado.mensaje);
                //alert(resultado.mensaje); 
                
            });
        }, 

        // for (const f of object) {
            
        // }
        // for (const f of object) {
            
        // }// for (const f of object) {
            
        // }

        // for (const f of object) {
            
        // }
        // for (const f of object) {
            
        // }

        onGuardarComunicacion(){                    
            var servicioFormulario = this.get("servicioFormulario"); 
            //this.set("selectedComunicacion",value);
            //var servicioFormularioMedico = this.get("servicioFormularioMedico");
            const formularioService = this.get("formcomu");             
           // console.log("** COMUNICACION FORM ** " , formularioService);            
           // console.log("Ingresa al controlador onGuardarIdiomas ** MEdico **");           
            var tipocomu = 0;
            if(this.get("selectedComunicacion") == undefined){
                tipocomu = this.get("formcomu.tipoComunicacionID");
            }
            else{
                tipocomu = this.get("selectedComunicacion");
            }

            var userData = {   
                tipoComunicacionID: tipocomu,
                Valor: this.get("formcomu.Valor")  // formularioService.Valor
            };        
           // console.log("userData " , userData);   
            
            servicioFormulario.updateFormularioComunicacion(userData)
            .then(resultado=>{                
                this.transitionToRoute('principal');
                this.set('botEdi1',!this.botEdi1);  
                alertify.success(resultado.mensaje);                
                 //alert(resultado.mensaje);                                                                
            })
            .catch(error=>{
                alertify.error(resultado.mensaje);
                //alert(resultado.mensaje); 
            });
        }, 

        estadoCivilSelected(value){
           // console.log("Ingresa Estado Civil" , value);
            this.set("estadoCivil",value);
        }, 
        onFechaNac(data){            
            this.send("validateFields");            
          //  console.log("Fecha Seleccionada Fin",  moment(data).format('YYYY/MM/DD'));
         //   console.log("Fecha Seleccionada Fin",  moment(data).format('YYYY/MM/DD'));
            //FechaNacimiento
            this.set("FechaNacimiento",moment(data).format('YYYY/MM/DD'));
         //   console.log("FECHA ACTUAL DE NACIMIENTO -***** " , this.get("FechaNacimiento"));
        },
        relacionSelected(value){
            this.set("selectValidoRelacion", true);            
          //  console.log("Ingresa relacion" , value);
            this.set("relacion",value);
        },

        alergiasSelected(value){
          //  console.log("Ingresa alergias" , value);
            this.set("alergias",value);
        },
        factorSanguineoSelected(value){
          //  console.log("Ingresa factoSanguineo" , value);
            this.set("factoSanguineo",value);
        },
        rhSanguineoSelected(value){
           // console.log("Ingresa rhSanguineo" , value);
            this.set("rhSanguineo",value);
        },

        generarInput: function() {
          //  console.log("Ingreso al generador");      
            this.set('count', this.get('count') + 1);
            //var comp = this.container.lookup('component:foo-bar');
            var applicationInstance = getOwner(this);
            var comp = applicationInstance.lookup('component:foo-bar');
          //  console.log("Componente look", comp)
            comp.set('name', this.get('count'));
            document.getElementsByClassName('table')[0].getElementsByTagName('tbody')[0].innerHTML += '<tr><td><textarea name="Question" placeholder="Question" th:field="${questionAnswerSet.question}" id="question" style="resize: none; width: 100%;"></textarea></td><td><textarea name="Answer" placeholder="Answer" th:field="${questionAnswerSet.answer}" id="answer" style="resize: none; width: 100%;"></textarea></td></tr>';
            // '<div class="input-group-prepend"> {{input value=form.nombreColegio placeholder="Nombre Colegio" class="form-control text-secondary border border-info"}} </div>'
            // 
            //comp.appendTo('#content');
          },

          dobleClick: function(){
              console.log("Doble click");
          },
          funcionDobleClick: function(){
            //botEdi1
            this.set('botEdi1',!this.botEdi1);
            console.log("Doble click Funcion", this.get('botEdi1'));
         }, 
         funcionDobleClickIdioma: function(){
            //botEdi1
            this.set('botEditIdioma',!this.botEditIdioma);
            console.log("Doble click Funcion", this.get('botEditIdioma'));
         },

        comunicacionSelected(value){            
            let selectedRow = this.get('formcomu');
            this.set("formcomu.tipoComunicacionID",value)
           // console.log('dayRow before: ' + selectedRow.Nombre);
          //  console.log("Ingresa selectable" , value);            
            this.set("selectedComunicacion",value);
        },
        idiomaSelected(value){
            this.set("selectValidoIdioma", true);
            //console.log('selected state: ' + state);
            let selectedRow = this.get('formidiomas');
          //  console.log('dayRow before: ' + selectedRow.value);
            // this.get('dayRow').set('state', state);
            // console.log('dayRow after: ' + selectedRow.state);
          //  console.log("Ingresa selectable" , value);
            this.set("selectedIdioma",value);
        },
        nivelSelectedHabla(value){
            this.set("selectValidoHabla", true);
          //  console.log("Ingresa nivel-habla" , value);
            this.set("nivelHabla",value);
        },
        nivelSelectedLee(value){
            this.set("selectValidoLee", true);
         //   console.log("Ingresa selectable-nivel-lee" , value);
            this.set("nivelLee",value);
        },
        nivelSelectedEscribe(value){
            this.set("selectValidoEscribe", true);
           // console.log("Ingresa selectable-nivel-escribe" , value);
            this.set("nivelEscribe",value);
        },
        borrarIdioma(dato){
           // console.log("Ingreso ", dato);
            var servicioIdiomas = this.get("servicioIdiomas");  
            
            servicioIdiomas.deleteFormulario(dato)
            .then(resultado=>{                
                this.transitionToRoute('principal');                  
                 alert(resultado.mensaje);    
                 location.reload();                                                              
            })
            .catch(error=>{
                alert(resultado.mensaje);                 
            });           
         //  console.log("ACCION **" , dato);
        },
        editarComunicacion(event){
            this.set("formcomu.tipoComunicacionID",event.tipoComunicacionID)
            this.set("formcomu.Valor",event.Valor)          
          // console.log("ACCION **" , event.tipoComunicacionID); 
         //  console.log("ACCION **" , event.Valor); 
        },         
        // editarPerfil(event){
        //     this.set("formcomu.tipoComunicacionID",event.tipoComunicacionID)
        //     this.set("formcomu.Valor",event.Valor)          
        //    console.log("ACCION **" , event.tipoComunicacionID); 
        //    console.log("ACCION **" , event.Valor); 
        // },       

        onFechaNacimiento(data){
            this.send("validateFields");                        
           // console.log("Fecha Seleccionada NAcimiento",   moment(data).format('YYYY/MM/DD'));            
          //  console.log(this.get("FechaNacimiento"));
            this.set("FechaNacimiento", moment(data).format('YYYY/MM/DD'));
        },          

    }
    
});
