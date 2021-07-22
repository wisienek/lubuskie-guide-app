import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
   StaticText: {
      color: "#3C3C3C"
   },
   sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
   },
   sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
   },
   sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
   },
   highlight: {
      fontWeight: '700',
   },
   logoContainer: {
      backgroundColor: "#c4c4c4",
      width: "65%",
      opacity: 0.85,
      padding: 10,
      paddingRight: 30,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      display: 'flex',
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center"
   },
   searchContainer: {
      marginTop: 50,
      backgroundColor: "#c4c4c4",
      width: "85%",
      opacity: 0.7,
      padding: 20,
      borderRadius: 20,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
   },
   categoryContainer: { 
      marginRight: 20, 
      display: 'flex', 
      flexDirection: 'column', 
      width: 100, 
      alignItems: "center" 
   }
});



module.exports = styles;