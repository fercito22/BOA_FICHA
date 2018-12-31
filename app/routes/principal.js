
// import Route from '@ember/routing/route';

// export default Route.extend({
//     beforeModel() {
//         this.replaceWith('principal');
//       }   
// });


// import Route from '@ember/routing/route';

// export default Route.extend({
//     beforeModel() {
//         this.replaceWith('principal');
//       }
// });


import Route from '@ember/routing/route';
//import hasEmberVersion from 'ember-test-helpers/has-ember-version';
import {inject} from '@ember/service';

export default Route.extend({
    beforeModel() {
        this.replaceWith('principal');
      },
      valuesService: inject("perfil-servicio"),
      servicioIdiomas: inject("idiomas-servicio"),
      servicioContacto: inject("servicio-contacto-emergencia"),
      servicioMedico: inject("servicio-medico-cabecera"),
      servicioBachiller: inject("servicio-bachiller"),
      servicioFormacionAcademica: inject("servicio-formacion-academica"),
      servicioExpLaboral: inject("servicio-experiencia-laboral"),
      servicioVacaciones: inject("servicio-vacaciones"),
      servicioBeneficiarios: inject("servicio-beneficiarios"),
      servicioEntrenamiento: inject("servicio-entrenamiento"),
      servicioMemorandum: inject("servicio-memorandum"),
      servicioDeclaracion: inject("servicio-declaracion"),
      servicioFotografia: inject("servicio-fotografia"), 
      
      servicioCombo: inject("combos"),   
     
   
    model(){
             
        var valuesService = this.get("valuesService");
        var servicioIdiomas = this.get("servicioIdiomas");
        var servicioContacto = this.get("servicioContacto");
        var servicioMedico = this.get("servicioMedico");
       var servicioBachiller = this.get("servicioBachiller");
       var servicioFormacionAcademica = this.get("servicioFormacionAcademica");
       var servicioExpLaboral = this.get("servicioExpLaboral");
       var servicioVacaciones = this.get("servicioVacaciones");
       var servicioBeneficiarios = this.get("servicioBeneficiarios");
       var servicioEntrenamiento = this.get("servicioEntrenamiento");
       var servicioMemorandum = this.get("servicioMemorandum");
       var servicioDeclaracion = this.get("servicioDeclaracion");
       var servicioFotografia = this.get("servicioFotografia");

       var servicioCombo = this.get("servicioCombo");
       
        var resultTotal = {};
       // console.log("Ingresa");
      

        return valuesService.callPerfil()
            .then(resultado=>{
                resultTotal.resultPerfil= resultado;
                console.log("Perfil",resultTotal.resultPerfil);
                return resultTotal;
            })
            .then(resultTotal=>{
                    return servicioIdiomas.callIdiomas()
                    .then(resultado=>{
                        resultTotal.resultIdioma= resultado;
                        console.log("IDIOMAS ",resultTotal.resultIdioma);
                        return resultTotal;
                    })
                })
                .then(resultTotal=>{
                    return servicioContacto.callContactoEmergencia()
                    .then(resultado=>{
                        resultTotal.resultEmergencia= resultado;
                        console.log(resultTotal.resultEmergencia);
                        return resultTotal;
                    })
                })
                .then(resultTotal=>{
                    return servicioMedico.callMedicoCabecera()
                    .then(resultado=>{
                        resultTotal.resultCabecera= resultado;
                        console.log("Cabecera");
                        console.log(resultTotal.resultCabecera);
                        return resultTotal;
                    })
                })
                .then(resultTotal=>{
                    return servicioBachiller.callBachiller()
                    .then(resultado=>{
                        resultTotal.resultBachiller= resultado;
                        console.log("BACHILER");
                        console.log(resultTotal.resultBachiller);
                        return resultTotal;
                    })
                })    
                .then(resultTotal=>{
                    return servicioFormacionAcademica.callFormacionAcademica()
                    .then(resultado=>{
                        resultTotal.resultFormacion= resultado;
                        console.log("Formacion");
                        console.log(resultTotal.resultFormacion);
                        return resultTotal;
                    })
                })
                .then(resultTotal=>{
                    return servicioExpLaboral.callExperienciaLaboral()
                    .then(resultado=>{
                        resultTotal.resultLaboral= resultado;
                        console.log("Experiencia Laboral");
                        console.log(resultTotal.resultLaboral);
                        return resultTotal;
                    })
                })
                .then(resultTotal=>{
                    return servicioVacaciones.callVacaciones()
                    .then(resultado=>{
                        resultTotal.resultVacaciones= resultado;
                        console.log("Vacaciones");
                        console.log(resultTotal.resultVacaciones);
                        return resultTotal;
                    })
                })
                .then(resultTotal=>{
                    return servicioBeneficiarios.callBeneficiarios()
                    .then(resultado=>{
                        resultTotal.resultBeneficiarios= resultado;
                        console.log("Beneficiarios");
                        console.log(resultTotal.resultBeneficiarios);
                        return resultTotal;
                    })
                })
                .then(resultTotal=>{
                    return servicioEntrenamiento.callCursosEntrenamiento()
                    .then(resultado=>{
                        resultTotal.resultEntrenamiento= resultado;
                        console.log("Entrenamiento");
                        console.log(resultTotal.resultEntrenamiento);
                        return resultTotal;
                    })
                })
                .then(resultTotal=>{
                    return servicioMemorandum.callMemorandum()
                    .then(resultado=>{
                        resultTotal.resultMemo= resultado;
                        console.log("MEmo");
                        console.log(resultTotal.resultMemo);
                        return resultTotal;
                    })
                })
                .then(resultTotal=>{
                    return servicioDeclaracion.getDeclaracion()
                    .then(resultado=>{
                        resultTotal.resultDeclaracion= resultado;
                        console.log("Declaracion");
                        console.log(resultTotal.resultDeclaracion);
                        return resultTotal;
                    })
                })
                .then(resultTotal=>{
                return servicioFotografia.callFotografia()
                .then(resultado=>{
                    console.log("Fotografia", resultado);
                    //resultTotal.resultFotografias= JSON.parse(resultado);                        
                    //var json = JSON.parse(resultado);
                    console.log("Mi Fotografia " , resultado.datos[0].url_image);
                    //console.log("Fotografia 2 ", resultado );
                    //console.log(resultTotal.resultFotografias.datos[0].url_image);                        
                    // console.log(resultTotal.resultFotografias);
                    //var url = resultTotal.resultFotografias.datos;
                    var url = resultado.datos[0].url_image;
                    console.log( url);
                    resultTotal.resultFotografias = url;     
                    console.log(resultTotal.resultFotografias);                   
                    return resultTotal;
                })
            })
            .then(resultTotal=>{
                return servicioCombo.callEstadoCivil()
                .then(resultado=>{
                    resultTotal.EstadoCivil= resultado;
                    console.log("Estado Civil Combo: ", resultTotal.EstadoCivil);
                    return resultTotal;
                })
              }) 
              .then(resultTotal=>{
                return servicioCombo.callCombosParentesco()
                .then(resultado=>{
                    resultTotal.resultCombosParentesco= resultado;
                    console.log("Tipo Colegio",resultTotal.resultCombosParentesco);
                    return resultTotal;
                })
              })
              .then(resultTotal=>{
                return servicioCombo.callCombosAlergiasMedicas()
                .then(resultado=>{
                    resultTotal.AlergiasMedicas= resultado;
                    console.log("Alergias Medicas",resultTotal.AlergiasMedicas);
                    return resultTotal;
                })
              })
              .then(resultTotal=>{
                return servicioCombo.callFactorSanguineo()
                .then(resultado=>{
                    resultTotal.FactorSanguineo= resultado;
                    console.log("Factor Sanguineo",resultTotal.FactorSanguineo);
                    return resultTotal;
                })
              })
              .then(resultTotal=>{
                return servicioCombo.callCombosIdiomas()
                .then(resultado=>{
                    resultTotal.resultIdiomaCombo= resultado;
                    console.log("COMBO IDIOMAS $$", resultTotal.resultIdiomaCombo);
                    return resultTotal;
                })
              }) 
              .then(resultTotal=>{
                return servicioCombo.callComboComunicacion()
                .then(resultado=>{
                    resultTotal.resultComunicacionCombo= resultado;
                    console.log("COMBO COMUNICACION ", resultTotal.resultComunicacionCombo);
                    return resultTotal;
                })
              })
                               
                
            .catch(()=>{
                return resultTotal;
            }); 
    },   
    
    // asignamos el modelo al controlador
    setupController(controller , model ){    

        console.log("Ingreso formulario perfil ruta");
        
        //  console.log(model);
        if(model.resultPerfil[0].LugarDeNacimiento == null){
            var Ciudad = "";
            var Pais = "";
        }
        else{
            var Ciudad = model.resultPerfil[0].LugarDeNacimiento.split('/')[0];
            var Pais = model.resultPerfil[0].LugarDeNacimiento.split('/')[1];
            console.log(Ciudad ,Pais);
        }        
       
          this._super(controller, model);
         this.controller.set('formp.Nombre1',  model.resultPerfil[0].Nombre1);
        this.controller.set('formp.Apellido1',  model.resultPerfil[0].Apellido1);
        this.controller.set('formp.Apellido2',  model.resultPerfil[0].Apellido2);
        this.controller.set("formp.FechaNacimiento",moment(model.resultPerfil[0].FechaNacimiento).format('YYYY/MM/DD'));
        ///this.controller.set("formp.FechaVencimiento",model.resultPerfil[0].FechaNacimiento);
        console.log("Fecha naciimento #**",model.resultPerfil[0].FechaNacimiento);
        console.log("Fecha naciimento #**2",moment(model.resultPerfil[0].FechaNacimiento).format('YYYY/MM/DD'));

        this.controller.set("vFrom",model.resultPerfil[0].FechaNacimiento);  

        this.controller.set('formp.Nacionalidad',  model.resultPerfil[0].Nacionalidad);
        this.controller.set('formp.CiudadNacimiento', Ciudad);
        this.controller.set('formp.LugarDeNacimiento', Pais);        
        this.controller.set('formp.Direccion',  model.resultPerfil[0].Direccion);
        this.controller.set('formp.EstadoCivil',  model.resultPerfil[0].EstadoCivil);

        /// ******** Contacto Emergencia
        this.controller.set('formcont.nombreContacto',  model.resultEmergencia[0].NombreContacto);
        this.controller.set('formcont.Relacion',  model.resultEmergencia[0].Relacion);
        this.controller.set('formcont.Direccion',  model.resultEmergencia[0].Direccion);
        this.controller.set('formcont.DireccionTrabajo',  model.resultEmergencia[0].DireccionTrabajo);
        this.controller.set('formcont.TelefonoTrabajo',  model.resultEmergencia[0].TelefonoTrabajo);
        this.controller.set('formcont.TelefonoDomicilio',  model.resultEmergencia[0].TelefonoDomicilio);
        this.controller.set('formcont.NroCelular',  model.resultEmergencia[0].NroCelular);
        //controller.set('ContactoEmergencia',model.ContactoEmergencia);
        controller.set('CombosParentesco',model.resultCombosParentesco);

        //********** MEDICO CABECERA */
        this.controller.set('formmedico.NombreMedico',  model.resultCabecera[0].NombreMedico);
        this.controller.set('formmedico.TelefonoMedico',  model.resultCabecera[0].TelefonoMedico);
        this.controller.set('formmedico.NroCelularMedico',  model.resultCabecera[0].NroCelularMedico);
        this.controller.set('formmedico.AlergiasMedicas',  model.resultCabecera[0].AlergiasMedicas);
        this.controller.set('formmedico.Medicamentos',  model.resultCabecera[0].Medicamentos);
        this.controller.set('formmedico.DireccionMedico',  model.resultCabecera[0].DireccionMedico);
        this.controller.set('formmedico.GrupoSanquineo',  model.resultCabecera[0].GrupoSanquineo);
        this.controller.set('formmedico.RH_Sanguineo',  model.resultCabecera[0].RH_Sanguineo);

        //******* COMUNICACION */
        //this.controller.set('formcomu.tipoComunicacionID',  model.resultPerfil[0].tipoComunicacionID);
        //this.controller.set('formcomu.Valor',  model.resultPerfil[0].Valor);

        //*** Idiomas */
        this.controller.set('formidiomas.idiomaID',  model.resultIdioma[0].idiomaID);
        this.controller.set('formidiomas.nivelHabla',  model.resultIdioma[0].Habla);
        this.controller.set('formidiomas.nivelLee',  model.resultIdioma[0].Lee);
        this.controller.set('formidiomas.nivelEscribe',  model.resultIdioma[0].Escribe);

        controller.set('webapidataComboIdioma',model.resultIdiomaCombo);
        controller.set('webapidataComunicacion',model.resultComunicacionCombo);
       
        //console.log("Ingresa controller" , controller.set('webapidata',model.resultA));           
        controller.set('webapidata',model.resultPerfil);
        controller.set('webapidataIdiomas',model.resultIdioma);
        controller.set('webapidataC',model.resultEmergencia);
        controller.set('webapidataD',model.resultCabecera);
        controller.set('webapidataE',model.resultBachiller);
        controller.set('webapidataF',model.resultFormacion);
        controller.set('webapidataG',model.resultLaboral);
        controller.set('webapidataH',model.resultVacaciones);
        controller.set('webapidataI',model.resultBeneficiarios);
        controller.set('webapidataJ',model.resultEntrenamiento);
        controller.set('webapidataK',model.resultMemo);
        controller.set('webapidataL',model.resultDeclaracion);   

        controller.set('MedicoCabecera',model.resultCabecera);        
        controller.set('AlergiasMedicas',model.AlergiasMedicas);
        controller.set('CombosFactorSanguineo',model.FactorSanguineo);

        controller.set('webapidataCivil',model.EstadoCivil);  
        
        controller.set('webapidataFotografia',model.resultFotografias);   

    }
    
});


