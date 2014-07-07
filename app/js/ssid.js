var ssidModule = (function() {
  var form;
  var ssid;
  var ssidPassphrase;
  var ssidError;
  var ssidPassphraseError;
  var genericError;

  var init = function() {
    initializeFields();
    initializeForm();
  };

  var initializeFields = function(){
    form = $('form');
    ssid = $('#ssid');
    ssidPassphrase = $('#ssidPassphrase');
    ssidError = $('#ssidError');
    ssidPassphraseError = $('#ssidPassphraseError');
    genericError = $('#genericError');
  };

  var initializeForm = function(){
    form.submit(function(event){
      event.preventDefault();
      ssidError.hide();
      ssidPassphraseError.hide();
      genericError.hide();
      ssid.removeClass('error');
      ssidPassphrase.removeClass('error');

      if(helperModule.checkEmptyField(ssid, ssidError, "SSID")){
        return;
      }

      if(helperModule.checkEmptyField(ssidPassphrase, ssidPassphraseError, "passphrase")){
        return;
      }

      setSSID();
    });
  };

  var setSSID = function() {
    requestModule.submitRequest({
      url: "/cgi-bin/routerapi/set_private_ssid",
      successCallback: setSSIDSuccess,
      errorCallback: errorCallback,
      data: {
        "jsonrpc": "2.0",
        "method": "set_private_ssid",
        "params": [ssid.val(), ssidPassphrase.val()],
        "id": 1
      }
    });
  };

  var setSSIDSuccess = function(response) {
    setTimeout(function () {
      var template = Handlebars.templates.setSSID;
      $('.formDiv').hide();
      $("#restarting").html(template({ssid: response.ssid}));
      $('#restarting').show();
    }, 3000);
  };

  return {
    init: init
  }
})();

$(document).ready(function() {
  ssidModule.init();
});
