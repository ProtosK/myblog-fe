import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";
import ModalConfirm from "./ModalConfirm";
import _, { debounce } from "lodash"; // lam viec voi mang
import "./TableUser.scss";
import { CSVLink, CSVDownload } from "react-csv";

const TableUsers = (props) => {
  // state data
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [dataUserEdit, setDataUserEdit] = useState({});
  const [dataUserDelete, setDataUserDelete] = useState({});
  // state show model
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  // state sort, search, filter...
  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");
  const [keyword, setKeyword] = useState("");

  // initialization value when app load and get users from service
  useEffect(() => {
    getUsers(1);
  }, []);

  const getUsers = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {
      setTotalUsers(res.total);
      setListUsers(res.data);
      setTotalPages(res.total_pages);
    }
  };

  // handle table
  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalEditUser(false);
    setIsShowModalDelete(false);
  };
  // handle click page (selected is event library return):
  const handlePageClick = (event) => {
    // convert selected to number
    getUsers(+event.selected + 1);
  };

  // ADD USER AND SET LIST
  const handleUpdateTable = (user) => {
    setListUsers([user, ...listUsers]);
  };

  // EDIT AND SET LIST
  const handleEditUser = (item) => {
    setDataUserEdit(item);
    setIsShowModalEditUser(true);
  };
  const handleEditUserFromModal = (user) => {
    console.log(">>> data from modal update: ", user);
    let cloneListUsers = _.cloneDeep(listUsers);
    let index = listUsers.findIndex((item) => item.id === user.id);
    // custom update data
    cloneListUsers[index].email = user.email;
    cloneListUsers[index].first_name = user.first_name;
    cloneListUsers[index].job = user.job;
    cloneListUsers[index].birthday = user.birthday;
    cloneListUsers[index].address = user.address;
    setListUsers(cloneListUsers);
  };

  // DELETE AND SET LIST
  const handleDeleteUser = (item) => {
    setDataUserDelete(item);
    setIsShowModalDelete(true);
  };
  const handleDeleteUserFromModal = (user) => {
    console.log(">>> data from modal delete: ", user);
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = cloneListUsers.filter((item) => item.id !== user.id);

    setListUsers(cloneListUsers);
  };

  // SORT, SEARCH, FILTER
  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);

    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
    setListUsers(cloneListUsers);
  };

  const handleSearch = debounce((e) => {
    let term = e.target.value;
    if (term) {
      let cloneListUsers = _.cloneDeep(listUsers);
      cloneListUsers = cloneListUsers.filter((item) =>
        item.email.includes(term)
      );
      setListUsers(cloneListUsers);
    } else {
      getUsers(1);
    }
  }, 500);
  // ========== LAYOUT ==========

  const csvData = [
    ["firstname", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"],
  ];
  return (
    <>
      <div className="my-3 add-new">
        <span>
          <b>List Users:</b>
        </span>
        <div className="group-btns">
          <label htmlFor="test" className="btn btn-warning">
            <i className="fa-solid fa-file-import"></i> Import
          </label>
          <input id="test" type="file" hidden />
          <CSVLink
            filename={"my-file.csv"}
            className="btn btn-primary"
            target="_blank"
            data={csvData}
          >
            <i className="fa-solid fa-file-arrow-down"></i> Export
          </CSVLink>

          <button
            className="btn btn-success"
            onClick={() => setIsShowModalAddNew(true)}
          >
            <i className="fa-solid fa-circle-plus"></i> Add new
          </button>
        </div>
      </div>
      <div className="col-4 my-3">
        <input
          className="form-control"
          placeholder="Search user by email..."
          // value={keyword}
          onChange={(e) => handleSearch(e)}
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <div className="sort-header">
                <span>ID</span>
                <span>
                  <i
                    className="fa-solid fa-arrow-down-long"
                    onClick={() => handleSort("desc", "id")}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-up-long"
                    onClick={() => handleSort("asc", "id")}
                  ></i>
                </span>
              </div>
            </th>
            <th>Identifier</th>
            <th>
              <div className="sort-header">
                <span>FullName</span>
                <span>
                  <i
                    className="fa-solid fa-arrow-down-long"
                    onClick={() => handleSort("desc", "first_name")}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-up-long"
                    onClick={() => handleSort("asc", "first_name")}
                  ></i>
                </span>
              </div>
            </th>
            <th>Job</th>
            <th>Birthday</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`users-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{`${item.first_name} ${item.last_name}`}</td>
                  <td>{item.job || "build be"}</td>
                  <td>{item.birthday || "build be"}</td>
                  <td>{item.address || "build be"}</td>
                  <td>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => handleEditUser(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteUser(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
      <ModalAddNew
        // send props father(TableUsers component) to child(ModalAddNew component)
        show={isShowModalAddNew}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      />
      <ModalEditUser
        // send props father(TableUsers component) to child(ModalEditUser component)
        show={isShowModalEditUser}
        dataUserEdit={dataUserEdit}
        handleClose={handleClose}
        handleEditUserFromModal={handleEditUserFromModal}
      />
      <ModalConfirm
        show={isShowModalDelete}
        handleClose={handleClose}
        dataUserDelete={dataUserDelete}
        handleDeleteUserFromModal={handleDeleteUserFromModal}
      />
    </>
  );
};

export default TableUsers;
