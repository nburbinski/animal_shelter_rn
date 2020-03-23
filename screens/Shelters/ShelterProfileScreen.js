import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
  FlatList
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import MapView, { Marker } from "react-native-maps";

import HeaderButton from "../../components/HeaderButton";
import AnimalList from "../../components/AnimalList";
import { GOOGLE_API_KEY } from "react-native-dotenv";

const ShelterProfileScreen = props => {
  const [isMapLoading, setIsMapLoading] = useState(false);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const shelter = props.navigation.getParam("shelter");

  const getCoordinates = async () => {
    setIsMapLoading(true);
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?&address=${shelter.address}&key=${GOOGLE_API_KEY}`
    );
    const resData = await response.json();
    const coordinates = await resData.results[0].geometry.location;
    setLat(parseFloat(coordinates.lat));
    setLng(parseFloat(coordinates.lng));
    setIsMapLoading(false);
  };

  useEffect(() => {
    getCoordinates();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View style={styles.shelterInfo}>
        <Text style={styles.shelterName}>{shelter.name}</Text>
        <Text>{shelter.address}</Text>
      </View>
      <SafeAreaView style={styles.profileContainer}>
        {isMapLoading ? (
          <View style={styles.mapStyle}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <MapView
            style={styles.mapStyle}
            initialRegion={{
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.0421,
              longitudeDelta: 0.0421
            }}
          >
            <Marker
              coordinate={{ latitude: lat, longitude: lng }}
              title={shelter.name}
            />
          </MapView>
        )}

        <View style={styles.animalList}>
          <AnimalList
            loadProfile={props.loadProfile}
            selectAnimal={props.selectAnimal}
            navigation={props.navigation}
            animals={shelter.animals}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

ShelterProfileScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "Shelter Profile",
    headerTitleStyle: {
      fontFamily: "source-sans",
      fontSize: 20
    },
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="filter"
          iconName="filter"
          onPress={() => {
            navigation.navigate({ routeName: "Filter" });
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  animalList: {
    flex: 1,
    marginHorizontal: 5
  },
  loading: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  profileContainer: {
    flex: 1
  },
  shelterInfo: {
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2
  },
  shelterName: {
    fontSize: 25,
    fontFamily: "source-sans-semi-bold"
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: 100,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ShelterProfileScreen;
