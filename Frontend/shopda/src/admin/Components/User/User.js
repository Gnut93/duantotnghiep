import React, { useEffect, useState } from 'react';

const User = () => {
  const [listUser, setListUser] = useState([]);
  useEffect(() => {
    fetch('http://localhost:4000/users/list')
      .then((res) => res.json())
      .then(setListUser);
  }, []);
  console.log(listUser);
  return (
    <section className="content">
      <main>
        <div className="head-title">
          <div className="left">
            <h1>Người dùng</h1>
          </div>
        </div>
        <div className="table-data">
          <div className="order">
            <div className="head">
              <h3>Thành Viên</h3>
              <i className="bx bx-search"></i>
              <i className="bx bx-filter"></i>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Tên</th>
                  <th>Sđt</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Phân quyền</th>
                  <th>Xóa</th>
                </tr>
              </thead>
              <tbody>
                {listUser.map((user, i) => (
                  <tr key={i}>
                    <td>
                      <p>{user.name}</p>
                    </td>
                    <td>
                      <p>{user.phone}</p>
                    </td>
                    <td>
                      <p>{user.email}</p>
                    </td>
                    <td>
                      <p>{parseInt(user.role) === 1 ? "Quản trị viên" : "Người dùng"}</p>
                    </td>
                    <td>
                      <span className="btn--show-modal">
                        <i className="fas fa-tools"></i>
                      </span>
                    </td>
                    <td>
                      <span className="edit delete-living">
                        <i className="fas fa-trash-alt"></i>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </section>
  );
};

export default User;
