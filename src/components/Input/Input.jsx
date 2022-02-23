import React, { useContext, useEffect, useRef } from "react";
import { ContextoFormulario } from "../../context/ContextoFormulario";

// Agregamos ua prop que nos diga si debemos hacer focus en el input.
const Input = ({
  name,
  label,
  type = "text",
  shouldFocus = false,
  isPokemon = false,
}) => {
  // Creamos una referencia al input.
  const ref = useRef();

  const { handleInputBlur, formulario } = useContext(ContextoFormulario);

  const [value, setValue] = React.useState(formulario[name] || "");

  const onChange = (e) => setValue(e.target.value);

  const onBlur = (e) => {
    e.preventDefault();

    handleInputBlur(
      isPokemon ? "ACTUALIZAR_POKEMON" : "ACTUALIZAR_ENTRENADOR",
      {
        campo: name,
        valor: value,
      }
    );
  };

  // Cuando el componente se monta, si debemos hacer focus, hacemos focus usando la referencia.
  useEffect(() => {
    if (ref.current && shouldFocus) {
      ref.current.focus();
    }
  }, [shouldFocus]);

  return (
    <div className="input-contenedor">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        value={value}
        id={name}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
      />
    </div>
  );
};

export default Input;
