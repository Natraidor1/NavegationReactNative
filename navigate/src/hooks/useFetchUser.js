import { useState, useEffect } from "react";
import { Alert } from "react-native";
 
const useFetchUser = () => {
  // Estados del formulario
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [correo, setCorreo] = useState("");
  const [id, setId] = useState("")
  const [activeTab, setActiveTab] = useState("list")
 
  // Estados para la lista de usuarios
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
 
  // Obtener usuarios desde la API
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

    const deleteUser= async(id)=>{

    const response = await fetch(`https://retoolapi.dev/zZhXYF/movil/${id}`,{

        method: "DELETE",
        headers:{
            "Content-Type": "application/json"
        },
    }) 

    if(!response.ok){
        Alert.alert('Error', 'Ocurrio un error al eliminar el usuario')
    }

    Alert.alert('Usuario eliminado correctamente')
    fetchUsuarios();
  };


    const updateUsers = async(dataProduct)=>{

    setId(user.id);
    setNombre(user.name);
    setEdad(user.description);
    setCorreo(user.price);
    setActiveTab("form")

  } 


    const HandleEdit = async (e)=>{

    e.preventDefault();

    try {

        if(nombre === "" || edad === ""|| correo === "" ){
            toast.error("los campos no pueden estar vacios")
            return;
        }

        const editProduct ={
            nombre: nombre,
            edad: edad,
            correo: correo,
        }

        const response = await fetch(`https://retoolapi.dev/zZhXYF/movil/${id}`,{
            method: "PUT",
            headers:{"Content-Type": "application/json",
            },
            body: JSON.stringify(editProduct),
        });

        if(!response.ok){
            Alert.alert("Error", "no se pudo actualizar al usuario")
        }

        const data = await response.json();
        toast.success("producto actuzalizado");
        setId("");
        setNombre("");
        setEdad("");
        setCorreo("");
        setActiveTab("list")
        fetchUsuarios();
    } catch (error) {

        console.error("Error al editar la categoria:",  error)
    }
};
 
  // Guardar nuevo usuario en la API
  const handleGuardar = async () => {
    if (!nombre || !edad || !correo) {
      Alert.alert("Error", "Por favor, completa todos los campos");
      return;
    }
 
    try {
      const response = await fetch("https://retoolapi.dev/zZhXYF/movil", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          edad: parseInt(edad),
          correo,
        }),
      });
 
      if (response.ok) {
        Alert.alert("Éxito", "Usuario guardado correctamente");
        setNombre("");
        setEdad("");
        setCorreo("");
        fetchUsuarios(); // Actualizar lista
      } else {
        Alert.alert("Error", "No se pudo guardar el usuario");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al enviar los datos");
    }
  };
 
  // Ejecutar al cargar componente
  useEffect(() => {
    fetchUsuarios();
    console.log("actualizando en useEffect");
  }, []);
 
  return {
    nombre,
    setNombre,
    edad,
    updateUsers,
    setEdad,
    correo,
    setCorreo,
    handleGuardar,
    HandleEdit,
    usuarios,
    loading,
    deleteUser,
    fetchUsuarios,
  };
};
 
export default useFetchUser;