import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import moment from 'moment';
import { flowRight as compose } from 'lodash';

import {
  weightQuery,
  addWeightMutation,
  bloodPressureQuery,
  addBloodMutation,
  // GlassWaterQuery,
  // GlassAlcoolQuery,
  // sportQuery,
} from '../services/queries';

class DescriptionHealth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weight: '',
      date: '2020/02/03',
      user_id: 1,
      blood: '',
    };
  }

  updateMyForm = (field, { target: { value } }) => {
    this.setState({
      [field]: ['weight', 'blood', 'user_id'].includes(field)
        ? Number(value)
        : value,
    });
  };

  addWeightSubmit = e => {
    e.preventDefault();
    this.props.addWeight({
      variables: this.state,
      refetchQueries: [{ query: weightQuery }],
    });
  };

  addBloodSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    this.props.addBlood({
      variables: this.state,
      refetchQueries: [{ query: bloodPressureQuery }],
    });
  };

  render() {
    return (
      <div>
        <h1>update health</h1>
        {!this.props.weight.loading &&
          this.props.weight.weight.map((element, i) => (
            <div key={i}>
              {element.weight} kg -{' '}
              {moment(element.date, 'x').format('DD-MM-YYYY')}
            </div>
          ))}
        <h2>Weight :</h2>
        <form>
          <input
            type="text"
            placeholder="weight"
            value={this.state.weight}
            onChange={this.updateMyForm.bind(null, 'weight')}
          />
          <button onClick={this.addWeightSubmit}>add weight</button>
        </form>

        <h2>Blood Pressure :</h2>
        <form>
          {!this.props.blood.loading &&
            this.props.blood.blood_pressure.map((bloods, i) => (
              <div key={i}>
                Blood Pressure: {bloods.blood_pressure} - Date:{' '}
                {moment(bloods.date, 'x').format('DD-MM-YYYY')}
              </div>
            ))}
          <input
            type="text"
            placeholder="blood_pressure"
            value={this.state.blood}
            onChange={this.updateMyForm.bind(null, 'blood')}
          />
          <button onClick={this.addBloodSubmit}>add blood pressure</button>
        </form>

        <h2>Glass of water :</h2>
        <form>
          <input type="text" placeholder="water" />
          <button>add glass of water</button>
        </form>

        <h2>Glass of alcool :</h2>
        <form>
          <input type="text" placeholder="alcool" />
          <button>add glass of alcool</button>
        </form>

        <h2>Sport :</h2>
        <form>
          <input type="text" placeholder="sport" />
          <button>add sport</button>
        </form>
      </div>
    );
  }
}

export default compose(
  graphql(weightQuery, { name: 'weight' }),
  graphql(addWeightMutation, { name: 'addWeight' }),
  graphql(bloodPressureQuery, { name: 'blood' }),
  graphql(addBloodMutation, { name: 'addBlood' })
)(DescriptionHealth);
