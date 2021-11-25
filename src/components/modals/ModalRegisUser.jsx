import React, { useState } from "react";
import { postUsuario } from "../../helpers/usuarios"
import { Modal, Button } from "react-bootstrap";

const ModalRegisUser = ({ show, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    rol: "USER_ROLE",
  });

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    postUsuario(formValue).then((respuesta) => {
      //   console.log(respuesta);
      if (respuesta.errors) {
        setLoading(false);
        return window.alert(respuesta.errors[0].msg);
      }
      setLoading(false);
      setFormValue({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        rol: "USER_ROLE",
      });
      handleClose();
    });
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered >
        <div className="cuerpoModal">
        <Modal.Header className="tituloModal">
          <Modal.Title className="text-white">Bienvenido!</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="form-group mb-3">
              <label>Nombre</label>
              <input
                type="text"
                name="nombre"
                className="form-control"
                placeholder="Ej: Pedro"
                required
                value={formValue.nombre}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <label>Apellido</label>
              <input
                type="text"
                name="apellido"
                className="form-control"
                placeholder="Ej: Perez"
                required
                value={formValue.apellido}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="pedroperez@gmail.com"
                required
                value={formValue.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                autoComplete="off"
                required
                value={formValue.password}
                onChange={handleChange}
              />
            </div>
            {/*  */}
          </Modal.Body>
          <Modal.Footer>
            <div className="container">
              <div className="row mb-2">
                <Button variant="warning" type="submit" disabled={loading}>
                  Registrarse
                </Button>
              </div>
              <div className="row">
                <Button onClick={handleClose}>
                  ¿Ya tienes una cuenta? Haz clic aquí.
                </Button>
              </div>
            </div>
          </Modal.Footer>
        </form>
        </div>
      </Modal>
    </div>
  );
};

export default ModalRegisUser;
