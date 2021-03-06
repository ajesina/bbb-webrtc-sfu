const Constants = require('./Constants.js');

let ScreenshareRTMPBroadcastStartedEventMessage2x =
    require('./screenshare/ScreenshareRTMPBroadcastStartedEventMessage2x.js')(Constants);
let ScreenshareRTMPBroadcastStoppedEventMessage2x =
    require('./screenshare/ScreenshareRTMPBroadcastStoppedEventMessage2x.js')(Constants);
let UserCamBroadcastStoppedEventMessage2x =
    require('./video/UserCamBroadcastStoppedEventMessage2x.js')(Constants);
let WebRTCShareEvent = require('./video/WebRTCShareEvent.js')(Constants);
let RecordingStatusRequestMessage2x =
    require('./recording/RecordingStatusRequestMessage2x.js')(Constants);
let UserConnectedToGlobalAudio =
    require('./audio/UserConnectedToGlobalAudio.js')(Constants);
let UserDisconnectedFromGlobalAudio =
    require('./audio/UserDisconnectedFromGlobalAudio.js')(Constants);
let UserConnectedToGlobalAudio2x =
    require('./audio/UserConnectedToGlobalAudio2x.js')(Constants);
let UserDisconnectedFromGlobalAudio2x =
    require('./audio/UserDisconnectedFromGlobalAudio2x.js')(Constants);
const GetGlobalAudioPermissionReqMsg =
    require('./audio/GetGlobalAudioPermissionReqMsg.js')(Constants);
const GetScreenBroadcastPermissionReqMsg =
    require('./screenshare/GetScreenBroadcastPermissionReqMsg.js')(Constants);
const GetScreenSubscribePermissionReqMsg=
    require('./screenshare/GetScreenSubscribePermissionReqMsg.js')(Constants);
const GetCamBroadcastPermissionReqMsg =
    require('./video/GetCamBroadcastPermissionReqMsg.js')(Constants);
const GetCamSubscribePermissionReqMsg=
    require('./video/GetCamSubscribePermissionReqMsg.js')(Constants);


/**
 * @classdesc
 * Messaging utils to assemble JSON/Redis BigBlueButton messages
 * @constructor
 */
function Messaging() {}

Messaging.prototype.generateScreenshareRTMPBroadcastStartedEvent2x =
  function(conferenceName, screenshareConf, streamUrl, vw, vh, timestamp, hasAudio) {
  let stadrbem = new ScreenshareRTMPBroadcastStartedEventMessage2x(conferenceName, screenshareConf, streamUrl, vw, vh, timestamp, hasAudio);
  return stadrbem.toJson();
}

Messaging.prototype.generateScreenshareRTMPBroadcastStoppedEvent2x =
  function(conferenceName, screenshareConf, streamUrl, vw, vh, timestamp) {
  let stodrbem = new ScreenshareRTMPBroadcastStoppedEventMessage2x(conferenceName, screenshareConf, streamUrl, vw, vh, timestamp);
  return stodrbem.toJson();
}

Messaging.prototype.generateUserCamBroadcastStoppedEventMessage2x =
  function(meetingId, userId, streamUrl) {
  let stodrbem = new UserCamBroadcastStoppedEventMessage2x(meetingId, userId, streamUrl);
  return stodrbem.toJson();
}

Messaging.prototype.generateWebRTCShareEvent =
  function(name, meetingId, streamUrl, timestampHR, timestampUTC) {
  let stodrbem = new WebRTCShareEvent(name, meetingId, streamUrl, timestampHR, timestampUTC);
  return stodrbem.payload;
}

Messaging.prototype.generateRecordingStatusRequestMessage =
  function(meetingId, userId = '') {
    let rsqm = new RecordingStatusRequestMessage2x(meetingId, userId);
    return rsqm.toJson();
}

Messaging.prototype.generateUserConnectedToGlobalAudioMessage =
  function(voiceConf, userId, name) {
  let msg;
  switch (Constants.COMMON_MESSAGE_VERSION) {
    case "1.x":
      msg = new UserConnectedToGlobalAudio(voiceConf, userId, name);
      break;
    default:
      msg = new UserConnectedToGlobalAudio2x(voiceConf, userId, name);
  }
  return msg.toJson();
}

Messaging.prototype.generateUserDisconnectedFromGlobalAudioMessage =
  function(voiceConf, userId, name) {
  let msg;
  switch (Constants.COMMON_MESSAGE_VERSION) {
    case "1.x":
      msg = new UserDisconnectedFromGlobalAudio(voiceConf, userId, name);
      break;
    default:
      msg = new UserDisconnectedFromGlobalAudio2x(voiceConf, userId, name);
  }
  return msg.toJson();
}

Messaging.prototype.generateGetGlobalAudioPermissionReqMsg = (
  meetingId,
  voiceConf,
  userId,
  sfuSessionId
) => {
  return (new GetGlobalAudioPermissionReqMsg(meetingId, voiceConf, userId, sfuSessionId)).toJson();
}

Messaging.prototype.generateGetScreenBroadcastPermissionReqMsg = (
  meetingId,
  voiceConf,
  userId,
  sfuSessionId
) => {
  return (new GetScreenBroadcastPermissionReqMsg(meetingId, voiceConf, userId, sfuSessionId)).toJson();
}

Messaging.prototype.generateGetScreenSubscribePermissionReqMsg = (
  meetingId,
  voiceConf,
  userId,
  streamId,
  sfuSessionId
) => {
  return (new GetScreenSubscribePermissionReqMsg(
    meetingId,
    voiceConf,
    userId,
    streamId,
    sfuSessionId
  )).toJson();
}

Messaging.prototype.generateGetCamBroadcastPermissionReqMsg = (
  meetingId,
  userId,
  sfuSessionId
) => {
  return (new GetCamBroadcastPermissionReqMsg(meetingId, userId, sfuSessionId)).toJson();
}

Messaging.prototype.generateGetCamSubscribePermissionReqMsg = (
  meetingId,
  userId,
  streamId,
  sfuSessionId
) => {
  return (new GetCamSubscribePermissionReqMsg(
    meetingId,
    userId,
    streamId,
    sfuSessionId
  )).toJson();
}

module.exports = new Messaging();
