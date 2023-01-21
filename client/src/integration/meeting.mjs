import axios from "axios";
const domain = "https://test-blackis.dolphinvc.com/";
const token = {
    refreshToken: 'umERRbt4eft9nieMf4lY1LXE0iXR9xcOU8nzf5mqlRdKYfffPMphHw',
    token: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InkxekprX3hucTF0TlNSMmlTRDZEYW55cHFCOCJ9.eyJhdWQiOiJhMzUyNzkyMC1kYWNhLTRiNGYtOTc1Yi03OTgzNmYzYTUzNDUiLCJleHAiOjE2NzQwNDA5ODUsImlhdCI6MTY3NDAzNzM4NSwiaXNzIjoiYWNtZS5jb20iLCJzdWIiOiI5OWQ4Zjg1ZS03ZTgwLTQ3ZWEtYWI4MC1lN2RmNzY3NzhlMTMiLCJqdGkiOiI5MTc2NWZhMi1iYTIwLTRkYzAtYjQwYy04YmY1YWE0ZjFiMGMiLCJhdXRoZW50aWNhdGlvblR5cGUiOiJGRURFUkFURURfSldUIiwiZW1haWwiOiJ2aWthc2hAYmFzay5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXBwbGljYXRpb25JZCI6ImEzNTI3OTIwLWRhY2EtNGI0Zi05NzViLTc5ODM2ZjNhNTM0NSIsInJvbGVzIjpbXSwiZnVsbE5hbWUiOiJCbGFjayBCb3giLCJmaXJzdE5hbWUiOiJCbGFjayJ9.d8uzDheOrxCoH-YU5rUBuym2tO6-P3NOkoXRRCunYjnCd8xRdD3T_qSuzNA4o5I5n_oY38YkAT4vmp7OQmzmzZSEcQD70VM-4PRh-yySIDzAICWIsxWz_AOGPVxCP5KwiIEMH-kS0P10Su44Yeu-wwu_nPWpY1_vbMoLZypK0Vei901ttFkaXZldJTN8-1zBJhFMQK3oaMiwmSp4SbIJDx8JyNxpFGj55eaY2mjzRcN7XfXiie1_VPdPgrEiWz9jwQlRTv7J4SWPXUygCzDsMxVdJZEjh9Qhe5So6Zw-K1bkg4fnVzpOkriygfufgy9dpdc_WL7rrir4ChINr7JF0g'
  };

const startMeeting = async (data) => {
  try {
    const res = await axios.post(domain + "meeting/api/v1/meeting", data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token.token,
      },
    });
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};

startMeeting({
  default: true,
  audio_only: false,
  include_video: true,
  include_audio: true,
  mute_audio_on_start: true,
  meeting_name: "test22",
  //   moderator_info: {
  //     username: "blackbox",
  //     user_id: "string",
  //   },
  password: "12345678",
  redirect_url: "https://blackboxnow.com",
  water_mark_image_png:
    "https://res.cloudinary.com/black-box/image/upload/v1672752579/qab62dfyzu1tiojbalvz.jpg",
  water_mark_image_link:
    "https://res.cloudinary.com/black-box/image/upload/v1672752580/nzqfohozzdzj13fc4mrc.jpg",
});

