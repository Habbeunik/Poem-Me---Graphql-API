const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
const resolvers = require('./src/resolvers');
const { getUserIdFromAuthorization } = require('./src/utils');

require('dotenv').config();

const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers,
	context: ({ request }) => {
		return {
			request,
			prisma,
			currentUserId: getUserIdFromAuthorization(request),
		};
	},
});

server.start(() => console.log(`Server is running at http://localhost:4000`));
