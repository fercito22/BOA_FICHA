import Controller from '@ember/controller';
import {inject} from '@ember/service';
import { match, not } from '@ember/object/computed';
import Validar from '../models/validaciones'
import { and } from '@ember/object/computed';
import Config from '../models/config'

export default Controller.extend({    
    servicioFormulario: inject("servicio-tallas"),
    
    obj:  {                
        CantidadMovimiento: '',
        CodTalla: '',
        CodigoTran: '',
        EsExtra: '',
        fechaMov: '',
        prenda: '',
        CodigoTran: '',
        usuario: '',
    },
    
    tipoColegio: -1,
    ultimoCursoVencido: -1, 
    fechaActual: '',  
    objeto2: '',
    desabilitado: true,
    isDisabledTallas: true,

    form:  {                
        CodTalla: '',
        Talla: '',
        EmpleadoItemID: ''
    },

    //// **********     Formacion Academica   
        visiblePaises: false,

    // **** VALIDACION ***
    mensajeErrorColegio: '',
    mensajeErrorLugar: '', 

    clearFields(){
        this.set("tipoColegio",null);    
        this.set("ultimoCursoVencido",null);    
    },
    
    
    validateFields(){       
        if(this.get("ultimoCursoVencido") == -1){
            //this.set("nivelHablaErrorMessage",resourceLoader.resourcesES.ThisFieldIsMandatory);
            //this.set("formValid",false);
        }           
    },

    actions:{
        listarDetalle(){
            const formularioService = this.get("form");             
            var userData = {                    
                codigoActual: this.get("fechaActual"),
            };                          
            
            //console.log("userData", userData);            
            
            
            var servicioFormulario = this.get("servicioFormulario");                       
            servicioFormulario.updateFormulario(userData)
            .then(resultado=>{
               // console.log("controlador servicio");              
                // alert(resultTotal.books.mensaje);                                                                
            })
            .catch(error=>{
                // alert(resultTotal.books.mensaje);                 
            });
        },  
        gestionSelected(value){
            // document.getElementsByClassName('table')[0].innerHTML += '<tr><td><textarea name="Question" placeholder="Question" th:field="${questionAnswerSet.question}" id="question" style="resize: none; width: 100%;"></textarea></td><td><textarea name="Answer" placeholder="Answer" th:field="${questionAnswerSet.answer}" id="answer" style="resize: none; width: 100%;"></textarea></td></tr>';
            //document.getElementsByClassName('table')[0].innerHTML += '<tr><td>{{#each webapidataTallasDetalle as |item|}}          <h6>{{item.CantidadMovimiento}}</h6>          <h6>{{item.CodigoTran}}</h6>           <h6>{{item.fechaMov}}</h6>           {{render}}       {{/each}} </td></tr>';
            var servicioTallas = this.get("servicioFormulario");
          //  console.log("Ingresa gestion" , value);
            this.set("obj.CantidadMovimiento", "asdsadasd");  
            Config.Variable = value;            
            var objetos = new Object();

            servicioTallas.callDetalleTallas(value)
            .then(resultado=>{
                var contador = 0;                
                resultado.objeto.forEach(element => {
                    contador++;
                    var str= element.CodigoTran ;
                    element.CodigoTran  = str.replace("$$$",element.CantidadMovimiento);                    
                    if(element.EsExtra == false){
                        element.EsExtra = "NO";
                    }
                    else{
                        element.EsExtra = "SI";
                    }
                    this.send("refreshRoute");   
                });

                objetos = resultado.objeto;

                this.set('objeto2' , resultado.objeto);              
            })
            
            .catch(error=>{
                // alert(resultTotal.books.mensaje);                 
            });   
           // console.log("objetos", this.get('objeto2'));             
        },

        onGuardar(){   
          //  console.log("Ingresa al onGuardar Tallas");
            // var resultTotal = {};
            // var servicioFormulario = this.get("servicioFormulario");
            // const formularioService = this.get("formp");             

            // this.set("formValidPerfil",true);
            // this.send("validateFields");       

            // console.log("validateFieldssss", this.get("formValid"));

            // if(this.get("formValidPerfil") == true){
            //     console.log("SU FORMULARIO ES CORRECTO NUEVO **** ");
            // }
            // else{
            //     console.log("SU FORMULARIO NO ES CORRECTO  NUEVO ###### ");
            // }  

            // if(this.get("formValidPerfil")){
            //     console.log("Ingreso ala validacion Perfil");
            //     servicioFormulario.updateFormulario(formularioService)
            //     .then(resultado=>{
            //         resultTotal.books= resultado;
            //         console.log("Ingreso callformulario");
            //         console.log(resultTotal.books);                
            //         alert(resultTotal.books.mensaje);                                                                
            //     })
            //     .catch(error=>{
            //         alert(resultTotal.books.mensaje);                     
            //     });
            // }           
        },        

        setupController(controller , model ){ 
            controller.set('webapidataTallasDetalle',model.detalleNuevo);
        },
        
        prendaSelected(data){            
            var servicioFormulario = this.get("servicioFormulario");
            var res = data.split(",");          
            this.set("form.CodTalla", res[0]);
            this.set("form.Talla", res[1]);
            this.set("form.EmpleadoItemID", res[2]);
            
            var userData = {                    
                CodTalla: this.get("form.CodTalla"),
                Talla: this.get("form.Talla"),
                EmpleadoItemID: this.get("form.EmpleadoItemID"),
            };               
            
            console.log("USER DATA Tallas: ", userData);
            servicioFormulario.updateFormulario(userData)
            .then(resultado=>{                              
                 //this.transitionToRoute('/tallas');                                    
                 alertify.success(resultado.mensaje);                 
                 this.send("refreshRoute");   
            })
            .catch(error=>{
                // alert(resultTotal.books.mensaje);                 
            });
        },
      
        onFechaIni(data){            
           this.set("fechainicio", moment(data).format('YYYY/MM/DD'));
        },

        fecha(){
            var fecha = new Date();
            fecha = fecha.getFullYear(),
            this.set("fechaActual", fecha );
        }
    }       
});
