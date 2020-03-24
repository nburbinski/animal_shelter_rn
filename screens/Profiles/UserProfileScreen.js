import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

import { logout } from "../../store/actions/profileActions";

const UserProfileScreen = props => {
  const uID = useSelector(state => state.profile.userId);
  const shelters = useSelector(state => state.shelter.shelters);
  const shelter = shelters.find(shelter => shelter.uID === uID);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logout());
    props.navigation.navigate("Auth");
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
        <View style={{ width: "100%" }}>
          {shelter ? (
            <View>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate({
                    routeName: "ShelterEdit",
                    params: { shelter: shelter }
                  });
                }}
                style={{ alignItems: "center" }}
              >
                <View style={styles.button}>
                  <AntDesign name={"edit"} size={32} color="darkgrey" />
                  <Text style={styles.text}>
                    {console.log(shelter)}Edit Shelter Details
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={() => {
                  props.navigation.navigate("AnimalForm");
                }}
              >
                <View style={styles.button}>
                  <AntDesign name={"plussquareo"} size={32} color="darkgrey" />
                  <Text style={styles.text}>Add an animal? </Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("ShelterForm");
              }}
              style={{ alignItems: "center" }}
            >
              <View style={styles.button}>
                <AntDesign name={"plussquareo"} size={32} color="darkgrey" />
                <Text style={styles.text}>Create a Shelter!</Text>
              </View>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={handleLogout}
            style={{ alignItems: "center" }}
          >
            <View style={styles.button}>
              <AntDesign name={"logout"} size={32} color="darkgrey" />
              <Text style={styles.text}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: "95%",
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    textAlign: "center",
    fontFamily: "source-sans",
    marginHorizontal: 10,
    fontSize: 15
  }
});

export default UserProfileScreen;
