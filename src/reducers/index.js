import Config from "react-native-config";
const initialState = {
  dataUrl: Config.dataUrl,
  token: null,
  isLoading: false,
  isError: false,
  errorMessage: '',
  courses: [],
  selectedCourse: '',
  selectedLevel:'',
  selectedYear:'',
  ques: {},
  quesData:{}
};
// default method
export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {...state, isLoading: action.payload};
    case 'SET_ERROR':
      return {
        ...state,
        isError: action.payload.error || action.payload.completed,
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
        selectedLevel: '',
        selectedYear:'',
      };
    case 'SELECTED_COURSE':
      return {
        ...state,
        selectedCourse: action.payload,
        selectedLevel: action.level,
        selectedYear:'',
      };
    case 'SELECTED_YEAR':
        return {
          ...state,
          selectedYear: action.payload,
        };
    case 'GET_SPELLING':
      console.log('get spelling course => ' + JSON.stringify(action.payload));
      return {
        ...state,
        ques: action.payload,
      };
    case 'SAVE_SPELLING_RESPONSE':
      return {
        ...state,
      };
    case 'GET_MATH_QUES':
      //console.log('get Math => ' + JSON.stringify(action.payload));
      return {
        ...state,
        ques: action.payload.ques,
        quesData: action.payload,
      };
    case 'SAVE_MATH_RESPONSE':
      return {
        ...state,
      };


    default:
      return state;
  }
};
