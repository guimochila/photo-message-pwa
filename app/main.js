(function(global, $, toastr) {
  class Camera {
    constructor(video_node) {
      this.video_node = video_node;
    }

    switchOn() {
      // Get media stream
      global.navigator.mediaDevices
        .getUserMedia({
          video: { width: 600, height: 600 },
          audio: false,
        })
        .then(stream => (this.video_node.srcObject = this.stream = stream));
    }

    switchOff() {
      // Pause the video
      this.video_node.pause();
      // Stop media stream
      this.stream.getTracks()[0].stop();
    }

    takePhoto() {
      // Create a <canvas> elemente to render the photo
      let canvas = document.createElement('canvas');
      canvas.setAttribute('width', 600);
      canvas.setAttribute('height', 600);

      let context = canvas.getContext('2d');
      context.drawImage(this.video_node, 0, 0, canvas.width, canvas.height);

      this.photo = context.canvas.toDataURL();
      // Destroy canvas and context
      context = null;
      canvas = null;

      return this.photo;
    }
  }

  function _init() {
    const camera = new Camera(document.getElementById('player'));

    $('#viewfinder').on('show.bs.modal', () => onCameraShow(camera));
    $('#viewfinder').on('hidden.bs.modal', () => onCameraHide(camera));

    $('#shutter').on('click', () => onTakePhoto(camera));

    $('#send').on('click', () => onSendMessage(camera));

    function onCameraShow(camera) {
      camera.switchOn();
    }

    function onCameraHide(camera) {
      camera.switchOff();
    }

    function onTakePhoto(camera) {
      let photo = camera.takePhoto();

      // Show photo preview
      $('#camera')
        .css('background-image', `url(${photo})`)
        .addClass('with-photo');
    }

    function onSendMessage() {
      let caption = $('#caption').val();

      if (!camera.photo || !caption) {
        toastr.warning('Photo & Caption required', 'Incomplete Message');
        return;
      }

      // Render new message;
      renderMessage({ photo: camera.photo, caption });

      $('#caption').val('');
      $('#camera')
        .css('background-image', '')
        .removeClass('with-photo');
      camera.photo = null;
    }

    function renderMessage({ photo, caption }) {
      // Message HTML
      let msgHTML = `
        <div style="display: none;" class="row message bg-light mb-2 rounded shadow">
          <div class="col-2 p-1">
            <img class="photo w-100 rounded" src="${photo}"/>
          </div>
          <div class="col-10 p-1">${caption}</div>
        </div>
      `;

      $(msgHTML)
        .prependTo('#messages')
        .show(500)
        .find('img')
        .on('click', showPhoto);
    }

    function showPhoto(e) {
      let photoSource = $(e.currentTarget).attr('src');

      $('#photoframe img').attr('src', photoSource);
      $('#photoframe').modal('show');
    }
  }

  global._init = _init;
})(window, jQuery, toastr);
