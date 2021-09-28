import React, { Component } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, Platform, Switch } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import firebase from 'firebase';

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      light_theme:true,
      isEnabled:false,
      profileImage:"",
      name:"",
    };
  }
  toggleSwitch() {
    const previous_state = this.state.isEnabled;
    const theme = !this.state.isEnabled ? "dark" : "light";
    var updates = {};
    updates[
      "/users/" + firebase.auth().currentUser.uid + "/current_theme"
    ] = theme;
    firebase
      .database()
      .ref()
      .update(updates);
    this.setState({ isEnabled: !previous_state, light_theme: previous_state });
  }
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  async fetchUser(){
    let theme,name,image
    await firebase.database().ref('/user/' + firebase.auth().currentUser.uid)
    .on("value",function(snapshot){
      theme = snapshot.val().currentTheme
      name = `${snapshot}.val().firstName${snapshot}.val().lastName`
      image = snapshot.val().profile.picture
    })
    this.setState({
      light_theme:theme==="light"?true:false,
      isEnabled:theme==="light"?false:true,
      name:name,
      profileImage:image
    })
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <Image
              source={require("../assets/logo.png")}
              style={styles.appIcon}
            ></Image>
            <Text style={styles.appTitleText}>{`Spectagram`}</Text>
          </View>
          <View>
            <View>
              <Image source={{uri:this.state.profileImage}}></Image>
              <Text>{this.state.name}</Text>
            </View>
            <View>
              <Text>Dark Theme</Text>
              <Switch 
                style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
                trackColor={{false:"yellow",true:"green"}} 
                thumbColor={this.state.isEnabled?"grey":"darkblue"} 
                ios_backgroundColor="#3e3e3e"
                onValueChange={()=>this.toggleSwitch}
                value={this.state.isEnabled}
              />
            </View>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});
