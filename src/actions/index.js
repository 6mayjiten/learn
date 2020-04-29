import AsyncStorage from '@react-native-community/async-storage';
import NavigationService from '../components/Navigation/NavigationService';
import Config from "react-native-config";
let apiUrl = Config.apiUrl;

let createHeaders = userToken => {
	var header = new Headers();
	header.append('Accept', 'application/json');
	header.append('Content-Type', 'application/json');
	header.append('x-access-token', userToken);
	return header;
};

export const setLoading = isLoading => {
	return {
		type: 'SET_LOADING',
		payload: isLoading,
	};
};

export const removeError = () => {
	return {
		type: 'REMOVE_ALERT',
	};
};

export const userRegistration = (firstName, lastName, email, password) => {
	return dispatch => {
		fetch(apiUrl + 'register', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				first_name: firstName,
				last_name: lastName,
				email: email.trim().toLowerCase(),
				password: password,
			}),
		})
			.then(response => {
				return response.json();
			})
			.then(data => {
				if (data.auth) {
					AsyncStorage.setItem('userToken', data.token)
						.then(result => {
							dispatch({type: 'SET_LOADING', payload: false});
							dispatch({type: 'SAVE_TOKEN', payload: data});
						})
						.catch(error => {});
				} else {
					dispatch({type: 'SET_LOADING', payload: false});
					dispatch({type: 'SET_ERROR', payload: data});
					dispatch({type: 'REMOVE_ERROR'});
				}
			})
			.catch(error => {
				dispatch({type: 'SET_LOADING', payload: false});
				dispatch({type: 'SET_ERROR', payload: {error: true, message: error}});
				dispatch({type: 'REMOVE_ERROR'});
			});
	};
};

export const setUserToken = value => {
	return dispatch => {
		fetch(apiUrl + 'verifyToken', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				token: value,
			}),
		})
			.then(response => {
				return response.json();
			})
			.then(data => {
				if (data.auth) {
					dispatch({type: 'SAVE_TOKEN', payload: {token: value}});
					dispatch(NavigationService.navigate('Home', {}));
				} else {
					AsyncStorage.removeItem('userToken')
						.then(result => {
							dispatch({type: 'SET_ERROR', payload: data});
							dispatch({type: 'REMOVE_ERROR'});
							dispatch(NavigationService.navigate('Login', {}));
						})
						.catch(error => {});
				}
			})
			.catch(error => {
				dispatch({type: 'SET_ERROR', payload: {error: true, message: error}});
				dispatch({type: 'REMOVE_ERROR'});
			});
	};
};

export const getUserToken = (userName, password) => {
	return dispatch => {
		fetch(apiUrl + 'login', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: userName.trim().toLowerCase(),
				password: password.trim(),
			}),
		})
			.then(response => {
				return response.json();
			})
			.then(data => {
				if (data.auth) {
					AsyncStorage.setItem('userToken', data.token)
						.then(result => {
							dispatch({type: 'SET_LOADING', payload: false});
							dispatch({type: 'SAVE_TOKEN', payload: data});
						})
						.catch(error => {});
				} else {
					dispatch({type: 'SET_LOADING', payload: false});
					dispatch({type: 'SET_ERROR', payload: data});
					dispatch({type: 'REMOVE_ERROR'});
				}
			})
			.catch(error => {
				dispatch({type: 'SET_LOADING', payload: false});
				dispatch({type: 'SET_ERROR', payload: {error: true, message: error}});
				dispatch({type: 'REMOVE_ERROR'});
			});
	};
};

export const removeUserToken = () => {
	return dispatch => {
		AsyncStorage.removeItem('userToken')
			.then(result => {
				dispatch({type: 'SET_LOADING', payload: false});
				dispatch({type: 'REMOVE_TOKEN', payload: null});
				dispatch(NavigationService.navigate('Login', {}));
			})
			.catch(error => {
				dispatch({type: 'SET_LOADING', payload: false});
				dispatch({type: 'SET_ERROR', payload: {error: true, message: error}});
				dispatch({type: 'REMOVE_ERROR'});
			});
	};
};

export const loadCourse = token => {
	return dispatch => {
		fetch(apiUrl + 'courses', {
			method: 'GET',
			headers: createHeaders(token),
		})
			.then(response => {
				return response.json();
			})
			.then(data => {
				if (!data.error) {
					dispatch({type: 'SET_LOADING', payload: false});
					dispatch({type: 'GET_COURSE', payload: data});
				} else {
					dispatch({type: 'SET_LOADING', payload: false});
					dispatch({type: 'SET_ERROR', payload: data});
					dispatch({type: 'REMOVE_ERROR'});
				}
			})
			.catch(error => {
				dispatch({type: 'SET_LOADING', payload: false});
				dispatch({type: 'SET_ERROR', payload: {error: true, message: error}});
				dispatch({type: 'REMOVE_ERROR'});
			});
	};
};

