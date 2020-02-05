import { gql } from 'apollo-boost';

export const usersQuery = gql`
  {
    users {
      name
      age
      height
    }
  }
`;

export const addUserMutation = gql`
  mutation($name: String, $age: Int, $height: String) {
    addUser(name: $name, age: $age, height: $height) {
      name
      age
      height
    }
  }
`;

export const weightQuery = gql`
  {
    weight {
      weight
      date
    }
  }
`;

export const addWeightMutation = gql`
  mutation($weight: Int, $date: String, $user_id: Int) {
    addWeight(weight: $weight, date: $date, user_id: $user_id) {
      weight
      date
      user_id
    }
  }
`;

export const bloodPressureQuery = gql`
  {
    blood_pressure {
      blood_pressure
      date
      user_id
    }
  }
`;

export const GlassWaterQuery = gql`
  {
    glass_water {
      number_of_drink
      date
      user_id
    }
  }
`;

export const GlassAlcoolQuery = gql`
  {
    glass_alcool {
      number_of_drink
      date
      user_id
    }
  }
`;

export const sportQuery = gql`
  {
    sport {
      workout_name
      number_of_workout
      date
      user_id
    }
  }
`;
