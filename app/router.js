import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  // this.route('principal', function() {
  //   this.route('principal');

  //   this.route('idiomas');
  // });

  this.route('idiomas', { path: '/idiomas' });
  this.route('principal', { path: '/principal' });
  this.route('educacion', { path: '/educacion' });
  this.route('login', { path: '/login' });
  this.route('perfil', { path: '/perfil' });


  //this.route('index');
  //index


  this.route('idiomas');
  this.route('principal');
  this.route('formulario-idiomas');
  this.route('contactenos');
  this.route('educacion', function() {
    this.route('bachiller');
    this.route('formacion-academica');
    this.route('educacion');
    this.route('formulario-bachiller');
    this.route('formulario-idioma');
  });
  this.route('perfil');
  this.route('perfil-formulario');
  this.route('formulario-perfil');
  this.route('prueba');
  this.route('informacion-laboral', function() {
    this.route('informacion-laboral');
  });
  this.route('beneficiarios', function() {
    this.route('beneficiarios');
  });
  this.route('memorandum', function() {
    this.route('memorandum');
  });
  this.route('formulario-idiomas');
  this.route('formulario');

  this.route('documentos', function() {
    this.route('documentos-personales');
  });
  this.route('documentos-personales');
  this.route('formulario-documentos');
  this.route('estudios');
  this.route('formacion');
  this.route('beneficiario');
  this.route('tallas');
  this.route('login');
  this.route('about');
});

export default Router;
