import Camera from './components/Camera';
import Messages from './components/Messages';
import toastr from 'toastr';
import 'bootstrap';

const camera = new Camera(document.getElementById('player'));
const messages = new Messages();

/**
 * Setup Event Listeners
 */
function setupEventListeners() {
  // Notify user of connection errors
  window.addEventListener('server_error', onServerError);
  // Notify user of connection reconnected
  window.addEventListener('server_reconnected', onServerReconnected);
  // Render message on new Message
  window.addEventListener('new_message', onNewMessage);
  //
  window.addEventListener('messages_ready', onMessageReady);
  $('#viewfinder').on('show.bs.modal', () => onCameraShow());
  $('#viewfinder').on('hidden.bs.modal', () => onCameraHide());
  $('#shutter').on('click', () => onTakePhoto());
  $('#send').on('click', () => onSendMessage());
}

function onServerError() {
  toastr.error(
    'Connection with server has been lost.',
    'Network Connection Error',
  );
}

function onServerReconnected() {
  toastr.success(
    'Connection with server successful',
    'Network connection success',
  );
}

function onNewMessage(evt) {
  renderMessage(evt.detail);
}

function onMessageReady() {
  $('#loader').remove();

  if (messages.all.length === 0) {
    toastr.info('Add the first message.', 'No messages');
  }

  $('#messages').empty();

  messages.all.reverse().forEach(renderMessage);
}

function onCameraShow(camera) {
  camera.switchOn();
}

function onCameraHide(camera) {
  camera.switchOff();
}

function onTakePhoto(camera) {
  console.log('test');
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
  const message = messages.add(camera.photo, caption);
  renderMessage(message);

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

setupEventListeners();
