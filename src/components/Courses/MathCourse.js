import React, { Component } from 'react';
import { connect } from 'react-redux';
import {StyleSheet} from 'react-native'
import { Container, Content, Grid, Row,ListItem, CheckBox, Body, Button, Text } from 'native-base';
import Loader from '../Helper/loader';
import {
	getMathQues,
	saveMathResponse,
	setLoading,
} from '../../actions';

const styles = StyleSheet.create({
    grid: {
		justifyContent: 'center',
		marginVertical: 20,
    },
    main: {
		justifyContent: 'center',
    },
    textStyle: {
        fontSize: 18,
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

class MathCourse extends Component {

    constructor(props) {
		super(props);
		this.state = {
			isEditable: true,
			isCorrect: false,
			isWrong: false,
			isUserInputEmpty: false,
            checkbox : '',
		};
		this.initialState = this.state;
	}

    async componentDidMount() {
        await this.props.setLoading(true);
        await this.props.getMathQues(
            this.props.token,
            this.props.selectedCourse.sub_course[0].parent_id,
            this.props.selectedLevel,
            this.props.selectedYear 
        );
    }

    loadNewQuestion = async () => {
        await this.setState(this.initialState);
	 	await this.props.setLoading(true);
	 	await this.props.getMathQues(
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

    generateOption = () => {
        const checkbox = this.state.checkbox;
        if(this.props.quesData.options){
            if(this.state.isEditable){
                return(
                    this.props.quesData.options.map((option) => 
                        <ListItem key={option._id} style={styles.main}>
                            <CheckBox checked={checkbox == option._id} 
                                onPress={() => this.handleCheckbox(option._id)}/>
                            <Body style={styles.textStyle}>
                                <Text style={styles.textStyle}>{option.option_data}</Text>
                            </Body>
                        </ListItem>
                    )
                )
            }else{  
                return(
                    this.props.quesData.options.map((option) => 
                        <ListItem key={option._id} style={styles.main}>
                            <CheckBox checked={checkbox == option._id} />
                            <Body style={styles.textStyle}>
                                <Text style={styles.textStyle}>{option.option_data}</Text>
                            </Body>
                        </ListItem>
                    )
                )
            }
        }
    }

    handleCheckbox = (id) => {
        this.setState({isUserInputEmpty: false});
        this.setState({checkbox: id});
    }

    validateAnswer = () => {
        if (this.state.checkbox != '') {
            this.setState({isEditable: false});
            if(this.state.checkbox == this.props.quesData.answer){
                this.setState({isCorrect: true});
                this.setState({isWrong: false});
                this.isError();
            }else{
                this.setState({isCorrect: false});
                this.setState({isWrong: true});
                this.isError();
            }
        }else{
            this.setState({isUserInputEmpty: true});
        }
    }

    saveMathResponse = isCorrect => {
        this.props.saveMathResponse(
			this.props.quesData,
			isCorrect,
			this.props.token,
		);
	};

    isError() {
		if (this.state.isUserInputEmpty) {
			return (
				<Row size={1}>
					<Text style={styles.error}>Please select the answer.</Text>
				</Row>
			);
        } else if (!this.state.isCorrect && this.state.isWrong) {
			this.saveMathResponse(this.state.isCorrect);
			return (
				<Row size={1}>
					<Text style={styles.error}>
						Sorry! Click continue for next question.
					</Text>
				</Row>
			);
		} else if (this.state.isCorrect) {
			this.saveMathResponse(this.state.isCorrect);
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
                            <Text style={styles.textStyle}>Q. {this.props.ques.question}</Text>
                        </Row>
                    </Grid>
                    {this.generateOption()}
                    {this.isError()}
                    <Row size={1} style={styles.grid}>
                        {this.state.isWrong || this.state.isCorrect ? (
                            <Button
                                bordered
                                rounded
                                primary
                                style={styles.btnStyle}
                                onPress={() => {
                                    this.loadNewQuestion();
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
                                    this.validateAnswer();
                                }}>
                                <Text>Validate</Text>
                            </Button>
                        )}
                    </Row>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedCourse: state.selectedCourse,
        selectedLevel: state.selectedLevel,
        selectedYear:state.selectedYear,
        ques: state.ques,
        quesData: state.quesData,
		token: state.token,
		isLoading: state.isLoading,
		isError: state.isError,
		errorMessage: state.errorMessage,
	};
};

export default connect( mapStateToProps, {
    getMathQues,
	saveMathResponse,
	setLoading,
})(MathCourse);