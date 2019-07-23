const jwt = require('jsonwebtoken');

function getUserIdFromAuthorization(request) {
	console.log('i was called', request);
	const Authorization = request.get('Authorization');
	if (Authorization) {
		const token = Authorization.replace('Bearer ', '');
		const { userId } = jwt.verify(token, process.env.APP_SECRET);

		return userId;
	}

	return null;
}

function validateUserAuthorization(request) {
	console.log('i was called');
	const isAuthorized = getUserIdFromAuthorization(request);

	if (!isAuthorized) {
		throw new Error('Not authenticated');
	}
}

module.exports = {
	getUserIdFromAuthorization,
	validateUserAuthorization,
};
