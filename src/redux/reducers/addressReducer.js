import { FETCH_ADDRESS } from '../actions/addressAction';

const intialState = {
  address: [],
};

export default function (state = intialState, action) {
  switch (action.type) {
    case FETCH_ADDRESS:
      return {
        ...state,
        address: action.payload,
      };
  }

  return state;
}