export const selectedCourse = (course,levelId) => {
	return {
		type: 'SELECTED_COURSE',
		payload: course,
		level: levelId,
	};
};

export const handleSelectedYear = (year) => {
	return {
		type: 'SELECTED_YEAR',
		payload: year,
	};
}

export const getSpelling = (token, courseId, levelId, year) => {
	return dispatch => {
		fetch(apiUrl + 'word', {
			method: 'POST',
			headers: createHeaders(token),
			body: JSON.stringify({
				course_id: courseId,
				level_id: levelId,
				year: year
			}),
		})
			.then(response => {
				return response.json();
			})
			.then(data => {
				if (!data.error && !data.completed) {
					dispatch({type: 'GET_SPELLING', payload: data});
					dispatch({type: 'SET_LOADING', payload: false});
				} else if(data.completed){
					dispatch({type: 'SET_LOADING', payload: false});
					dispatch({type: 'SET_ERROR', payload: data});
					dispatch({type: 'REMOVE_ERROR'});
					dispatch(NavigationService.navigate('Courses', {}));
				}else {
					dispatch({type: 'SET_LOADING', payload: false});
					dispatch({type: 'SET_ERROR', payload: data});
					dispatch({type: 'REMOVE_ERROR'});
				}
			})
			.catch(error => {
				dispatch({type: 'SET_LOADING', payload: false});
				dispatch({type: 'SET_ERROR', payload: {error: true, message: error}});
				dispatch({type: 'REMOVE_ERROR'});
			});
	};
};

export const saveSpellingResponse = (ques, isCorrect, token) => {
	return dispatch => {
		fetch(apiUrl + 'save-spelling-response', {
			method: 'POST',
			headers: createHeaders(token),
			body: JSON.stringify({
				result_id: ques.result_id,
				is_right: isCorrect,
			}),
		})
			.then(response => {
				return response.json();
			})
			.then(data => {
				if (!data.error) {
					dispatch({type: 'SAVE_SPELLING_RESPONSE'});
					dispatch({type: 'SET_LOADING', payload: false});
				} else {
					dispatch({type: 'SET_LOADING', payload: false});
					dispatch({type: 'SET_ERROR', payload: data});
					dispatch({type: 'REMOVE_ERROR'});
					dispatch(NavigationService.navigate('Courses', {}));
				}
			})
			.catch(error => {
				dispatch({type: 'SET_LOADING', payload: false});
				dispatch({type: 'SET_ERROR', payload: {error: true, message: error}});
				dispatch({type: 'REMOVE_ERROR'});
			});
	};
};

export const getMathQues = (token, courseId, levelId, year) => {
	return dispatch => {
		fetch(apiUrl + 'math', {
			method: 'POST',
			headers: createHeaders(token),
			body: JSON.stringify({
				course_id: courseId,
				level_id: levelId,
				year: year
			}),
		})
		.then(response => {
			return response.json();
		})
		.then(data => {
			if (!data.error && !data.completed) {
				dispatch({type: 'SET_LOADING', payload: false});
				dispatch({type: 'GET_MATH_QUES', payload: data});
			}else if(data.completed){
				dispatch({type: 'SET_LOADING', payload: false});
				dispatch({type: 'SET_ERROR', payload: data});
				dispatch({type: 'REMOVE_ERROR'});
				dispatch(NavigationService.navigate('Courses', {}));
			} else {
				dispatch({type: 'SET_LOADING', payload: false});
				dispatch({type: 'SET_ERROR', payload: data});
				dispatch({type: 'REMOVE_ERROR'});
			}
		})
		.catch(error => {
			dispatch({type: 'SET_LOADING', payload: false});
			dispatch({type: 'SET_ERROR', payload: {error: true, message: error}});
			dispatch({type: 'REMOVE_ERROR'});
		});
	};
};

export const saveMathResponse = (quesData, isCorrect, token) => {
	return dispatch => {
		fetch(apiUrl + 'save-math-response', {
			method: 'POST',
			headers: createHeaders(token),
			body: JSON.stringify({
				result_id: quesData.result_id,
				is_right: isCorrect,
			}),
		})
			.then(response => {
				return response.json();
			})
			.then(data => {
				if (!data.error) {
					dispatch({type: 'SAVE_MATH_RESPONSE'});
					dispatch({type: 'SET_LOADING', payload: false});
				} else {
					dispatch({type: 'SET_LOADING', payload: false});
					dispatch({type: 'SET_ERROR', payload: data});
					dispatch({type: 'REMOVE_ERROR'});
					dispatch(NavigationService.navigate('Courses', {}));
				}
			})
			.catch(error => {
				dispatch({type: 'SET_LOADING', payload: false});
				dispatch({type: 'SET_ERROR', payload: {error: true, message: error}});
				dispatch({type: 'REMOVE_ERROR'});
			});
	};
};

