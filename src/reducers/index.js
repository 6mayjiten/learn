const initialState = {
  dataUrl: 'http://192.168.0.58:3000/audio/',
  token: null,
  isLoading: false,
  isError: false,
  errorMessage: '',
  courses: [],
  selectedCourse: '',
  ques: {},
};
// default method
export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {...state, isLoading: action.payload};
    case 'SET_ERROR':
      return {
        ...state,
        isError: action.payload.error,
        errorMessage: action.payload.message,
      };
    case 'REMOVE_ERROR':
      return {...state, isError: false, errorMessage: ''};

    case 'SAVE_TOKEN':
      return {...state, token: action.payload.token};
    case 'REMOVE_TOKEN':
      return {...state, token: action.payload};

    case 'GET_COURSE':
      //console.log(action.payload);
      return {
        ...state,
        courses: action.payload,
        selectedCourse: '',
      };
    case 'SELECTED_COURSE':
      return {
        ...state,
        selectedCourse: action.payload,
      };
    case 'GET_SPELLING_COURSE':
      console.log('get spelling course => ' + JSON.stringify(action.payload));
      return {
        ...state,
        ques: action.payload,
      };
    case 'SAVE_SPELLING_RESPONSE':
      return {
        ...state,
      };
    default:
      return state;
  }
};
