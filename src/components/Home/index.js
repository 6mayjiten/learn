import React from 'react';
import {StyleSheet} from 'react-native';
import {Container, Grid, Row, Col, Button, Text} from 'native-base';
import {connect} from 'react-redux';
import {removeUserToken} from '../../actions';
import {MessageHelper} from '../Helper/messageHelper';
import AppHeader from '../Header';

const styles = StyleSheet.create({
  grid: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: "column"
  },
  btnStyle: {
    justifyContent:"center",
    margin: 40,
  },
  btnTxt: {
    textAlign: 'center',
  },
});

class Home extends React.Component {
  componentDidMount() {
    if (this.props.token != null) {
      MessageHelper.show('success', 'Successfully LoggedIn.');
    }
  }
  
  componentDidUpdate() {
    if (this.props.token == null) {
      MessageHelper.show('success', 'Logged Out', '');
    }
  }

  render() {
    return (
      <Container>
        <AppHeader title="Home" isHome={true} navigation={this.props.navigation}/>
        <Grid style={styles.grid}>
          <Button
            style={styles.btnStyle}
            onPress={() => this.props.navigation.navigate('Courses')}>
            <Text style={styles.btnTxt}>Go To Courses!</Text>
          </Button>
          <Button
            style={styles.btnStyle}
            onPress={() => this.props.removeUserToken()}>
            <Text style={styles.btnTxt}>Log Out!</Text>
          </Button>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
  };
};

export default connect(
  mapStateToProps,
  {removeUserToken},
)(Home);
