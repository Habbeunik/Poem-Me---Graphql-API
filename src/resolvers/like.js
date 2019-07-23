const { prisma } = require('../../generated/prisma-client');

const like = {
	user: (parent, context, args) => {
		return prisma.like({ id: parent.id }).user();
	}
};

module.exports = like;
