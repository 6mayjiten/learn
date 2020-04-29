import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {
	getSpelling,
	saveSpellingResponse,
	setLoading,
} from '../../actions';
import {
	Container,
	Text,
	Row,
	Col,
	Button,
	Grid,
	Input,
	Content,
	Item,
} from 'native-base';
import Sound from 'react-native-sound';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {MessageHelper} from '../Helper/messageHelper';
import Loader from '../Helper/loader';

const styles = StyleSheet.create({
	grid: {
		justifyContent: 'center',
		marginTop: 20,
	},
	inputTxt: {
		textAlign: 'center',
		marginHorizontal: 20,
		borderBottomColor: '#54c39a',
		borderBottomWidth: 2,
		marginTop: 20,
	},
	meaningTxt: {
		textAlign: 'center',
		marginHorizontal: 20,
		marginTop: 20,
	},
	btnStyle: {
		justifyContent: 'space-between',
		paddingHorizontal: 50,
	},
	btnTxt: {
		textAlign: 'center',
	},
	error: {
		marginTop: 20,
		textAlign: 'center',
		color: 'red',
		flex: 1,
	},
	success: {
		marginTop: 20,
		textAlign: 'center',
		color: '#69a37d',
		flex: 1,
	},
});

class SpellingCourse extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isEditable: true,
			isCorrect: false,
			isWrong: false,
			isUserInputEmpty: false,
			isLoading: false,
			track: null,
			userSpelling: '',
		};
		this.initialState = this.state;
	}

	async componentDidMount() {
		await this.props.setLoading(true);
		await this.props.getSpelling(
			this.props.token,
			this.props.selectedCourse.sub_course[0].parent_id,
            this.props.selectedLevel,
            this.props.selectedYear 
		);
	}

	loadNewWord = async () => {
		await this.props.setLoading(true);
		await this.setState(this.initialState);
		await this.props.getSpelling(
			this.props.token,
			this.props.selectedCourse.sub_course[0].parent_id,
            this.props.selectedLevel,
            this.props.selectedYear 
		);
	};

	componentDidUpdate() {
		if (this.props.isError) {
			MessageHelper.show('error', 'Error', this.props.errorMessage);
		}
	}

	playTrack = () => {
		this.state.track = new Sound(
			this.props.audioUrl + this.props.ques.word + '.mp3',
			null,
			e => {
				if (e) {
					console.log('error loading track:', e);
				} else {
					console.log('Sound loaded');
					this.state.track.play();
				}
			},
		);
	};

	handleSpelling = text => {
		if (text === '') {
			this.setState({isCorrect: false});
			this.setState({isWrong: false});
		} else if (text != '' && this.state.isUserInputEmpty) {
			this.setState({isUserInputEmpty: false});
		}
		this.setState({userSpelling: text});
	};

	validateSpelling = () => {
		if (this.state.userSpelling != '') {
			this.setState({isEditable: false});
			if (
				this.props.ques.word.toLowerCase() ==
				this.state.userSpelling.trim().toLocaleLowerCase()
			) {
				this.setState({isCorrect: true});
				this.setState({isWrong: false});
				this.isError();
			} else {
				this.setState({isCorrect: false});
				this.setState({isWrong: true});
				this.isError();
			}
		} else {
			this.setState({isUserInputEmpty: true});
		}
	};

	saveSpellingResponse = async (isCorrect) => {
		await this.props.saveSpellingResponse(
			this.props.ques,
			isCorrect,
			this.props.token,
		);
	};

	isError() {
		if (this.state.isUserInputEmpty) {
			return (
				<Row size={1}>
					<Text style={styles.error}>Please enter the word.</Text>
				</Row>
			);
		} else if (!this.state.isUserInputEmpty && !this.state.isCorrect && this.state.isWrong) {
			this.saveSpellingResponse(this.state.isCorrect);
			return (
				<Row size={1}>
					<Text style={styles.error}>
						Sorry! Click continue for next question.
					</Text>
				</Row>
			);
		} else if (!this.state.isUserInputEmpty && this.state.isCorrect) {
			this.saveSpellingResponse(this.state.isCorrect);
			return (
				<Row size={1}>
					<Text style={styles.success}>
						Awesome !! Click continue for next question.
					</Text>
				</Row>
			);
		}
	}

	render() {
		if (this.props.isLoading) {
			return <Loader />;
		}
		return (
				<Container>
					<Content>
						<Grid>
							<Row size={1} style={styles.grid}>
								<Icon
									name="play-circle"
									size={70}
									onPress={() => {
										this.playTrack();
									}}
								/>
							</Row>
							<Row size={3}>
								<Col>
									<Row size={1} style={styles.grid}>
										<Col>
											<Row size={1}>
												<Input
													editable={this.state.isEditable}
													style={styles.inputTxt}
													placeholder="Type Word"
													value={this.state.userSpelling}
													onChangeText={value => {
														this.handleSpelling(value);
													}}
												/>
											</Row>
											{this.isError()}
											<Text style={styles.meaningTxt}>{this.props.ques.meaning}</Text>
										</Col>
									</Row>
									<Row size={1} style={styles.grid}>
										{this.state.isWrong || this.state.isCorrect ? (
											<Button
												bordered
												rounded
												primary
												style={styles.btnStyle}
												onPress={() => {
													this.loadNewWord();
												}}>
												<Text>Continue</Text>
											</Button>
										) : (
											<Button
												bordered
												rounded
												success
												style={styles.btnStyle}
												onPress={() => {
													this.validateSpelling();
												}}>
												<Text>Validate</Text>
											</Button>
										)}
									</Row>
								</Col>
							</Row>
						</Grid>
					</Content>
				</Container>
		);
	}
}

const mapStateToProps = state => {
	return {
		selectedCourse: state.selectedCourse,
		selectedLevel: state.selectedLevel,
		selectedYear: state.selectedYear,
		ques: state.ques,
		audioUrl: state.dataUrl,
		token: state.token,
		isLoading: state.isLoading,
		isError: state.isError,
		errorMessage: state.errorMessage,
	};
};

export default connect(
	mapStateToProps,
	{getSpelling, setLoading, saveSpellingResponse},
)(SpellingCourse);
