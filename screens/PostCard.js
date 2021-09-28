import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, StyleSheet, Platform, StatusBar, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import Ionicons from "react-native-vector-icons/Ionicons";

export default class PostCard extends Component{
  render(){
    return(
      <TouchableOpacity
          style={styles.container}
          onPress={() =>
            this.props.navigation.navigate("PostScreen", {
              post: this.props.post
            })
          }
        >
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <View style={styles.authorNameContainer}>
            <Text style={styles.authorNameText}>{this.props.post.author}</Text>
          </View>
          <View style={styles.authorContainer}>
            <View style={styles.authorImageContainer}>
          </View>
          <Image source={require('../assets/post.jpeg')} style={styles.postImage}/>
          <View style={styles.titleContainer}>
          <View>
            <Text style={styles.cationText}>{this.props.post.caption}</Text>
          </View>
          <View style={styles.actionContainer}>
            <View style={styles.likeButton}>
              <Ionicons name={'heart'} size={RFValue(30)} color={"white"} style={{marginTop:18, marginLeft:5, width:40, height:40}}/>
              <Text style={styles.likeText}>12k</Text>
              </View>
            </View>
          </View>
          </View>
        </View>
      </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20)
  },
  titleContainer: {
    paddingLeft: RFValue(0),
    justifyContent: "center"
  },
  authorImageContainer:{
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  authorContainer:{
    justifyContent:'center',
    alignItems:'center',
  },
  authorNameContainer:{
    flexDirection:'row',
    color:'white',
    marginLeft:20,
  },
  authorNameText:{
    fontSize:30,
    color:'white',
  },
  postImage:{
    marginTop:2,
    resizeMode: "contain",
    width: "95%",
    alignSelf: "center",
    height: RFValue(400)
  },
  cationText:{
    fontSize:20,
    color:'white',
    marginTop:5,
    marginLeft:-70,
  },
  likeText:{
    fontSize:22,
    color:'white',
    marginTop:-2,
    marginLeft:-10
  },
  likeButton:{
    width: RFValue(190),
    height: RFValue(50),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eb3948",
    borderRadius: RFValue(25),
    marginTop:5,
  }
})