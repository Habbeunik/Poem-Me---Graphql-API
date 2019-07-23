const resolvers = {
	Query: require('./query'),
	Mutation: require('./mutation'),
	User: require('./user'),
	Poem: require('./poem'),
	Like: require('./like'),
	Comment: require('./comment'),
};

module.exports = resolvers;
