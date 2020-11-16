export const FETCH_ADDRESS = 'FETCH_ADDRESS';

const BASE_URL = 'https://api.addressy.com/Capture/Interactive/Find/v1.10';
const KEY = 'RJ49-CU18-RP94-TA39';

// https://api.addressy.com/Capture/Interactive/Find/v1.10/json3.ws?Key=RJ49-CU18-RP94-TA39&Text=white house

export const fetchAddress = (address) => {
  return async (dispatch) => {
    // logic to fetch houses from API
    const result = await fetch(`${BASE_URL}/json3.ws?Key=${KEY}&Text=${address}`);

    const resultData = await result.json();

    dispatch({
      type: FETCH_ADDRESS,
      payload: resultData,
    });

    return resultData;
  };
};
