import AsyncStorage from '@react-native-community/async-storage';
import NavigationService from '../components/NavigationService';
import {apiUrl} from 'react-native-dotenv';

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

export const selectedCourse = courseId => {
	return {
		type: 'SELECTED_COURSE',
		payload: courseId,
	};
};

export const getSpellingCourse = (token, courseId) => {
	return dispatch => {
		fetch(apiUrl + 'word', {
			method: 'POST',
			headers: createHeaders(token),
			body: JSON.stringify({
				course_id: courseId,
			}),
		})
			.then(response => {
				return response.json();
			})
			.then(data => {
				if (!data.error) {
					dispatch({type: 'SET_LOADING', payload: false});
					dispatch({type: 'GET_SPELLING_COURSE', payload: data});
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
					dispatch({type: 'SET_LOADING', payload: false});
					dispatch({type: 'SAVE_SPELLING_RESPONSE'});
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
