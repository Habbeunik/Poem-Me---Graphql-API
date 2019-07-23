const { prisma } = require('../../generated/prisma-client');

const comment = {
	user: (parent, args, context) => {
		return prisma.comment({ id: parent.id }).user();
	},
};

module.exports = comment;
