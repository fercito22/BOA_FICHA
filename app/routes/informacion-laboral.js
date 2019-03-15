import Route from '@ember/routing/route';
import {inject} from '@ember/service';
import Config from '../models/config';

export default Route.extend({
    beforeModel() {
        if(Config.usuario_id == 0){
            this.replaceWith('application');
        }
        else{
            this.replaceWith('informacion-laboral');
        }
      },
     
     servicioExpLaboral: inject("servicio-experiencia-laboral"),
     servicioVacaciones: inject("servicio-vacaciones"),    
     servicioEntrenamiento: inject("servicio-entrenamiento"),
   
    model(){             
      
        var servicioExpLaboral = this.get("servicioExpLaboral");
        var servicioVacaciones = this.get("servicioVacaciones");    
        var servicioEntrenamiento = this.get("servicioEntrenamiento");          
        var resultTotal = {};

        return servicioExpLaboral.callExperienciaLaboral()
            .then(resultado=>{
                resultTotal.resultLaboral= resultado;
               // console.log("Experiencia Laboral");
              //  console.log(resultTotal.resultLaboral);
                return resultTotal;
            }) 
            .then(resultTotal=>{
                return servicioVacaciones.callVacaciones()
                .then(resultado=>{
                    resultTotal.resultVacaciones= resultado;
                   // console.log("Vacaciones");
                   // console.log(resultTotal.resultVacaciones);
                    return resultTotal;
                })
            })  
            .then(resultTotal=>{
                return servicioEntrenamiento.callCursosEntrenamiento()
                .then(resultado=>{
                    resultTotal.resultEntrenamiento= resultado;
                  //  console.log("Entrenamiento");
                 //   console.log(resultTotal.resultEntrenamiento);
                    return resultTotal;
                })
            })
            .catch(()=>{
                return resultTotal;
            }); 
    },   
    
    // asignamos el modelo al controlador
    setupController(controller , model ){ 
        controller.set('webapidataG',model.resultLaboral);
        controller.set('webapidataH',model.resultVacaciones);   
        controller.set('webapidataJ',model.resultEntrenamiento);
    }
    
});


