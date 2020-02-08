import React, {Component} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {Container, Grid, Row, Button, Text} from 'native-base';
import {connect} from 'react-redux';
import {loadCourse, setLoading} from '../../actions';
import CourseItem from '../Courses/CourseItem';
import {NavigationEvents} from 'react-navigation';
import Loader from '../../Helper/loader';
import {MessageHelper} from '../../Helper/messageHelper';

const styles = StyleSheet.create({
	container: {},
});

class Courses extends Component {
	async componentDidMount() {
		await this.props.setLoading(true);
		await this.props.loadCourse(this.props.token);
	}

	componentDidUpdate() {
		if (this.props.isError) {
			MessageHelper.show('error', 'Error', this.props.errorMessage);
		}
		if (this.props.selectedCourse != '') {
			switch (this.props.selectedCourse.course_name) {
				case 'Spelling':
					this.props.navigation.navigate('SpellingCourse');
					break;
				case 'Meaning':
					this.props.navigation.navigate('MeaningCourse');
					break;
			}
		}
	}

	renderCourse = () => {
		if (this.props.selectedCourse == '') {
			return (
				<FlatList
					data={this.props.courseList}
					renderItem={({item}) => <CourseItem course={item} />}
					keyExtractor={(item, index) => index.toString()}
				/>
			);
		}
	};

	render() {
		if (this.props.isLoading) {
			return <Loader />;
		}
		return (
			<Container>
				<NavigationEvents
					onWillFocus={() => this.props.loadCourse(this.props.token)}
				/>
				<Grid>{this.renderCourse()}</Grid>
			</Container>
		);
	}
}

const mapStateToProps = state => {
	return {
		courseList: state.courses,
		selectedCourse: state.selectedCourse,
		token: state.token,
		isLoading: state.isLoading,
		isError: state.isError,
		errorMessage: state.errorMessage,
	};
};

export default connect(
	mapStateToProps,
	{loadCourse, setLoading},
)(Courses);
