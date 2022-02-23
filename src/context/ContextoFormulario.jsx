import React, { useReducer } from "react";

// Creamos nuestro estado inicial.
const initialState = {
  entrenador: {
    nombre: "",
    apellido: "",
    email: "",
  },
  pokemon: {
    nombrePokemon: "",
    tipoPokemon: "",
    elementoPokemon: "",
    alturaPokemon: "",
    edadPokemon: "",
  },
};

// Creamos la función reductora con los diferentes tipos de acciones.
const reducer = (state, action) => {
  switch (action.type) {
    case "ACTUALIZAR_ENTRENADOR":
      return {
        ...state,
        entrenador: {
          ...state.entrenador,
          ...action.payload,
        },
      };
    case "ACTUALIZAR_POKEMON":
      return {
        ...state,
        pokemon: {
          ...state.pokemon,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export const ContextoFormulario = React.createContext();

const ProviderFormulario = ({ children }) => {
  // Creamos el estado usando useReducer.
  const [formulario, dispatch] = useReducer(reducer, initialState);

  //Modificamos la función de actualización del estado para recibir el tipo de acción y la información a actualizar.
  const handleInputBlur = (type, valorInput) => {
    const { campo, valor } = valorInput;

    // Dispachamos la acción.
    dispatch({
      type,
      payload: {
        [campo]: valor,
      },
    });
  };

  return (
    <ContextoFormulario.Provider
      value={{
        formulario,
        handleInputBlur,
      }}
    >
      {children}
    </ContextoFormulario.Provider>
  );
};

export default ProviderFormulario;
