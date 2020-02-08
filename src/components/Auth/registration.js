import React from 'react';
import {connect} from 'react-redux';
import {
	Container,
	Text,
	Button,
	Label,
	Content,
	Form,
	Item,
	Input,
	Grid,
	Col,
} from 'native-base';
import {StyleSheet, TouchableHighlight} from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import {userRegistration, setLoading} from '../../actions';
import Loader from '../../Helper/loader';
import {MessageHelper} from '../../Helper/messageHelper';

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
	btnSignUp: {
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
});

class Registration extends ValidationComponent {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			userName: '',
			userPassword: '',
			userCnfrmPassword: '',
			firstNameErr: '',
			userNameErr: '',
			userPasswordErr: '',
			userCnfrmPasswordErr: '',
		};
	}

	componentDidUpdate() {
		if (this.props.isError) {
			MessageHelper.show('error', 'Error', this.props.errorMessage);
		}
		if (this.props.token) {
			MessageHelper.show('sucess', 'Registeration Completed.', '');
		}
	}

	_onPressButton = async () => {
		var passwordRegex = new RegExp(
			'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
		);
		var isFilled = await this.validate({
			firstName: {required: true},
			userName: {required: true, email: true},
			userPassword: {required: true},
			userCnfrmPassword: {required: true},
		});
		this.setState({firstNameErr: this.getErrorsInField('firstName')[0]});
		this.setState({userNameErr: this.getErrorsInField('userName')[0]});
		this.setState({userPasswordErr: this.getErrorsInField('userPassword')[0]});
		this.setState({
			userCnfrmPasswordErr: this.getErrorsInField('userCnfrmPassword')[0],
		});
		if (this.getErrorsInField('userPassword').length < 1) {
			if (passwordRegex.test(this.state.userPassword)) {
				this.setState({userPasswordErr: ''});
			} else {
				this.setState({
					userPasswordErr:
						'Password must have at least 8 character and should contain 1 UpperCase, 1 Lowercase, 1 number and 1 special character.',
				});
				isFilled = false;
			}
		}
		if (this.getErrorsInField('userCnfrmPassword').length < 1) {
			if (this.state.userCnfrmPassword == this.state.userPassword) {
				this.setState({userCnfrmPasswordErr: ''});
			} else {
				this.setState({userCnfrmPasswordErr: 'Password does not match.'});
				isFilled = false;
			}
		}
		if (isFilled) {
			this.props.setLoading(true);
			setTimeout(() => {
				this.props.userRegistration(
					this.state.firstName,
					this.state.lastName,
					this.state.userName,
					this.state.userPassword,
				);
			}, 2000);
		}
	};
	userFirstNameErrorMessage = () => {
		if (this.state.firstNameErr != '') {
			return <Text style={styles.error}>{this.state.firstNameErr}</Text>;
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
	userCnfrmPasswordErrorMessage = () => {
		if (this.state.userCnfrmPasswordErr != '') {
			return (
				<Text style={styles.error}>{this.state.userCnfrmPasswordErr}</Text>
			);
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
						<Grid>
							<Col>
								<Item floatingLabel style={styles.inputContainer}>
									<Label>First Name</Label>
									<Input
										style={styles.inputTxt}
										onChangeText={firstName => this.setState({firstName})}
										value={this.state.firstName}
									/>
								</Item>
								{this.userFirstNameErrorMessage()}
							</Col>
							<Col>
								<Item floatingLabel style={styles.inputContainer}>
									<Label>Last Name</Label>
									<Input
										style={styles.inputTxt}
										onChangeText={lastName => this.setState({lastName})}
										value={this.state.lastName}
									/>
								</Item>
							</Col>
						</Grid>

						<Item floatingLabel style={styles.inputContainer}>
							<Label>Email</Label>
							<Input
								style={styles.inputTxt}
								onChangeText={userName =>
									this.setState({userName: userName.trim().toLocaleLowerCase()})
								}
								value={this.state.userName}
							/>
						</Item>

						{this.userNameErrorMessage()}

						<Item floatingLabel style={styles.inputContainer}>
							<Label>Password</Label>
							<Input
								style={styles.inputTxt}
								onChangeText={userPassword =>
									this.setState({userPassword: userPassword.trim()})
								}
								value={this.state.userPassword}
							/>
						</Item>

						{this.userPasswordErrorMessage()}

						<Item floatingLabel style={styles.inputContainer}>
							<Label>Confirm Password</Label>
							<Input
								style={styles.inputTxt}
								onChangeText={userCnfrmPassword =>
									this.setState({userCnfrmPassword: userCnfrmPassword.trim()})
								}
								value={this.state.userCnfrmPassword}
							/>
						</Item>

						{this.userCnfrmPasswordErrorMessage()}
					</Form>
					<TouchableHighlight>
						<Button
							primary
							style={styles.btnSignUp}
							onPress={() => {
								this._onPressButton();
							}}>
							<Text> Register </Text>
						</Button>
					</TouchableHighlight>
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = state => {
	return {
		isLoading: state.isLoading,
		token: state.token,
		isError: state.isError,
		errorMessage: state.errorMessage,
	};
};

export default connect(
	mapStateToProps,
	{userRegistration, setLoading},
)(Registration);
