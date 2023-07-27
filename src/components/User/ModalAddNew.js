import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { postCreateUser } from "../../services/UserService";
import { toast } from "react-toastify";

const ModalAddNew = (props) => {
  const { show, handleClose, handleUpdateTable } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSaveUser = async () => {
    let res = await postCreateUser(name, job);
    console.log(">>> check data when click save user", res);
    if (res && res.id) {
      // success
      handleClose();
      setName("");
      setJob("");
      setIdentifier("");
      setAddress("");
      toast.success("A user is created success!");
      // custom user data this here AND SET LIST TABLE
      handleUpdateTable({
        id: res.id,
        first_name: name,
        last_name: "",
        job: job,
        email: identifier,
        birthday: birthday,
        address: address,
      });
    } else {
      // error
      toast.error("An error...");
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Birthday</label>
              <input
                type="text"
                className="form-control"
                value={birthday}
                onChange={(event) => setBirthday(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Job</label>
              <input
                type="text"
                className="form-control"
                value={job}
                onChange={(event) => setJob(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">identifier</label>
              <input
                type="text"
                className="form-control"
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSaveUser()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddNew;
