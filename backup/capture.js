var player = document.getElementById('player');
var snapshotCanvas = document.getElementById('snapshot');
var captureButton = document.getElementById('capture');
var saveButton = document.getElementById('save');

var handleSuccess = function(stream) {
  // Attach the video stream to the video element and autoplay.
  player.srcObject = stream;
};

captureButton.addEventListener('click', function() {
    var context = snapshot.getContext('2d');
    // Draw the video frame to the canvas.
    snapshotCanvas.style.display='none';
    context.drawImage(player, 0, 0, snapshotCanvas.width, snapshotCanvas.height);

    document.getElementById('capture_img').src = snapshotCanvas.toDataURL("image/png")
});

saveButton.addEventListener('click', function() {
    //saveATag= document.getElementById('save')
    //saveATag.href = snapshotCanvas.toDataURL("image/png");
    //saveATag.download = 'jskim8.png'
    console.log('test');
    //const axios = require('axios');
    axios.post('http://192.168.10.36:8080/jetson/cls/result',{
      fileName:'jskim8.png',
      img: snapshotCanvas.toDataURL("image/png")
    })
    .then(function(response){
      document.getElementById('classifier').innerHTML = response.data.classifier;
      document.getElementById('time').innerHTML = response.data.time;
    })
    .catch(function(error){
      console.log(error);
    });
});

navigator.mediaDevices.getUserMedia({video: {width:720, height:480}}).then(handleSuccess);
