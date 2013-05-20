var app = {
    showAlert: function (message, title) {
        if (navigator.notification) {
             navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    },
	captureVideo : function(){
		var self = this;
		
		var captureSuccess = function(mediaFiles){
			var i, len;
			for (i = 0, len = mediaFiles.length; i < len; i += 1) {
			    uploadFile(mediaFiles[i]);
			}
		};
		
		var captureError = function(error){
			var msg = 'An error occurred during capture: ' + error.code;
			navigator.notification.alert(msg, null, 'Uh oh!');
		}
		navigator.device.capture.captureVideo(captureSuccess, captureError, {limit: 1});
		self.showAlert('Capture Video Start', 'Go');
	},
    initialize: function() {
        var self = this;
		
		self.showAlert('Store Initialized', 'Info');
		$('.capture-video').on('click', $.proxy(this.captureVideo, this));
        //$('.search-key').on('keyup', $.proxy(this.findByName, this));
    }

};

app.initialize();

function captureSuccess(mediaFiles) {
    
}

// Called if something bad happens.
// 
function captureError(error) {

}

// Upload files to server
function uploadFile(mediaFile) {
  var path = mediaFile.fullPath,
      name = mediaFile.name;
  navigator.notification.alert(path, null, name);

}