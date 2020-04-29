import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import {Col, Button, Text} from 'native-base';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';

const styles = StyleSheet.create({
	courseSection: {
		margin: 10,
		height: 200,
		justifyContent: 'center',
		borderWidth: 0.3,
		borderRadius: 5,
		borderColor: '#ddd',
		shadowRadius: 5,
		elevation: 1,
	},
	courseName: {
		textAlign: 'center',
		color: '#000',
	},
});

const CourseItem = props => {
	return (
		<TouchableWithoutFeedback
			onPress={() => props.selectedCourse(props.main_course, props.course._id)}>
			<Col style={styles.courseSection}>
				<Text style={styles.courseName}>
					Take {props.course.course_name} Quiz
				</Text>
			</Col>
		</TouchableWithoutFeedback>
	);
};

export default connect(
	null,
	actions,
)(CourseItem);
