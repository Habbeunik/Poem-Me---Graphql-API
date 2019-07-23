const { prisma } = require('../../generated/prisma-client');

const poem = {
	author: (parent, args, context) => {
		return prisma.poem({ id: parent.id }).author();
	},
	comments: async (parent, args, context) => {
		const comments = await prisma.poem({ id: parent.id }).comments();

		return {
			data: comments,
			count: comments.length,
		};
	},
	likes: async (parent, args, context) => {
		const likes = await prisma.poem({ id: parent.id }).likes();

		return {
			data: likes,
			count: likes.length,
		};
	},
};

module.exports = poem;
