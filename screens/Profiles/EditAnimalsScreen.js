import React from "react";
import { SafeAreaView, View, FlatList, StyleSheet } from "react-native";
import EditAnimal from "../../components/EditAnimal";

const EditAnimalsScreen = props => {
  const shelter = props.navigation.getParam("shelter");

  let animals = [];

  for (var id in shelter.animals) {
    animals.push(shelter.animals[id]);
  }

  if (animals.length === 0) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "darkgrey" }}>
          No Animals added to this Shelter yet!
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={animals}
        numColumns={2}
        renderItem={animal => {
          return (
            <EditAnimal
              animal={animal.item}
              loadProfile={props.loadProfile}
              selectAnimal={props.selectAnimal}
              navigation={props.navigation}
              shelter={props.shelter}
            />
          );
        }}
        keyExtractor={item => item.name}
      />
    </SafeAreaView>
  );
};

EditAnimalsScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "Edit Animal List"
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default EditAnimalsScreen;