/**
 * {
  web_client_uri: 'https://test-blackis.dolphinvc.com/r/9zesx2/4369800980?pwd=74938be3066998820b1762dced624d48c73f6dede9cb41b1#userInfo.displayName=Vikash&config.startWithAudioMuted=true&config.startWithVideoMuted=false&config.subject=test22&config.endMeetingRedirectUrl=https://blackboxnow.com&interfaceConfig.BRAND_WATERMARK_IMAGE=https://res.cloudinary.com/black-box/image/upload/v1672752579/qab62dfyzu1tiojbalvz.jpg&interfaceConfig.BRAND_WATERMARK_LINK=https://res.cloudinary.com/black-box/image/upload/v1672752580/nzqfohozzdzj13fc4mrc.jpg&config.meetingInfoId=707436bb-eefc-426d-9cb1-5b191525b5ff&config.recordingMediaType=video',
  mobile_client_uri: 'https://dolphinvcapp.page.link/?link=https://test-blackis.dolphinvc.com/r/9zesx2/4369800980&apn=com.nouveaulabs.dolphinvc&amv=3&ibi=com.nouveaulabs.dolphinvc&isi=1538144277&ius=dolphin-vc',
  mobile_client_uri_android: 'intent://test-blackis.dolphinvc.com/r/9zesx2/4369800980#Intent;scheme=com.nouveaulabs.dolphinvc;package=com.nouveaulabs.dolphinvc;end',
  mobile_client_uri_ios: 'dolphin-vc://test-blackis.dolphinvc.com/r/9zesx2/4369800980',
  desktop_client_uri: 'dolphin-vc://test-blackis.dolphinvc.com/r/9zesx2/4369800980?pwd=74ed3b95e7a28ee771acd883696e573dd69459c09ea8f7a7#userInfo.displayName=Vikash&config.startWithAudioMuted=true&config.startWithVideoMuted=false&config.subject=test22&config.endMeetingRedirectUrl=https://blackboxnow.com&interfaceConfig.BRAND_WATERMARK_IMAGE=https://res.cloudinary.com/black-box/image/upload/v1672752579/qab62dfyzu1tiojbalvz.jpg&interfaceConfig.BRAND_WATERMARK_LINK=https://res.cloudinary.com/black-box/image/upload/v1672752580/nzqfohozzdzj13fc4mrc.jpg&config.meetingInfoId=707436bb-eefc-426d-9cb1-5b191525b5ff&config.recordingMediaType=video',
  meeting_id: '4369800980',
  meeting_info_id: '707436bb-eefc-426d-9cb1-5b191525b5ff'
}
 */

const joinMeeting = async (passcode, id) => {
  try {
    // console.log(token.token);
    let config = {
      method: "get",
      url: `${domain}meeting/api/v1/join/${id}?passcode=${passcode}&is_encrypted=true`,
      headers: {
        Accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InkxekprX3hucTF0TlNSMmlTRDZEYW55cHFCOCJ9.eyJhdWQiOiJhMzUyNzkyMC1kYWNhLTRiNGYtOTc1Yi03OTgzNmYzYTUzNDUiLCJleHAiOjE2NzQwNDA5ODUsImlhdCI6MTY3NDAzNzM4NSwiaXNzIjoiYWNtZS5jb20iLCJzdWIiOiI5OWQ4Zjg1ZS03ZTgwLTQ3ZWEtYWI4MC1lN2RmNzY3NzhlMTMiLCJqdGkiOiI5MTc2NWZhMi1iYTIwLTRkYzAtYjQwYy04YmY1YWE0ZjFiMGMiLCJhdXRoZW50aWNhdGlvblR5cGUiOiJGRURFUkFURURfSldUIiwiZW1haWwiOiJ2aWthc2hAYmFzay5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXBwbGljYXRpb25JZCI6ImEzNTI3OTIwLWRhY2EtNGI0Zi05NzViLTc5ODM2ZjNhNTM0NSIsInJvbGVzIjpbXSwiZnVsbE5hbWUiOiJCbGFjayBCb3giLCJmaXJzdE5hbWUiOiJCbGFjayJ9.d8uzDheOrxCoH-YU5rUBuym2tO6-P3NOkoXRRCunYjnCd8xRdD3T_qSuzNA4o5I5n_oY38YkAT4vmp7OQmzmzZSEcQD70VM-4PRh-yySIDzAICWIsxWz_AOGPVxCP5KwiIEMH-kS0P10Su44Yeu-wwu_nPWpY1_vbMoLZypK0Vei901ttFkaXZldJTN8-1zBJhFMQK3oaMiwmSp4SbIJDx8JyNxpFGj55eaY2mjzRcN7XfXiie1_VPdPgrEiWz9jwQlRTv7J4SWPXUygCzDsMxVdJZEjh9Qhe5So6Zw-K1bkg4fnVzpOkriygfufgy9dpdc_WL7rrir4ChINr7JF0g",
      },
    };
    const res = await axios(config);
    console.log(res.data);
  } catch (err) {
    // console.log("something went wrong");
    console.log(err.response);
  }
};

joinMeeting("12345678", "4369800980");
