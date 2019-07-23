const { prisma } = require('../../generated/prisma-client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Query = {
	user(parent, args, context) {
		return context.prisma.user({ id: args.id });
	},
	async login(parent, args, context) {
		const user = await context.prisma.user({ email: args.email });
		if (!user) {
			throw new Error('No such user found');
		}

		const passwordValid = await bcrypt.compare(args.password, user.password);

		if (!passwordValid) {
			throw new Error('Invalid password');
		}

		const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

		return {
			token,
			user,
		};
	},
	poems(parent, args, context) {
		return prisma.poems();
	},
	poem(parent, args, context) {
		return prisma.poem({ id: args.id });
	},
	poemsByUser(parent, args, context) {
		return prisma.user({ id: args.userId }).poems();
	},
};

module.exports = Query;
