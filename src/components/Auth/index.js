import React, {Component} from 'react';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {setUserToken} from '../../actions';
import Loader from '../Helper/loader';
import {MessageHelper} from '../Helper/messageHelper';

class AuthLoadingScreen extends Component {
	componentDidMount() {
		this.isLoggedIn();
	}

	componentDidUpdate() {
		if (this.props.isError) {
			MessageHelper.show('error', 'Error', this.props.errorMessage);
		}
	}

	isLoggedIn = async () => {
		try {
			const value = await AsyncStorage.getItem('userToken');
			if (value == null || value == undefined || value == '') {
				MessageHelper.show('warn', 'Please Login', '');
				this.props.navigation.navigate('Login');
			} else {
				await this.props.setUserToken(value);
			}
		} catch (e) {
			alert('error' + e);
		}
	};

	render() {
		return <Loader />;
	}
}
const mapStateToProps = state => {
	return {
		token: state.toke,
		isError: state.isError,
		errorMessage: state.errorMessage,
	};
};

export default connect(
	mapStateToProps,
	{setUserToken},
)(AuthLoadingScreen);
