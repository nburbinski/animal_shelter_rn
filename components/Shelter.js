import React, { useEffect, useCallback, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { toggleLike } from "../store/actions/shelterActions";

const Shelter = props => {
  const dispatch = useDispatch();
  let dogCount = 0;
  let catCount = 0;

  for (let animal in props.shelter.animals) {
    if (props.shelter.animals[animal].type === "Dog") {
      dogCount++;
    }
    if (props.shelter.animals[animal].type === "Cat") {
      catCount++;
    }
  }

  const handleCheckPress = useCallback(() => {
    dispatch(toggleLike(props.shelter.id, props.shelter.liked));
  });

  useEffect(() => {
    props.navigation.setParams({ toggleLike: handleCheckPress });
  }, [dispatch]);

  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate({
          routeName: "ShelterProfile",
          params: {
            shelter: props.shelter
          }
        });
      }}
    >
      <View style={styles.shelterContainer}>
        <View style={styles.shelterImageContainer}>
          <Image
            style={styles.shelterImage}
            source={{
              uri: props.shelter.image ? props.shelter.image : props.shelter.url
            }}
          />
        </View>
        <View style={styles.shelterInfo}>
          <View style={styles.shelterName}>
            <Text style={styles.shelterNameText}>{props.shelter.name}</Text>
          </View>
          <View style={styles.shelterAddress}>
            <Text style={styles.shelterAddressText}>
              {props.shelter.address}
            </Text>
          </View>
          <View style={styles.stats}>
            <View style={styles.statContainer}>
              <Text style={styles.statsText}>{`Cats: ${catCount}`}</Text>
            </View>
            <View style={styles.statContainer}>
              <Text style={styles.statsText}>{`Dogs: ${dogCount}`}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shelterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  shelterImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "grey",
    marginLeft: 10
  },
  shelterImage: {
    width: 100,
    height: 100,
    resizeMode: "stretch"
  },
  shelterInfo: {
    flex: 3,
    alignItems: "center",
    marginHorizontal: 10
  },
  shelterNameText: {
    fontSize: 20,
    fontFamily: "source-sans-semi-bold",
    color: "#000000",
    lineHeight: 20,
    textAlign: "center"
  },
  shelterAddressText: {
    color: "#545454",
    textAlign: "center"
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  statContainer: {
    backgroundColor: "#3281FF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5
  },
  statsText: {
    color: "white",
    fontFamily: "source-sans-semi-bold",
    fontSize: 14
  }
});

export default Shelter;
