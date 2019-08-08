class Camera {
  constructor(video_node) {
    this.video_node = video_node;
  }

  switchOn() {
    // Get media stream
    window.navigator.mediaDevices
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

export default Camera;
