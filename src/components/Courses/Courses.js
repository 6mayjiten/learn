import React, {Component} from 'react';
import {StyleSheet, FlatList, ScrollView} from 'react-native';
import {Container, Grid, Header, Tabs, Tab, ScrollableTab, Row, Button, Text} from 'native-base';
import {connect} from 'react-redux';
import {loadCourse, setLoading} from '../../actions';
import CourseItem from '../Courses/CourseItem';
import {NavigationEvents} from 'react-navigation';
import Loader from '../Helper/loader';
import {MessageHelper} from '../Helper/messageHelper';
import AppHeader from '../Header';

const styles = StyleSheet.create({
	grid: {
		display: "flex",
		justifyContent: "center",
		flexDirection: "column",
		alignItems: "center"
	},
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
			switch(this.props.selectedCourse.main_course) {
				case 'English':
					this.props.selectedCourse.sub_course.forEach(element => {
						if(this.props.selectedLevel==element._id){
							if(element.course_name == "Spelling"){
								this.props.navigation.navigate('SpellingCourse');
							}else if(element.course_name=="Meaning"){
								this.props.navigation.navigate('MeaningCourse');
							}
						}
					});
				break;
				case 'Math':
					this.props.selectedCourse.sub_course.forEach(element => {
						if(this.props.selectedLevel==element._id){
							if(element.availableYear.length<1){
								this.props.navigation.navigate('MathCourse');
							}else{
								if(this.props.selectedYear==""){
									this.props.navigation.navigate('CourseByYear');
								}
							}
						}
					});
				break;
			}
		}
	}

	generateTab = () =>{
		return (
			this.props.courseList.map((course,key) => 
				<Tab key={key} heading={course.main_course}>
					{this.generateTabContent(course)}
				</Tab>
			)
		)
	}

	generateTabContent = (course) => {
		if(course.sub_course.length>0){
			return(
				<FlatList
					data={course.sub_course}
					renderItem={({item}) => <CourseItem course={item} main_course={course}/>}
					keyExtractor={(item, index) => index.toString()}
				/>
			)
		}else{
			return(
				<Grid style={styles.grid}>
					<Text>No Quiz Found</Text>
				</Grid>
			)
		}
	}
	//if (this.props.selectedCourse == '') {
	render() {
		if (this.props.isLoading) {
			return <Loader />;
		}
		return (
			<Container>
				<NavigationEvents
					onWillFocus={() => this.props.loadCourse(this.props.token)}
				/>
				<AppHeader title="Courses" isHome={false} navigation={this.props.navigation} />
				<Tabs renderTabBar={()=> <ScrollableTab />}>
					{this.generateTab()}
				</Tabs>
			</Container>
		);
	}
}

const mapStateToProps = state => {
	return {
		courseList: state.courses,
		selectedCourse: state.selectedCourse,
		selectedLevel: state.selectedLevel,
		selectedYear:state.selectedYear,
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
