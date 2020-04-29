import React, { Component } from 'react';
import { connect } from 'react-redux';
import {NavigationEvents} from 'react-navigation';
import {handleSelectedYear, setLoading} from '../../actions'
import { Container, Content, List, ListItem, Left, Right, Text, Icon } from 'native-base';
import Loader from '../Helper/loader';

class CourseByYear extends Component {
    async componentDidMount() {
    }
    
    componentDidUpdate() {
		if (this.props.isError) {
			MessageHelper.show('error', 'Error', this.props.errorMessage);
        }
        if(this.props.selectedYear){
            this.props.navigation.navigate('MathCourse');
        }
    }

    createYearList = (allCourse) => {
        if(allCourse){
            for(const subCourse of allCourse){
                if(this.props.selectedLevel == subCourse._id){
                    return (
                        subCourse.availableYear.map((year,key) => 
                            <List key={key}>
                                <ListItem onPress={() => this.props.handleSelectedYear(year)}>
                                    <Left>
                                        <Text>{year}</Text>
                                    </Left>
                                    <Right>
                                        <Icon name="arrow-forward" />
                                    </Right>
                                </ListItem>
                            </List>
                        )
                    )
                }else{
                    return(
                        <div></div>
                    );
                }
            }
        }else{
            return(
                <Text></Text>
            )
        }
	}

    render() {
        if (this.props.isLoading) {
			return <Loader />;
		}
        return (
            <Container>
                <NavigationEvents
					onWillFocus={() => this.props.handleSelectedYear('')}
				/>
                <Content>
                    {this.createYearList(this.props.selectedCourse.sub_course)}
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
		token: state.token,
		isLoading: state.isLoading,
		isError: state.isError,
		errorMessage: state.errorMessage,
	};
};

export default connect(mapStateToProps, {handleSelectedYear, setLoading})(CourseByYear);