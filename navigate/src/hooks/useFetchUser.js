import { useState, useEffect } from "react";import { Alert } from "react-native";
const useFetchUser = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    edad: "",
    correo: "",
  });
  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://retoolapi.dev/zZhXYF/movil");
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleGuardar = async () => {
    const { nombre, edad, correo } = formData;
    if (!nombre || !edad || !correo) {
      Alert.alert("Error", "Por favor, completa todos los campos");
      return;
    }
    try {
      const response = await fetch("https://retoolapi.dev/zZhXYF/movil", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, edad: parseInt(edad), correo }),
      });
      if (response.ok) {
        Alert.alert("Éxito", "Usuario guardado correctamente");
        setFormData({ nombre: "", edad: "", correo: "" });
        fetchUsuarios();
      } else {
        Alert.alert("Error", "No se pudo guardar el usuario");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al enviar los datos");
    }
  };
  const handleEliminar = async (id) => {
    Alert.alert("Confirmar eliminación", "¿Seguro que quieres eliminar este usuario?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          try {
            const response = await fetch(`https://retoolapi.dev/zZhXYF/movil/${id}`, {
              method: "DELETE",
            });
            if (response.ok) {
              Alert.alert("Éxito", "Usuario eliminado");
              fetchUsuarios();
            } else {
              Alert.alert("Error", "No se pudo eliminar el usuario");
            }
          } catch (error) {
            console.error(error);
            Alert.alert("Error", "Ocurrió un error al eliminar");
          }
        },
      },
    ]);
  };
  const prepararEdicion = (user) => {
    setUsuarioEditando(user);
    setFormData({
      nombre: user.nombre,
      edad: user.edad.toString(),
      correo: user.correo,
    });
  };
  const handleActualizar = async () => {
    const { nombre, edad, correo } = formData;
    if (!usuarioEditando) return;
    try {
      const response = await fetch(`https://retoolapi.dev/zZhXYF/movil/${usuarioEditando.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, edad: parseInt(edad), correo }),
      });
      if (response.ok) {
        Alert.alert("Éxito", "Usuario actualizado");
        cancelarEdicion();
        fetchUsuarios();
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo actualizar");
    }
  };
  const cancelarEdicion = () => {
    setUsuarioEditando(null);
    setFormData({ nombre: "", edad: "", correo: "" });
  };
  useEffect(() => {
    fetchUsuarios();
  }, []);
  return {
    usuarios,
    loading,
    usuarioEditando,
    formData,
    setFormData,
    fetchUsuarios,
    prepararEdicion,
    cancelarEdicion,
    handleActualizar,
    handleEliminar,
    handleGuardar,
  };};
export default useFetchUser;
 