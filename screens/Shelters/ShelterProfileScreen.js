import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
  FlatList
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import MapView, { Marker } from "react-native-maps";

import HeaderButton from "../../components/HeaderButton";
import { fetchAnimals } from "../../store/actions/actions";
import AnimalList from "../../components/AnimalList";
import { GOOGLE_API_KEY } from "react-native-dotenv";

const ShelterProfileScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMapLoading, setIsMapLoading] = useState(false);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const shelter = props.navigation.getParam("shelter");
  const animals = useSelector(state => state.animals.filteredAnimals);
  const animal = [""];

  const dispatch = useDispatch();

  const loadAnimals = useCallback(async () => {
    setIsLoading(true);
    dispatch(fetchAnimals());
    setIsLoading(false);
  });

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
    loadAnimals();
    getCoordinates();
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isLoading && animals.length === 0) {
    return (
      <View style={styles.loading}>
        <Text>No animals found!</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.shelterInfo}>
        <Text style={styles.shelterName}>{shelter.name}</Text>
        <Text>{shelter.address}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={animal}
          renderItem={() => (
            <View style={styles.profileContainer} key={animal}>
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
                  animals={animals}
                />
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
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
    backgroundColor: "#FFFFFF",
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
