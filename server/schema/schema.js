const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
} = require('graphql');

const { getDataUsers, addUser } = require('../store/usersStore');

const UsersType = new GraphQLObjectType({
  name: 'Users',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    height: { type: GraphQLString },
    user_id: { type: GraphQLID },
  }),
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UsersType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        height: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        console.log('truc');
        const user = await addUser({
          name: args.name,
          age: args.age,
          height: args.height,
        });
        return user;
      },
    },
  },
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(UsersType),

      resolve: async (parent, args) => {
        try {
          const users = await getDataUsers();
          return users;
        } catch (e) {
          console.error(e);
        }
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
