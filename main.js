/*
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
		
		navigator.device.capture.captureVideo(captureSuccess, captureError, {limit: 1});
		
		var captureSuccess = function(mediaFiles){
			var i, len;
			navigator.notification.alert('test',null,'test');
			for (i = 0, len = mediaFiles.length; i < len; i += 1) {
			    uploadFile(mediaFiles[i]);
			}
		};
		
		var captureError = function(error){
			var msg = 'An error occurred during capture: ' + error.code;
			navigator.notification.alert(msg, null, 'Uh oh!');
		}
		
		var uploadFile = function(mediaFile){
			var path = mediaFile.fullPath,
			name = mediaFile.name;
			navigator.notification.alert(path, null, name);
		}
		
	},
    initialize: function() {
        var self = this;
		
		$('.capture-video').on('click', $.proxy(this.captureVideo, this));
        //$('.search-key').on('keyup', $.proxy(this.findByName, this));
    }

};
*/

// Called when capture operation is finished
    //
    function captureSuccess(mediaFiles) {
        var i, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            
			var mediaFile = mediaFiles[i];
			uploadFile(mediaFiles[i]);
			//navigator.notification.alert(mediaFile.fullPath, null, mediaFile.name);
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
        // Launch device video recording application, 
        // allowing user to capture up to 1 video clips
        navigator.device.capture.captureVideo(captureSuccess, captureError, {limit: 1});
    }

    // Upload files to server
    function uploadFile(mediaFile) {
        var ft = new FileTransfer(),
            path = mediaFile.fullPath,
            name = mediaFile.name;
		var url ='http://drupal7.dev/questionbridge/video/upload';
        ft.upload(path,
            url,
            function(result) {
				navigator.notification.alert(result.responseCode, null, 'Upload success');
                navigator.notification.alert(result.bytesSent + ' bytes sent', null, 'Upload success');
            },
            function(error) {
				navigator.notification.alert('Error uploading file ' + path + ': ' + error.code, null, error.code);
            },
            { fileName: name });  
    }



document.addEventListener("deviceready", function(){
// Your javascript phonegap code.
  $('.capture-video').on('click',function(){
  	captureVideo();
  });
});



