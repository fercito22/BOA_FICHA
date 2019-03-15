var valida = {
    numeros: /^[0-9]+$/,    
    numerosMinMax: /^([0-9 ]){3,60}$/,
    numerosMinMax2: '^[a-zA-Z\ \.\,\(\)\ñ\Ñ\áéíóú\ÁÉÍÓÚ\-\+]+[0-9]+$',
    mensajeNumeros: "No son numeros validos.",

    carnet: /^[0-9]+[a-zA-Z\ \.\,\(\)\ñ\Ñ\áéíóú\ÁÉÍÓÚ\-\+]+$/,
    //[\W.-]

    TextNum: /^([A-Za-z0-9 ]){3,60}$/,
    Direccion: /^([A-Za-z0-9.,_#/ ]){3,100}$/,

    texto: /^[a-zA-Z\ \ñ\Ñ\áéíóú\ÁÉÍÓÚ]+$/,
    //texto: /^[a-zA-Z0-9.\ \-\.\ñ\Ñ]+$/,
    textoMinMax: /^([a-zA-Z\ \ñ\Ñ\áéíóú\ÁÉÍÓÚ]){3,60}$/,
    //caracteresValidos: match('formac.titulo', /^[0-9]+([.][0-9]{1,2})?$/ ), 
    mensajeTexto : "No son caracteres validos.",
    
    //direccion: /^\d{1,6}\040([A-Z]{1}[a-z]{1,}\040[A-Z]{1}[a-z]{1,})$|^\d{1,6}\040([A-Z]{1}[a-z]{1,}\040[A-Z]{1}[a-z]{1,}\040[A-Z]{1}[a-z]{1,})$|^\d{1,6}\040([A-Z]{1}[a-z]{1,}\040[A-Z]{1}[a-z]{1,}\040[A-Z]{1}[a-z]{1,}\040[A-Z]{1}[a-z]{1,})$/,
    maximo: /^[\s\S]{0,60}$/,
    mensajeDireccion: "No es una Direccion Valida.",
    mensajeSelectable: "Usted debe elejir una opcion." ,
    //fecha: /^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,
    fecha: /^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,

    fecAMD:/^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,
    fecMDA: /^(?:0?[1-9]|1[1-2])([\-/.])(3[01]|[12][0-9]|0?[1-9])\1\d{4}$/,
    fecDMA: /^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$/,

    fecNN: /^\d{2,4}\/\d{1,2}\/\d{1,2}$/,
    
    mensajeFecha: "No es una fecha valida",
  };

//   var textoMinMax(minimo , maximo) {
//     return /^([a-zA-Z ]){minimo,maximo}$/
//   }

  
  export default valida