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
    var i, len;
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        uploadFile(mediaFiles[i]);
    }       
}

// Called if something bad happens.
// 
function captureError(error) {
    var msg = 'An error occurred during capture: ' + error.code;
    navigator.notification.alert(msg, null, 'Uh oh!');
}

// A button will call this function
//
function captureVideo() {
    navigator.notification.alert('Capture Video Start', null, 'Go');
    // Launch device video recording application, 
    // allowing user to capture up to 2 video clips
    navigator.device.capture.captureVideo(captureSuccess, captureError, {limit: 2});
}

// Upload files to server
function uploadFile(mediaFile) {
  var path = mediaFile.fullPath,
      name = mediaFile.name;
  navigator.notification.alert(path, null, name);

}