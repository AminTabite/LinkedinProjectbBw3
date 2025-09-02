const initialState = {
  jobsArray: [],
};

const JobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_JOBS":
      return {
        jobsArray: action.payload,
      };

    default:
      return state;
  }
};

export default JobsReducer;
