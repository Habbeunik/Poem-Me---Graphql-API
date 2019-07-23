const jwt = require('jsonwebtoken');

function getUserIdFromAuthorization(request) {
	const Authorization = request.get('Authorization');
	if (Authorization) {
		const token = Authorization.replace('Bearer ', '');
		const { userId } = jwt.verify(token, process.env.APP_SECRET);

		return userId;
	}

	return null;
}

function validateUserAuthorization(request) {
	const isAuthorized = getUserIdFromAuthorization(request);

	if (!isAuthorized) {
		throw new Error('Not authenticated');
	}
}

module.exports = {
	getUserIdFromAuthorization,
	validateUserAuthorization
};
