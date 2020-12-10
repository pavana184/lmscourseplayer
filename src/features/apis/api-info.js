
module.exports = {
  url: 'https://learner.contentenablers.com/storefront/',
  dummy_url: 'https://jsonplaceholder.typicode.com/',
  clientId: 139,
  ENCRYPT_IV: '0123456789123456',
  ENCRYPT_KEY: "HG58YZ3CR9HG58YZ3CR93CR9",
  destination: {
  	authUrl : 'microservicelogin/',
  	playerAuth: 'api/playerv2/auth/',
  	userInfo:'api/lmsv2/info/',
  	permawidgettext: 'api/playerv2/permawidgettext/',
  	updatesNotesPoster: 'api/playerv2/updateNotesPosterById/',
  	courseConfigUrl: 'api/playerv2/courseConfig/',

  	dummy_post:'posts/'
  }
};
