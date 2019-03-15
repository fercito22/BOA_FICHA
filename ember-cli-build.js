'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    // Add options here
    fontawesome: {
      icons: {
        'free-solid-svg-icons': [
          'stroopwafel'
         ]
      }
    },

    'ember-bootstrap': {
      'bootstrapVersion': 4,
      'importBootstrapFont': true,
      'importBootstrapCSS': true
    }
  });
  //no olvidar
    //app.import('bower_components/assets/Bootstrap/css/bootstrap.min.css');   
   
  //  app.import('bower_components/assets/font-awesome/css/font-awesome.min.css');

  //  app.import('bower_components/assets/font-awesome/fonts/fontawesome-webfont.woff2', {
  //   destDir: 'assets'
  // });
  //  app.import('bower_components/assets/font-awesome/fonts/fontawesome-webfont.woff', {
  //   destDir: 'assets'
  // });
  //  app.import('bower_components/assets/font-awesome/fonts/fontawesome-webfont.ttf', {
  //   destDir: 'assets'
  // });
  // app.import(app.bowerDirectory + '/assets/Bootstrap/css/bootstrap.min.css');   
  

  app.import(app.bowerDirectory + '/assets/Bootstrap/css/bootstrap.min.css');

   //app.import(app.bowerDirectory + '/assets/font-awesome/css/font-awesome.min.css');

   app.import(app.bowerDirectory + '/assets/font-awesome/fonts/fontawesome-webfont.woff2', {
    destDir: 'assets'
  });
   app.import(app.bowerDirectory + '/assets/font-awesome/fonts/fontawesome-webfont.woff', {
    destDir: 'assets'
  });
   app.import(app.bowerDirectory + '/assets/font-awesome/fonts/fontawesome-webfont.ttf', {
    destDir: 'assets'
  });

  
  //app.import(app.bowerDirectory + '/assets/Bootstrap/css/bootstrap.min.css');

  //  app.import('bower_components/assets/Plantilla/font/FuturaStd-Book.woff');

  //  app.import('bower_components/assets/font-awesome/fonts/fontawesome-webfont.woff2');
  //  app.import('bower_components/assets/font-awesome/fonts/fontawesome-webfont.woff');
  //  app.import('bower_components/assets/font-awesome/fonts/fontawesome-webfont.ttf');

   app.import(app.bowerDirectory + '/assets/Plantilla/css/sb-admin.min.css');
   app.import(app.bowerDirectory + '/assets/Pnotify/pnotify.custom.min.css');
   app.import(app.bowerDirectory + '/assets/Plantilla/css/estilo.css');
   app.import(app.bowerDirectory + '/assets/Plantilla/css/secciones/style.css');
   app.import(app.bowerDirectory + '/assets/Libreria/css/themes/default.css');
   app.import(app.bowerDirectory + '/assets/Libreria/css/alertify.css');

  //  app.import('bower_components/assets/Plantilla/css/sb-admin.min.css');
  //  app.import('bower_components/assets/Pnotify/pnotify.custom.min.css');
  //  app.import('bower_components/assets/Plantilla/css/estilo.css');
  //  app.import('bower_components/assets/Plantilla/css/secciones/style.css');
  //  app.import('bower_components/assets/Libreria/css/themes/default.css');
  //  app.import('bower_components/assets/Libreria/css/alertify.css');

  
  app.import(app.bowerDirectory + '/assets/Plantilla/js/jquery.min.js');
  app.import(app.bowerDirectory + '/assets/Bootstrap/js/bootstrap.bundle.min.js');
  app.import(app.bowerDirectory + '/assets/Plantilla/js/jquery.easing.min.js');
  app.import(app.bowerDirectory + '/assets/Plantilla/js/Chart.min.js');
  app.import(app.bowerDirectory + '/assets/Plantilla/js/sb-admin.min.js');
  app.import(app.bowerDirectory + '/assets/Libreria/alertify.js');
  //  app.import('bower_components/assets/Plantilla/js/jquery.min.js');
  //  app.import('bower_components/assets/Bootstrap/js/bootstrap.bundle.min.js');
  //  app.import('bower_components/assets/Plantilla/js/jquery.easing.min.js');
  //  app.import('bower_components/assets/Plantilla/js/Chart.min.js');
  //  app.import('bower_components/assets/Libreria/alertify.js');

  
  // app.import('bower_components/assets/Plantilla/js/jquery.min.js');
  //app.import('bower_components/assets/Plantilla/js/bootstrap.bundle.min.js');  
  //app.import('bower_components/assets/Plantilla/js/jquery.easing.min.js');  
  //app.import('bower_components/assets/Plantilla/js/Chart.min.js');  
  // app.import('bower_components/assets/Plantilla/js/alertify.js');  
  // app.import('public/js/jquery.min.js');
  // app.import('public/js/bootstrap.min.js');
  // app.import('public/js/jqBootstrapValidation.js');
  // app.import('public/js/contact_me.js');
  // app.import('public/js/freelancer.min.js');
  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
