import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const BlogList = () => {
  function HienSPTrongMotTrang({ spTrongTrang }) {
    return (
      <table className="tab-content active">
        <thead>
          <tr>
            <th>ID</th>
            <th>Hình</th>
            <th>Tiêu đề</th>
            <th>Ngày viết</th>
            <th>Ngày cặp nhật</th>
            <th>Edit</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>HÌnh tao nè</td>
            <td>Toàn viết bài</td>
            <td>4/7/2024</td>
            <td>4/7/2024</td>
            <td>
              <Link>
                <span className="btn--show-modal">
                  <i className="fas fa-tools"></i>
                </span>
              </Link>
            </td>
            <td>
              <span className="delete-cate">
                <i className="fas fa-trash-alt"></i>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
  function PhanTrang({ pageSize }) {
    const [fromIndex, setfromIndex] = useState(0);
    const toIndex = fromIndex + pageSize;
    // const spTrong1Trang = filteredProducts.slice(fromIndex, toIndex);
    // const tongSoTrang = Math.ceil(filteredProducts.length / pageSize);
    const chuyenTrang = (event) => {
      const newIndex =
        // (event.selected * pageSize) % filteredProducts.length;
        setfromIndex(newIndex);
    };
    return (
      <>
        <HienSPTrongMotTrang spTrongTrang={`spTrong1Trang`} />
        <ReactPaginate
          nextLabel=">"
          previousLabel="<"
          // pageCount={tongSoTrang}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          onPageChange={chuyenTrang}
          renderOnZeroPageCount={null}
          className="thanhphantrang1"
          activeClassName="active"
        />
      </>
    );
  }
  return (
    <section className="content">
      <main>
        <div className="head-title">
          <div className="left">
            <h1>Bài viết</h1>
          </div>
        </div>
        <div className="table-data">
          <div className="order">
            <div className="head">
              <h3>Danh sách bài viết</h3>
            </div>
            <PhanTrang pageSize={16} />
          </div>
        </div>
      </main>
    </section>
  );
};

export default BlogList;
