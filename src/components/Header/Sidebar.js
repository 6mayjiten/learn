import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import { Container, Content, Button, ListItem, Text, Icon, Left, Body, Thumbnail} from 'native-base';
import {IMG} from '../../assets/images'

let styles = StyleSheet.create({
    thumbnail: {
        display:"flex",
        justifyContent:"center",
        flexDirection:"column",
        alignSelf:"center",
        marginVertical:20,
        height:150,
        width:150
    }
})

class Sidebar extends Component {
    render() {
        return (
            <Container>
                <Thumbnail source={IMG.ICON_USER} style={styles.thumbnail}/>
                <ListItem icon onPress={()=> this.props.navigation.navigate('Home')}>
                    <Left>
                        <Button style={{ backgroundColor: "#FF9501" }}>
                            <Icon active name="home" onPress={()=> this.props.navigation.navigate('Home')}/>
                        </Button>
                    </Left>
                    <Body>
                        <Text>Home</Text>
                    </Body>
                </ListItem>
                <ListItem icon onPress={()=> this.props.navigation.navigate('Courses')}>
                    <Left>
                        <Button style={{ backgroundColor: "#FF9501" }}>
                            <Icon active name="book" onPress={()=> this.props.navigation.navigate('Courses')}/>
                        </Button>
                    </Left>
                    <Body>
                        <Text>Courses</Text>
                    </Body>
                </ListItem>
            </Container>
        );
    }
}

export default Sidebar;