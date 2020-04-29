import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUserToken, setLoading} from '../../actions';
import {
	Container,
	Text,
	Button,
	Label,
	Content,
	Form,
	Item,
	Input,
	Icon,
} from 'native-base';
import {StyleSheet, TouchableHighlight} from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import Loader from '../Helper/loader';
import {MessageHelper} from '../Helper/messageHelper';

const styles = StyleSheet.create({
	form: {
		paddingTop: 10,
		paddingBottom: 50,
	},
	inputContainer: {
		paddingVertical: 5,
	},
	inputTxt: {
		fontSize: 18,
		paddingHorizontal: 15,
		lineHeight: 25,
	},
	btnLogin: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		marginHorizontal: 30,
	},
	error: {
		paddingTop: 10,
		textAlign: 'center',
		color: 'red',
	},
	textView: {
		paddingTop: 10,
		textAlign: 'center',
	},
	textViewLink: {
		paddingTop: 10,
		textAlign: 'center',
		color: '#0000EE',
	},
});

class Login extends ValidationComponent {
	constructor(props) {
		super(props);
		this.state = {
			userName: '',
			userPassword: '',
			userNameErr: '',
			userPasswordErr: '',
		};
	}

	static navigationOptions = {
		headerLeft: () => null,
	};

	componentDidUpdate() {
		if (this.props.token != null) {
			MessageHelper.show('success', 'Success', 'Successfully LoggedIn.');
			this.props.navigation.navigate('Home');
		}
		if (this.props.isError) {
			MessageHelper.show('error', 'Error', this.props.errorMessage);
		}
	}

	_onPressButton = async () => {
		var isFilled = await this.validate({
			userName: {required: true, email: true},
			userPassword: {required: true, minlength: 8},
		});
		if (!isFilled) {
			this.setState({userNameErr: this.getErrorsInField('userName')[0]});
			this.setState({
				userPasswordErr: this.getErrorsInField('userPassword')[0],
			});
		} else {
			this.setState({userNameErr: ''});
			this.setState({userPasswordErr: ''});
			await this.props.setLoading(true);
			await this.props.getUserToken(
				this.state.userName,
				this.state.userPassword,
			);
		}
	};

	userNameErrorMessage = () => {
		if (this.state.userNameErr != '') {
			return <Text style={styles.error}>{this.state.userNameErr}</Text>;
		}
	};

	userPasswordErrorMessage = () => {
		if (this.state.userPasswordErr != '') {
			return <Text style={styles.error}>{this.state.userPasswordErr}</Text>;
		}
	};

	render() {
		if (this.props.isLoading) {
			return <Loader />;
		}
		return (
			<Container>
				<Content keyboardShouldPersistTaps="always">
					<Form style={styles.form}>
						<Item floatingLabel style={styles.inputContainer}>
							<Icon active name="person" />
							<Label>Email</Label>
							<Input
								style={styles.inputTxt}
								onChangeText={userName => this.setState({userName})}
								value={this.state.userName}
							/>
						</Item>

						{this.userNameErrorMessage()}

						<Item floatingLabel style={styles.inputContainer}>
							<Icon type="MaterialCommunityIcons" active name="key-variant" />
							<Label>Password</Label>
							<Input
								style={styles.inputTxt}
								onChangeText={userPassword => this.setState({userPassword})}
								value={this.state.userPassword}
							/>
						</Item>

						{this.userPasswordErrorMessage()}
					</Form>
					<TouchableHighlight>
						<Button
							primary
							style={styles.btnLogin}
							onPress={() => {
								this._onPressButton();
							}}>
							<Text> Login </Text>
						</Button>
					</TouchableHighlight>
					<Text style={styles.textView}>Don't have account?</Text>
					<Text
						style={styles.textViewLink}
						onPress={() => {
							this.props.navigation.push('Register');
						}}>
						Click Here
					</Text>
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = state => {
	return {
		token: state.token,
		isLoading: state.isLoading,
		isError: state.isError,
		errorMessage: state.errorMessage,
	};
};

export default connect(
	mapStateToProps,
	{getUserToken, setLoading},
)(Login);
