const { prisma } = require('../../generated/prisma-client');

const like = {
	user: async (parent, context, args) => {
		return await prisma.like({ id: parent.id }).user();
	},
};

module.exports = like;
