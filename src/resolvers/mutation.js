const { prisma } = require('../../generated/prisma-client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateUserAuthorization } = require('./../utils');

const Mutation = {
	signUp: async (parent, args, context) => {
		const password = await bcrypt.hash(args.password, 10);
		const user = await context.prisma.createUser({
			email: args.email,
			password,
		});
		const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

		return {
			token,
			user,
		};
	},

	updateUser: (parent, args, context) => {
		console.log('context request', context.request);
		console.log('context user', context.currentUserId);
		validateUserAuthorization(context.request);

		return context.prisma.updateUser({
			data: args.data,
			where: { id: context.currentUserId },
		});
	},

	followUser: async (parent, args, context) => {
		validateUserAuthorization(context.request);

		await context.prisma.updateUser({
			where: { id: args.followedId },
			data: {
				followers: {
					connect: { id: context.currentUserId },
				},
			},
		});
		const follower = context.prisma.updateUser({
			where: { id: context.currentUserId },
			data: {
				following: {
					connect: { id: args.followedId },
				},
			},
		});

		return follower;
	},

	unFollowUser: async (parent, args, context) => {
		validateUserAuthorization(context.request);

		await prisma.updateUser({
			where: { id: args.followedId },
			data: {
				followers: {
					disconnect: { id: context.currentUserId },
				},
			},
		});

		const follower = prisma.updateUser({
			where: { id: context.currentUserId },
			data: {
				following: {
					disconnect: { id: args.followedId },
				},
			},
		});

		return follower;
	},

	createPoem: (parent, args, context) => {
		validateUserAuthorization(context.request);

		return prisma.createPoem({
			title: args.data.title,
			verse: {
				set: args.data.verse,
			},
			author: {
				connect: { id: context.currentUserId },
			},
		});
	},

	likePoem: (parent, args, context) => {
		validateUserAuthorization(context.request);

		prisma.createLike({
			poem: {
				connect: { id: args.poemId },
			},
			user: {
				connect: { id: context.currentUserId },
			},
		});
		return 'Poem has been liked';
	},
	createCategory: (parent, args, context) => {
		return prisma.createCategory({
			title: args.title,
		});
	},
	createComment: (parent, args, context) => {
		validateUserAuthorization(context.request);

		return prisma.createComment({
			user: {
				connect: { id: context.currentUserId },
			},
			poem: {
				connect: { id: args.poemId },
			},
			text: args.text,
		});
	},
	deletePoem: async (parent, args, context) => {
		validateUserAuthorization(context.request);
		await prisma.deletePoem({ id: args.id });

		return 'Poem Deleted Successfully';
	},
	deleteComment: async (parent, args, context) => {
		await prisma.deleteComment({ id: args.id });

		return 'Comment Deleted Successfully';
	},
};

module.exports = Mutation;
