import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import {Box, NativeBaseProvider} from "native-base";

export default function DropDown({ navigation }) {

  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [cities, setCities] = useState([]);

  const [aboutCity, setAboutCity] = useState(["About City"]);
  const [cityInformation, setCityInformation] = useState([]);

  const [selectedCity, setSelectedCity] = useState("");

  const[dropdownIsClear, setDropdownIsClear] = useState(false);

  useEffect(() => {
    fetch("https://psgc.gitlab.io/api/regions/")
      .then((response) => response.json())
      .then((data) => setRegions(data));
      
  }, []);

  useEffect(() => {
    fetch("https://baconipsum.com/api/?type=meat-and-filler")
      .then((response) => response.json())
      .then((data) => setCityInformation(data));
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      fetch(`https://psgc.gitlab.io/api/regions/${selectedRegion}/cities/`)
        .then((response) => response.json())
        .then((data) => setCities(data))
        .then(() => setDropdownIsClear(true))
        .then(() => setAboutCity("About City"));
    }
  }, [selectedRegion]);

  useEffect(() => {
    if (selectedCity) {
      fetch(`https://psgc.gitlab.io/api/cities/${selectedCity}/`)
        .then((response) => response.json())
        .then((data) => setAboutCity(data.name))
        .then(() => setDropdownIsClear(false));
    }
  }, [selectedCity]);

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  const handleAboutCityClick = () => {
    if (
      selectedCity == "" ||
      selectedCity == null ||
      selectedCity == "About City"||
      dropdownIsClear == true
    ) {
      Alert.alert("Please choose a Region or City");
    } else {
      navigation.navigate("AboutCity", {
        heading: aboutCity,
        paragraph: cityInformation,
      });
    }
  };

  return (
    <NativeBaseProvider>

    <View style={styles.container}>
      <View style={styles.dropDown}>
        <Box
        shadow="3"
      
        width={'50%'}
        borderRadius="md"
        >

        <Picker
          style={styles.picker}
          selectedValue={selectedRegion}
          onValueChange={handleRegionChange}
        >
          <Picker.Item label="Select a region..." value="" />
          {regions.map((region) => (
            <Picker.Item
              key={region.name}
              label={region.name}
              value={region.code}
            />
          ))}
        </Picker>
        </Box>
        <Box
        shadow="3"
        width={'50%'}
        borderRadius="md"
        >

        <Picker
          style={styles.picker}
          selectedValue={selectedCity}
          onValueChange={handleCityChange}
        >
          <Picker.Item label="Select a City..." value="" />
          {cities.map((city) => (
            <Picker.Item key={city.name} label={city.name} value={city.code} />
          ))}
        </Picker>
        </Box>
      </View>

      <View style={styles.aboutCityButton}>
        <Button title={aboutCity.toString()} onPress={handleAboutCityClick} />
      </View>
     
    </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
  aboutCityButton: {
    flex: 5,
    alignItems: "center",
  },
  dropDown: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  picker: {

  },
  regionDropDown: {
    elevation: 3,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
});
