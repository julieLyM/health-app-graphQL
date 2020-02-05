import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import moment from 'moment';
import { flowRight as compose } from 'lodash';

import {
  weightQuery,
  addWeightMutation,
  // bloodPressureQuery,
  // GlassWaterQuery,
  // GlassAlcoolQuery,
  // sportQuery,
} from '../services/queries';

class DescriptionHealth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weight: '',
      date: '',
      user_id: 22,
    };
  }

  updateMyForm = (field, { target: { value } }) => {
    this.setState({
      [field]: ['weight', 'user_id'].includes(field) ? Number(value) : value,
    });
  };

  addWeightSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    this.props.addWeight({
      variables: this.state,
      refetchQueries: [{ query: weightQuery }],
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
        <form>
          <input
            type="text"
            placeholder="weight"
            value={this.state.weight}
            onChange={this.updateMyForm.bind(null, 'weight')}
          />
          <button onClick={this.addWeightSubmit}>add weight</button>
        </form>
        <form>
          <input type="text" placeholder="blood_pressure" />
          <button>add blood pressure</button>
        </form>
        <form>
          <input type="text" placeholder="water" />
          <button>add glass of water</button>
        </form>
        <form>
          <input type="text" placeholder="alcool" />
          <button>add glass of alcool</button>
        </form>
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
  graphql(addWeightMutation, { name: 'addWeight' })
)(DescriptionHealth);
