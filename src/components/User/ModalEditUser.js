import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { updateUser } from "../../services/UserService";

const ModalEditUser = (props) => {
  const { show, handleClose, dataUserEdit, handleEditUserFromModal } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleEditUser = async () => {
    console.log(dataUserEdit);
    let res = await updateUser(name, job, dataUserEdit.id);
    if (res && res.updatedAt) {
      // custom data response for TableUsers AND SET LIST TABLE
      handleEditUserFromModal({
        first_name: name,
        id: dataUserEdit.id,
        job: job,
        email: identifier,
        birthday: birthday,
        address: address,
      });
      handleClose();
      toast.success("Updated user succeed!");
    }
  };

  useEffect(() => {
    if (show) {
      setName(`${dataUserEdit.first_name} ${dataUserEdit.last_name}`);
      setJob(dataUserEdit.job || "build backend");
      setIdentifier(dataUserEdit.email);
      setAddress(dataUserEdit.address || "build backend");
    }
  }, [dataUserEdit]);

  console.log(">>>> check props: ", dataUserEdit);
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit a user</Modal.Title>
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
          <Button variant="primary" onClick={() => handleEditUser()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditUser;
