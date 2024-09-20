import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#3b2a6c",
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    borderColor: "white",
    color: "white",
  },
  weatherDetailsView: {
    marginTop: 12,
  },
  weatherText: {
    fontSize: 16,
    color: "white",
    fontWeight: "semibold",
    marginTop: 4,
  },
  weatherImage: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 20,
    alignSelf: "center",
  },
});

export default styles;
