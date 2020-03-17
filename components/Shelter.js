import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { useDispatch } from "react-redux";

import { toggleLike } from "../store/actions/actions";

const Shelter = props => {
  const dispatch = useDispatch();

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
        <View style={styles.shelterInfo}>
          <View style={styles.shelterName}>
            <Text style={styles.shelterNameText}>{props.shelter.name}</Text>
          </View>
          <View style={styles.shelterAddress}>
            <Text style={styles.shelterAddressText}>
              {props.shelter.address}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shelterContainer: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    marginHorizontal: 10,
    paddingVertical: 7,
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
  shelterInfo: {
    flex: 3,
    alignItems: "flex-start"
  },
  shelterName: {
    paddingHorizontal: 5
  },
  shelterNameText: {
    fontSize: 20,
    fontFamily: "source-sans-semi-bold",
    color: "#000000"
  },
  shelterAddress: {
    paddingHorizontal: 10
  },
  shelterAddressText: {
    color: "#545454"
  }
});

export default Shelter;
