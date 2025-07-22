import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
 
import useFetchUser from "../hooks/useFetchUser";
import { useFocusEffect } from "@react-navigation/native";
 
const ShowUser = () => {
  const {
    usuarios,
    loading,
    setNombre,
    nombre,
    edad,
    correo,
    setEdad,
    setCorreo, //aqui me quede 
    fetchUsuarios,
    handleEliminar,
    prepararEdicion,
    handleActualizar,
    cancelarEdicion,
    usuarioEditando,
  } = useFetchUser();
 
  // Estados locales para la edición
  /*const [editandoId, setEditandoId] = useState(null);
  const [editNombre, setEditNombre] = useState("");
  const [editEdad, setEditEdad] = useState("");
  const [editCorreo, setEditCorreo] = useState("");*/
 
  // Se ejecuta cada vez que esta pantalla se enfoca
  useFocusEffect(
    useCallback(() => {
      fetchUsuarios();
    }, [])
  );
 
  /*const iniciarEdicion = (user) => {
    setEditandoId(user.id);
    setEditNombre(user.nombre);
    setEditEdad(user.edad.toString());
    setEditCorreo(user.correo);
  };*/
 
 /* const cancelarEdicion = () => {
    setEditandoId(null);
    setEditNombre("");
    setEditEdad("");
    setEditCorreo("");
  };*/
 
  /*const guardarEdicion = async () => {
    if (!editNombre || !editEdad || !editCorreo) {
      Alert.alert("Error", "Por favor, completa todos los campos");
      return;
    }
 
    try {
      const response = await fetch(`https://retoolapi.dev/zZhXYF/movil/${editandoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: editNombre,
          edad: parseInt(editEdad),
          correo: editCorreo,
        }),
      });
 
      if (response.ok) {
        Alert.alert("Éxito", "Usuario actualizado correctamente");
        cancelarEdicion();
        fetchUsuarios();
      } else {
        Alert.alert("Error", "No se pudo actualizar el usuario");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al actualizar el usuario");
    }
  };*/
 
  const CardUser = ({ user }) => {
    const isEditing = usuarioEditando?.id === user.id;
 
    if (isEditing) {
      return (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Editando Usuario</Text>
         
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nombre:</Text>
            <TextInput
              style={styles.input}
              value={nombre}
              onChangeText={setNombre}
              placeholder="Nombre"
            />
          </View>
 
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Edad:</Text>
            <TextInput
              style={styles.input}
              value={edad}
              onChangeText={setEdad}
              placeholder="Edad"
              keyboardType="numeric"
            />
          </View>
 
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Correo:</Text>
            <TextInput
              style={styles.input}
              value={correo}
              onChangeText={setCorreo}
              placeholder="Correo"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
         
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleActualizar}
            >
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
           
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={cancelarEdicion}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
 
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{user.nombre}</Text>
        <Text style={styles.cardText}>Edad: {user.edad}</Text>
        <Text style={styles.cardText}>Correo: {user.correo}</Text>
       
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.editButton]}
            onPress={() => prepararEdicion(user)}
          >
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
         
          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={() => handleEliminar(user.id)}
          >
            <Text style={styles.buttonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
 
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Lista de Usuarios</Text>
      <Text style={styles.subtitle}>
        Consulta los usuarios registrados desde la API
      </Text>
 
      {!loading && (
        <Text style={styles.counterText}>
          Total de usuarios: {usuarios.length}
        </Text>
      )}
 
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#5C3D2E"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(user) => user.id.toString()}
          renderItem={({ item }) => <CardUser user={item} />}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAD8C0",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  listContainer: {
    paddingBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#5C3D2E",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#5C3D2E",
    textAlign: "center",
    marginBottom: 10,
  },
  counterText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3B2C24",
    textAlign: "center",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#5C3D2E",
    marginBottom: 5,
  },
  cardText: {
    fontSize: 16,
    color: "#3B2C24",
    marginBottom: 3,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#5C3D2E",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#F9F9F9",
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#00446A",
  },
  deleteButton: {
    backgroundColor: "#F44336",
  },
  saveButton: {
    backgroundColor: "#2196F3",
  },
  cancelButton: {
    backgroundColor: "#757575",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
 
export default ShowUser;