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
    formacionV2:false,
    perfilV:true,
    botEdi1 : false,    
    isDisabledComunicacion: not('botEdi1'),

    botEditIdioma : false,
    isDisabledIdiomaBoton: not('botEditIdioma'),
    direccionFoto: 'Content/img/images.jpg',

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

    NombreVal: match('formp.Nombre1', Validar.textoMinMax),
    ApellidoPaternoVal: match('formp.Apellido1', Validar.textoMinMax),
    ApellidoMaternoVal: match('formp.Apellido2', Validar.textoMinMax),
    FechaNacimientoVal: match('formp.FechaNacimiento', Validar.fecAMD ),///^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/),
    NacionalidadVal: match('formp.Nacionalidad', Validar.textoMinMax),
    CiudadNacimientoVal: match('formp.CiudadNacimiento', Validar.textoMinMax),
    LugarDeNacimientoVal: match('formp.LugarDeNacimiento', Validar.textoMinMax),
    DireccionVal: match('formp.Direccion', Validar.Direccion),

    habilitar: and('NombreVal', 'ApellidoPaternoVal', 'ApellidoMaternoVal', 'FechaNacimientoVal', 'NacionalidadVal', 'CiudadNacimientoVal', 'LugarDeNacimientoVal', 'DireccionVal' ),
   // habilitar: and('NombreVal', 'FechaNacimientoVal', 'NacionalidadVal', 'CiudadNacimientoVal', 'LugarDeNacimientoVal', 'DireccionVal' ),
    //isDisabledPerfil: not('habilitar'), 

    habilitarIdioma: and('selectValidoIdioma', 'selectValidoLee', 'selectValidoHabla', 'selectValidoEscribe' ),
    isDisabledIdioma: not('habilitarIdioma'), 

        // ---- Validar Contactos de Emergencia
    contactoNombreVal: match('formcont.nombreContacto', Validar.textoMinMax),
    contactoDireccionVal: match('formcont.Direccion', Validar.Direccion),
    contactoTelefonoVal: match('formcont.TelefonoDomicilio', Validar.numerosMinMax),
    ContactoDirTrabajoVal: match('formcont.DireccionTrabajo', Validar.Direccion),
    contactoTelTrabajoVal: match('formcont.TelefonoTrabajo', Validar.numerosMinMax),
    contactoCelVal: match('formcont.NroCelular', Validar.numerosMinMax),   
    habilitarContacto: and('contactoNombreVal', 'contactoDireccionVal', 'contactoCelVal' ),
    isDisabledContacto: not('habilitarContacto'),
    mensajeErrorTextoContacto: 'Campo obligado.',
    mensajeErrorTextoContactov: not('contactoNombreVal'), 


        // ---- Validar Medico Cabecera
    mensajeErrorTextoNombre: '',
    mensajeErrorTextoTelefono: '',
    mensajeErrorTextoCelular: '',
    mensajeErrorTextoMedicamento: '',
    mensajeErrorTextoDireccion: '',
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
    isDisabled: not('FechaNacimientoVal'),

    actions:{

        clearFieldsPerfil(){
            this.set("mensajeErrorTextoNombre");
            this.set("mensajeErrorTextoTelefono");
            this.set("mensajeErrorTextoCelular");
            this.set("mensajeErrorTextoMedicamento");
            this.set("mensajeErrorTextoDireccion");
            this.set("mensajeErrorTexto");
            this.set("mensajeErrorNumerosFijo");
            this.set("mensajeErrorNumerosCelular");
            this.set("mensajeErrorDireccion");
            this.set("mensajeErrorFecha");
        },
       
        validateFieldsPerfil(){           
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

        validateFieldsMedico(){
            console.log("DATOS ****---- ????? " , this.get("formmedico"));           
            if(this.get("formmedico.NombreMedico") == null){
                this.set("mensajeErrorTextoNombre", Validar.mensajeTexto);
                this.set("formValidMedico",false);
            }
            if(this.get("formmedico.TelefonoMedico") == null){
                this.set("mensajeErrorTextoTelefono", Validar.mensajeNumeros);
                this.set("formValidMedico",false);
            }
            if(this.get("formmedico.formmedico.mensajeErrorTextoCelular") == null){
                this.set("mensajeErrorTextoCelular", Validar.mensajeNumeros);
                this.set("formValidMedico",false);
            }            
            // if(this.get("formmedico.AlergiasMedicas") == null){
            //     this.set("mensajeErrorTextoNombre", Validar.mensajeTexto);
            //     this.set("formValidMedico",false);
            // }
            // if(this.get("formmedico.Medicamentos") == null){                
            //     this.set("mensajeErrorTextoMedicamento", Validar.mensajeTexto);
            //     this.set("formValidMedico",false);
            // }                         
            // if(this.get("formmedico.DireccionMedico") == null){                
            //     this.set("mensajeErrorTextoDireccion", Validar.mensajeDireccion);
            //     this.set("formValidMedico",false);
            // }                          
        },

        clicked(){
            var value = this.get("visible");
            this.set("visible" , !value);
            this.set("nombre", this.get("res").nombre);
        },
        onGuardarPerfil(){               
            var resultTotal = {};
            var servicioFormulario = this.get("servicioFormulario");
            const formularioService = this.get("formp");  
            
            //console.log("estado civil .... " , this.get("estadoCivil"));
            //console.log("form Estado civil .... " , this.get("formp.EstadoCivil"));
            var Civil = 0;
            if(this.get("estadoCivil") == undefined){                
                Civil =  this.get("formp.EstadoCivil");
                //console.log("Indefinido = ", Civil);
            }
            else{
                Civil = this.get("estadoCivil");
                //console.log("sELECCIONADO = ", Civil);
            }
            
            this.set("formValidPerfil",true);
            this.send("validateFields");
            
                    
            var userData = {                    
                Nombre1: formularioService.Nombre1,
                Apellido1 : formularioService.Apellido1,
                Apellido2: formularioService.Apellido2,
                FechaNacimiento: formularioService.FechaNacimiento,
                Nacionalidad: formularioService.Nacionalidad,
                CiudadNacimiento: formularioService.CiudadNacimiento,
                LugarDeNacimiento: formularioService.LugarDeNacimiento,
                Direccion: formularioService.Direccion,
                EstadoCivil: Civil
            }; 


             //console.log("userData : " , userData);
            // console.log("Formulario : " , formularioService);
            if(this.get("formValidPerfil")){
                servicioFormulario.updateFormulario(userData)
                .then(resultado=>{                    
                    alertify.success(resultado.mensaje);  
                    this.send("clearFieldsPerfil"); 
                    this.send("refreshRoute");                                     
                })
                .catch(error=>{
                    alertify.error(resultado.mensaje);                    
                });
            }           
        },  

        onGuardarContacto(){            
            var servicioFormularioContacto = this.get("servicioFormularioContacto");
            var rel = "";
            if(this.get("relacion") == undefined){
                rel = this.get("formcont.Relacion");
            }
            else{
                rel = this.get("relacion");
            }
            
            var userData = {                    
                nombreContacto: this.get("formcont.nombreContacto").toUpperCase(),    
                Relacion : rel,  
                Direccion: this.get("formcont.Direccion") ,  
                TelefonoDomicilio: this.get("formcont.TelefonoDomicilio"),
                DireccionTrabajo: this.get("formcont.DireccionTrabajo"),
                TelefonoTrabajo: this.get("formcont.TelefonoTrabajo"),
                NroCelular: this.get("formcont.NroCelular"),
            };                                       
           
            servicioFormularioContacto.updateFormulario(userData)
            .then(resultado=>{                                 
                 alertify.success(resultado.mensaje);
                 this.send("clearFieldsPerfil");
                 this.send("refreshRoute");
                 //this.transitionToRoute('/'); 
            })
            .catch(error=>{
                alertify.error(resultado.mensaje);                
            });
        }, 


        onGuardarMedico(){     
            var servicioFormularioMedico = this.get("servicioFormularioMedico");      
            const formularioService = this.get("formmedico");            
           //this.send("validateFieldsMedico");     
           console.log("Datos Formulario ** -->>> ", formularioService);
           console.log("Datos validos o no ", this.get("formValidMedico"));       
            // if(this.get("formValidMedico")){
            //     console.log("Ingreso al FieldsMedico");
            // }

            if(this.get("formmedico.NombreMedico") == null){
                this.set("formmedico.NombreMedico", '');
            }
            if(this.get("formmedico.TelefonoMedico") == null){
                this.set("formmedico.TelefonoMedico", '');
            }
            if(this.get("formmedico.NroCelularMedico") == null){
                this.set("formmedico.NroCelularMedico", '');
            }
            if(this.get("formmedico.AlergiasMedicas") == null){
                this.set("formmedico.AlergiasMedicas", '');
            }
            if(this.get("formmedico.Medicamentos") == null){
                this.set("formmedico.Medicamentos", '');
            }
            if(this.get("formmedico.DireccionMedico") == null){
                this.set("formmedico.DireccionMedico", '');
            }
            //revisar
            var alergiaD = '';
            var factoSan = '';
            var rhSan = '';
            if(this.get("alergias") == undefined){
                console.log("No selecciono ninguna alergia");
                alergiaD = this.get("formmedico.AlergiasMedicas");
            }
            else{
                alergiaD = this.get("alergias");
            }
            if(this.get("factoSanguineo") == undefined){
                factoSan = this.get("formmedico.GrupoSanquineo");
            }
            else{
                factoSan = this.get("factoSanguineo");
            }
            if(this.get("rhSanguineo") == undefined){
                rhSan = this.get("formmedico.RH_Sanguineo");
            }
            else{
                rhSan = this.get("rhSanguineo");
            }            
            
            var userData = {                    
                NombreMedico: this.get("formmedico.NombreMedico"),    
                TelefonoMedico : this.get("formmedico.TelefonoMedico"),    
                NroCelularMedico: this.get("formmedico.NroCelularMedico") ,  
                AlergiasMedicas: alergiaD,
                Medicamentos: this.get("formmedico.Medicamentos"),
                DireccionMedico: this.get("formmedico.DireccionMedico"),
                GrupoSanquineo: factoSan,
                RH_Sanguineo: rhSan,
                //Identificador: this.get("formmedico.Identificador"),     
            };

            console.log("USER dATA", userData);
              
           // console.log("Ingreso");
           console.log("ingresa formulario" , this.get('isDisabledMedico'));
           if(this.get('isDisabledMedico') == false){
                console.log("ingresa formulario");
           }

             servicioFormularioMedico.updateFormulario(userData)
            .then(resultado=>{                
                this.transitionToRoute('/'); 
                alertify.success(resultado.mensaje);
                this.send("clearFieldsPerfil");
                this.send("refreshRoute");
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
           
           // console.log("Ingreso");
            servicioIdiomas.updateFormulario(userData)
            .then(resultado=>{       
                console.log("Idiomas" , resultado); 
                alertify.success(resultado.mensaje);
                this.send("clearFieldsPerfil");               
                this.send("refreshRoute");
                //this.transitionToRoute('/');   
                 //alert(resultado.mensaje);                                                                
            })
            .catch(error=>{
                alertify.error(resultado.mensaje);
                //alert(resultado.mensaje); 
                
            });
        },         

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
            console.log("userData " , userData);   
            
            servicioFormulario.updateFormularioComunicacion(userData)
            .then(resultado=>{        
                this.set('botEdi1',!this.botEdi1);
                if(resultado.codigo == 1){
                    alertify.success(resultado.mensaje);
                }  
                else{
                    alertify.error(resultado.mensaje);
                }      
                this.send("clearFieldsPerfil");          
                this.send("refreshRoute");
                //this.transitionToRoute('/');
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
           // console.log("Fecha Seleccionada Fin",  moment(data).format('YYYY/MM/DD'));
          //  console.log("Fecha Seleccionada Fin",  moment(data).format('YYYY/MM/DD'));
            //FechaNacimiento
            this.set("FechaNacimiento",moment(data).format('YYYY/MM/DD'));
           // console.log("FECHA ACTUAL DE NACIMIENTO -***** " , this.get("FechaNacimiento"));
        },
        relacionSelected(value){
            this.set("selectValidoRelacion", true);            
           // console.log("Ingresa relacion" , value);
            this.set("relacion",value);
        },

        alergiasSelected(value){
           // console.log("Ingresa alergias" , value);
            this.set("alergias",value);
        },
        factorSanguineoSelected(value){
           // console.log("Ingresa factoSanguineo" , value);
            this.set("factoSanguineo",value);
        },
        rhSanguineoSelected(value){
           // console.log("Ingresa rhSanguineo" , value);
            this.set("rhSanguineo",value);
        },

        generarInput: function() {
           // console.log("Ingreso al generador");      
            this.set('count', this.get('count') + 1);
            //var comp = this.container.lookup('component:foo-bar');
            var applicationInstance = getOwner(this);
            var comp = applicationInstance.lookup('component:foo-bar');
           // console.log("Componente look", comp)
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
            //console.log('dayRow before: ' + selectedRow.Nombre);
           // console.log("Ingresa selectable" , value);            
            this.set("selectedComunicacion",value);
        },
        idiomaSelected(value){
            this.set("selectValidoIdioma", true);
            //console.log('selected state: ' + state);
            let selectedRow = this.get('formidiomas');
           // console.log('dayRow before: ' + selectedRow.value);
            // this.get('dayRow').set('state', state);
            // console.log('dayRow after: ' + selectedRow.state);
           // console.log("Ingresa selectable" , value);
            this.set("selectedIdioma",value);
        },
        nivelSelectedHabla(value){
            this.set("selectValidoHabla", true);
           // console.log("Ingresa nivel-habla" , value);
            this.set("nivelHabla",value);
        },
        nivelSelectedLee(value){
            this.set("selectValidoLee", true);
           // console.log("Ingresa selectable-nivel-lee" , value);
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
                alertify.alert(resultado.mensaje);
                this.send("clearFieldsPerfil");
                this.send("refreshRoute");
                // this.transitionToRoute('/index');                                      
                //  location.reload();                                                              
            })
            .catch(error=>{
                alertify.error(resultado.mensaje);     
            });           
          // console.log("ACCION **" , dato);
        },
        editarComunicacion(event){
             console.log("ACCION **" , event.tipoComunicacionID); 
             console.log("ACCION Valor **" , event.Valor); 
            this.set("formcomu.tipoComunicacionID",event.tipoComunicacionID)
            this.set("formcomu.Valor",event.Valor)          
          // console.log("ACCION **" , event.tipoComunicacionID); 
          // console.log("ACCION **" , event.Valor); 
        }, 
        nuevoComunicacion(){            
            this.set("formcomu.Valor",'') ;
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
           // console.log(this.get("FechaNacimiento"));
            this.set("FechaNacimiento", moment(data).format('YYYY/MM/DD'));
        },          

    }
    
});
