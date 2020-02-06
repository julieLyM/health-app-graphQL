const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
} = require('graphql');

const {
  getDataUsers,
  addUser,
  getWeight,
  addUserWithWeight,
  getAlcool,
  getBlood,
  getWater,
  getSport,
  getWeightByUserId,
  addWeight,
  addBlood,
  addSport,
  addAlcool,
  addWater,
} = require('../store/usersStore');

const UsersType = new GraphQLObjectType({
  name: 'users',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    height: { type: GraphQLString },
    weight: {
      type: new GraphQLList(WeightType),
      resolve: async ({ id: userId }) => {
        return await getWeightByUserId(userId);
      },
    },
  }),
});

const WeightType = new GraphQLObjectType({
  name: 'weight',
  fields: () => ({
    weight: { type: GraphQLInt },
    date: { type: GraphQLString },
    user_id: { type: GraphQLID },
  }),
});

const BloodPressureType = new GraphQLObjectType({
  name: 'blood_pressure',
  fields: () => ({
    blood_pressure: { type: GraphQLInt },
    date: { type: GraphQLString },
    user_id: { type: GraphQLID },
  }),
});

const GlassWaterType = new GraphQLObjectType({
  name: 'glass_water',
  fields: () => ({
    number_of_drink: { type: GraphQLInt },
    date: { type: GraphQLString },
    user_id: { type: GraphQLID },
  }),
});

const GlassAlcoolType = new GraphQLObjectType({
  name: 'glass_alcool',
  fields: () => ({
    number_of_drink: { type: GraphQLInt },
    date: { type: GraphQLString },
    user_id: { type: GraphQLID },
  }),
});

const SportType = new GraphQLObjectType({
  name: 'sport',
  fields: () => ({
    workout_name: { type: GraphQLString },
    number_of_workout: { type: GraphQLInt },
    date: { type: GraphQLString },
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
      resolve: async (parent, users) => {
        await addUser(users);
      },
    },
    addUserWithWeight: {
      type: UsersType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        height: { type: GraphQLString },
        weight: { type: GraphQLInt },
        date: { type: GraphQLString },
      },
      resolve: async (parent, { name, age, height, weight, date }) =>
        await addUserWithWeight({
          name,
          age,
          height,
          weight,
          date,
        }),
    },
    addWeight: {
      type: WeightType,
      args: {
        weight: { type: GraphQLInt },
        date: { type: GraphQLString },
        user_id: { type: GraphQLInt },
      },
      resolve: async (parent, { weight, date, user_id }) => {
        const kg = await addWeight({ weight, date, user_id });
        console.log(kg);
        return kg;
      },
    },
    addBloodPressure: {
      type: BloodPressureType,
      args: {
        blood_pressure: { type: GraphQLInt },
        date: { type: GraphQLString },
        user_id: { type: GraphQLInt },
      },
      resolve: async (parent, { blood_pressure, date, user_id }) => {
        console.log('hello blood');
        const bloodP = await addBlood({ blood_pressure, date, user_id });
        console.log(bloodP);
        return bloodP;
      },
    },
    addWater: {
      type: GlassWaterType,
      args: {
        number_of_drink: { type: GraphQLInt },
        date: { type: GraphQLString },
        user_id: { type: GraphQLInt },
      },
      resolve: async (parent, { number_of_drink, date, user_id }) => {
        const drinkH2O = await addWater({ number_of_drink, date, user_id });
        return drinkH2O;
      },
    },
    addAlcool: {
      type: GlassAlcoolType,
      args: {
        number_of_drink: { type: GraphQLInt },
        date: { type: GraphQLString },
        user_id: { type: GraphQLInt },
      },
      resolve: async (parent, { number_of_drink, date, user_id }) => {
        const drinkA = await addAlcool({ number_of_drink, date, user_id });
        return drinkA;
      },
    },
    addSport: {
      type: SportType,
      args: {
        workout_name: { type: GraphQLString },
        number_of_workout: { type: GraphQLInt },
        date: { type: GraphQLString },
        user_id: { type: GraphQLInt },
      },
      resolve: async (
        parent,
        { workout_name, number_of_workout, user_id, date }
      ) => {
        const sports = await addSport({
          workout_name,
          number_of_workout,
          user_id,
          date,
        });
        return sports;
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
    weight: {
      type: new GraphQLList(WeightType),
      resolve: async (parent, args) => {
        try {
          const weights = await getWeight();
          return weights;
        } catch (error) {
          console.error('error of weight', error);
        }
      },
    },
    blood_pressure: {
      type: new GraphQLList(BloodPressureType),
      resolve: async (parent, args) => {
        try {
          const blood = await getBlood();
          return blood;
        } catch (error) {
          console.error('error of blood', error);
        }
      },
    },
    glass_water: {
      type: new GraphQLList(GlassWaterType),
      resolve: async (parent, args) => {
        try {
          const water = await getWater();
          return water;
        } catch (error) {
          console.error('error of water', error);
        }
      },
    },
    glass_alcool: {
      type: new GraphQLList(GlassAlcoolType),
      resolve: async (parent, args) => {
        try {
          const alcool = await getAlcool();
          return alcool;
        } catch (error) {
          console.error('error of alcool', error);
        }
      },
    },
    sport: {
      type: new GraphQLList(SportType),
      resolve: async (parent, args) => {
        try {
          const sport = await getSport();
          return sport;
        } catch (error) {
          console.error('error of sport', error);
        }
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
