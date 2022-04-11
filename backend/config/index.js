//// Load config
require('dotenv/config')

// TODO: move this to .json
module.exports = {
	port: process.env.PORT, 
	redis: {
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT,
		password: process.env.REDIS_PASS,
	}, 
	mongoDb: {
		uri: process.env.MONGODB_URI
	}, 
	workersCount: {
		responder: 1,
		mailer: 1
	}, 
	mailer: {
		service: "gmail",
		email: process.env.MAIL_USERNAME,
		password: process.env.MAIL_PASSWORD,
		oAuth: {
			clientId: process.env.MAIL_OAUTH_CLIENTID,
			clientSecret: process.env.MAIL_OAUTH_CLIENT_SECRET,
			refreshToken: process.env.MAIL_OAUTH_REFRESH_TOKEN
		}
	}, 
	apiUrl: 'https://public.enroll.wisc.edu/api', 
	termCode: 1232, 															// Fall 2022, retrieved from enroll.wisc
	fetchCooldown: 10000, 												// how frequent the updater will refresh the course info, in milliseconds   
	frontUrl: process.env.URL_MAIN,
	policies: {
		minDelay: 10
	}
};
