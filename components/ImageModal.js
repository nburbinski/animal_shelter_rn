import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions
} from "react-native";

const ImageModal = props => {
  return (
    <Modal animationType="slide" visible={props.imageModalVisible}>
      <View style={styles.fullAnimalImageContainer}>
        <TouchableOpacity
          onPress={() => {
            props.setImageModalVisible(!props.imageModalVisible);
          }}
        >
          <Image
            style={styles.fullAnimalImage}
            source={{
              uri: props.url
            }}
          />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  fullAnimalImageContainer: {
    flex: 1,
    backgroundColor: "black"
  },
  fullAnimalImage: {
    height: 500,
    width: 500,
    marginHorizontal: "auto",
    marginVertical: Math.round(Dimensions.get("window").height) / 6
  }
});

export default ImageModal;
