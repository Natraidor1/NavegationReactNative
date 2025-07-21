import {TouchableOpacity, Text, StyleSheet} from "react-native"


const Buttons = ({
    texto, action
})=>{
    return <TouchableOpacity onPress={action} style ={styles.boton}>

    <Text style = {styles.texto}>
        {texto}
    </Text>   
    
    </ TouchableOpacity>

};

const styles = StyleSheet.create({

    boton:{
        padding: 10,
        backgroundColor: '#297c78b3'
    },

    texto:{
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'semibold',
        color: '#FFFFFF'
    }

})

export default Buttons;
