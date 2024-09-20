import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#3b2a6c",
  },
  header: {
    fontWeight: "bold",
    fontSize: 18,
    paddingVertical: 4,
    color: "white",
  },
  forecastItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  weatherText: {
    fontSize: 16,
    color: "white",
    fontWeight: "semibold",
    marginTop: 4,
  },
  noDataContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#3b2a6c",
  },
});

export default styles;
