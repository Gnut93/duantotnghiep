import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <section className="content">
      <main>
        <div className="head-title">
          <div className="left">
            <h1>Tổng quan</h1>
          </div>
          <div className="dropdown">
            <div className="dropdown__select">
              <span className="dropdown__selected">Date</span>
              <i className="fa fa-caret-down dropdown__caret"></i>
            </div>
            <ul className="dropdown__list">
              <a
                href="/"
                className="dropdown__item dropdown__text">
                Item1
              </a>
              <a
                href="/"
                className="dropdown__item dropdown__text">
                Item2
              </a>
              <a
                href="/"
                className="dropdown__item dropdown__text">
                Item3
              </a>
              <a
                href="/"
                className="dropdown__item dropdown__text">
                Item4
              </a>
              <a
                href="/"
                className="dropdown__item dropdown__text">
                Item5
              </a>
              <a
                href="/"
                className="dropdown__item dropdown__text">
                Item6
              </a>
            </ul>
          </div>
        </div>
        <ul className="box-info">
          <li>
            <i className="bx bxs-calendar-check"></i>
            <span className="text">
              <h3>0</h3>
              <p>Đơn hàng</p>
            </span>
          </li>
          <li>
            <i className="bx bxs-group"></i>
            <span className="text">
              <h3>0</h3>
              <p>Người dùng</p>
            </span>
          </li>
          <li>
            <i className="bx bxs-dollar-circle"></i>
            <span className="text">
              <h3>0</h3>
              <p>Doanh thu</p>
            </span>
          </li>
        </ul>
        <div className="table-data">
          <div className="order">
            <div className="head">
              <h3>Những Đơn Đặt Hàng Gần Đây</h3>
              <i className="bx bx-search"></i>
              <i className="bx bx-filter"></i>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Người Dùng</th>
                  <th>Ngày Đặt</th>
                  <th>Trạng Thái</th>
                  <th>Tổng tiền</th>
                  <th>Thanh toán</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p>Name1</p>
                  </td>
                  <td>12/05/2023</td>
                  <td>
                    <span className="status waiting">Chờ</span>
                  </td>
                  <td>
                    <span>
                      {(10000).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </span>
                  </td>
                  <td>
                    <span className="status waiting">Khi nhận hàng</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Name2</p>
                  </td>
                  <td>12/05/2023</td>
                  <td>
                    <span className="status success">Hoàn Thành</span>
                  </td>
                  <td>
                    <span>
                      {(10000).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </span>
                  </td>
                  <td>
                    <span className="status waiting">Khi nhận hàng</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Name3</p>
                  </td>
                  <td>12/05/2023</td>
                  <td>
                    <span className="status preparing">Chuẩn Bị</span>
                  </td>
                  <td>
                    <span>
                      {(10000).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </span>
                  </td>
                  <td>
                    <span className="status waiting">Khi nhận hàng</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Name4</p>
                  </td>
                  <td>12/05/2023</td>
                  <td>
                    <span className="status delivering">Đang giao</span>
                  </td>
                  <td>
                    <span>
                      {(10000).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </span>
                  </td>
                  <td>
                    <span className="status waiting">Khi nhận hàng</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Name5</p>
                  </td>
                  <td>12/05/2023</td>
                  <td>
                    <span className="status cancelled">Đã Hủy</span>
                  </td>
                  <td>
                    <span>
                      {(10000).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </span>
                  </td>
                  <td>
                    <span className="status waiting">Khi nhận hàng</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="table-data">
          <div className="order">
            <div className="head">
              <h3>Những Mặt Hàng Đã Và Sắp Hết</h3>
              <i className="bx bx-search"></i>
              <i className="bx bx-filter"></i>
            </div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên Hàng</th>
                  <th>Hình Ảnh</th>
                  <th>Số Lượng</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p>1</p>
                  </td>
                  <td>
                    <p>Mặt hàng 1</p>
                  </td>
                  <td>
                    <img
                      src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""></img>
                  </td>
                  <td>
                    <p>0</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>2</p>
                  </td>
                  <td>
                    <p>Mặt hàng 2</p>
                  </td>
                  <td>
                    <img
                      src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""></img>
                  </td>
                  <td>
                    <p>2</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>3</p>
                  </td>
                  <td>
                    <p>Mặt hàng 3</p>
                  </td>
                  <td>
                    <img
                      src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""></img>
                  </td>
                  <td>
                    <p>3</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>4</p>
                  </td>
                  <td>
                    <p>Mặt hàng 4</p>
                  </td>
                  <td>
                    <img
                      src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""></img>
                  </td>
                  <td>
                    <p>1</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Home;
