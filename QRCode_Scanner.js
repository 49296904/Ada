window.scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
document.getElementById('startCamera').onclick = getMedia;
////document.getElementById('stopCamera').onclick = this._stopMedia;
function getMedia () {
	if (window.scanner) {
			window.document.getElementById('scanCode').innerHTML = "&nbsp;";
		    window.document.getElementById('errorMsg').innerHTML = "&nbsp;";
			window.scanner.addListener('scan', function (content) {
				console.log('content:'+content);
				window.document.getElementById('scanCode').innerHTML = "Information: " + content;
				window.scanner.stop().then(function () {});
				window.document.getElementById('errorMsg').innerHTML = "Success!";
		  });

		  Instascan.Camera.getCameras().then(function (cameras) {
			if (cameras.length > 0) {
				window.scanner.start(cameras[0]).then(function () { 
			   }).catch(function (err) {
				 window.document.getElementById('errorMsg').innerHTML = err;
			   });
			} else {
			  console.warn('No cameras found.');
			  window.document.getElementById('errorMsg').innerHTML = "No cameras found.";
			}
		  }).catch(function (e) {
			console.warn(e);
			if (e.message.indexOf("NotFoundError") > -1) {
				window.document.getElementById('errorMsg').innerHTML = "No cameras found. Please check your camera device.";
			}
			else if (e.message.indexOf("NotReadableError") > -1) {
				window.document.getElementById('errorMsg').innerHTML = "Camera is not available or on used by other application. Please check and try it again." 
			}
			else {
				window.document.getElementById('errorMsg').innerHTML = "Access Camera failed. " + e;
			}
		  })
		}
}