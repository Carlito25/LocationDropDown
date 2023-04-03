import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";


const RegionCityDropdowns = () => {
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [cities, setCities] = useState([]);
  
  const [aboutCity, setAboutCity] = useState([])

  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    fetch("https://psgc.gitlab.io/api/regions/")
      .then((response) => response.json())
      .then((data) => setRegions(data));
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      fetch(`https://psgc.gitlab.io/api/regions/${selectedRegion}/cities/`)
        .then((response) => response.json())
        .then((data) => setCities(data));
    }
  }, [selectedRegion]);

  useEffect(()=>{
    if (selectedCity) {
      fetch(`https://psgc.gitlab.io/api/cities/${selectedCity}/`)
        .then((response) => response.json())
        .then((data) => setAboutCity(data.name));   
    } 
  }, [selectedCity])

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  return (
    <View style={styles.container}>
      <View>
        <Picker
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
        <Picker 
          selectedValue={selectedCity}
          onValueChange={handleCityChange}
          >
          {cities.map((city) => (
            <Picker.Item 
            key={city.name} 
            label={city.name} 
            value={city.code} 
            />
          ))}
        </Picker>

        <Button 
          title={aboutCity.toString()}
        />

</View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      justifyContent: "center",
      width: 200,
    },
    
  });
  
  export default RegionCityDropdowns;