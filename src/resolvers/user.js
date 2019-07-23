const { prisma } = require('../../generated/prisma-client');

const User = {
	following: async (parent, args, context) => {
		const following = await context.prisma.user({ id: parent.id }).following();
		return {
			users: following,
			count: following.length,
		};
	},
	followers: async (parent, args, context) => {
		const followers = await context.prisma.user({ id: parent.id }).followers();
		return {
			users: followers,
			count: followers.length,
		};
	},
	poems: (parent, args, context) => {
		return prisma.user({ id: parent.id }).poems();
	},
	bookmarks: (parent, args, context) => {
		return prisma.user({ id: parent.id }).bookmarks();
	},
	categories: (parent, args, context) => {
		return prisma.user({ id: parent.id }).categories();
	},
};

module.exports = User;
