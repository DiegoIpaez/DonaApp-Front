import React, { useState } from "react";
import { postUsuario } from "../../helpers/usuarios";
import { Modal, Button } from "react-bootstrap";

const ModalUser = ({ show, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    rol: "",
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
        rol: "",
      });
      handleClose();
    });
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header className="tituloModal">
          <Modal.Title>Alta de Usuario</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                name="nombre"
                className="form-control"
                placeholder="Ej: Pedro"
                required
                value={formValue.nombre}
                onChange={handleChange}
                maxLength={20}
                minLength={3}
              />
            </div>
            <div className="form-group">
              <label>Apellido</label>
              <input
                type="text"
                name="apellido"
                className="form-control"
                placeholder="Ej: Perez"
                required
                value={formValue.apellido}
                onChange={handleChange}
                maxLength={20}
                minLength={3}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="pedroperez@gmail.com"
                required
                value={formValue.email}
                onChange={handleChange}
                maxLength={20}
                minLength={3}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                autoComplete="off"
                required
                value={formValue.password}
                onChange={handleChange}
                maxLength={20}
                minLength={6}
              />
            </div>
            <div className="form-group">
              <label>Rol</label>
              <select
                className="form-select"
                name="rol"
                aria-label="Default select example"
                value={formValue.rol}
                onChange={handleChange}
                required
              >
                <option defaultValue="">Elige un Rol</option>
                <option value="USER_ROLE">Usuario</option>
                <option value="ADMIN_ROLE">Administrador</option>
              </select>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="success" type="submit" disabled={loading}>
              Guardar cambios
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default ModalUser;
