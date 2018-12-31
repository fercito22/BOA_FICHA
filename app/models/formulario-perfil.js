import DS from 'ember-data';

export default DS.Model.extend({
    Nombre1: DS.attr('string'),
    Apellido1: DS.attr('string'),
    Apellido2: DS.attr('string'),
    FechaNacimiento: DS.attr('Date'),
    Nacionalidad: DS.attr('string'),
    CiudadNacimiento: DS.attr('string'),
    LugarDeNacimiento: DS.attr('string'),
    Direccion: DS.attr('string'),
    EstadoCivil: DS.attr('number')        
});
