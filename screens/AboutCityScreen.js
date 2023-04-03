import React from "react";
import { View, Text, Button, StyleSheet, style, ScrollView, ImageBackground } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function AboutCityScreen({ navigation }) {
  const route = useRoute();
  const heading = route.params?.heading;
  const paragraph = route.params?.paragraph;

  const cityImage = { uri: "https://picsum.photos/id/10/2500/1667"};
  

  return (
    <View style={styles.container}>

      <ImageBackground 
      source={cityImage}
      style={styles.cityImage}
      >
        <View style={styles.cityImage}>

        </View>

      <ScrollView style={styles.scrollview} >
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.paragraph}>{paragraph}</Text>
      </ScrollView>
      </ImageBackground>


    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  heading: {
    fontSize: 40,
    marginTop: 10,
    marginLeft:10,
  },
  paragraph:{
    margin:12,

  },
  cityImage:{
    flex:1,
  },
  scrollview:{
    flex:1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  }
});
