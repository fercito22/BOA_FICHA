import Route from '@ember/routing/route';

export default Route.extend({
  setupController: function(controller, model) { 
    var name = 'acceptCookies=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    var found = false;
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ' ) {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            found = true;
        }
    }
    if(!found){
        controller.set("showCookies",true);
    }
  },
  actions: {
    refreshRoute: function () {
      this.refresh();
    }
  }
});
