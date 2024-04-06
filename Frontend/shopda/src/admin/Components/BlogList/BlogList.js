import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BlogList = () => {
    const [listPost, setListPost] = useState([]);
    useEffect(() => {
        fetch("http://localhost:4000/post/list")
            .then((res) => res.json())
            .then(setListPost);
    }, []);

    const xoaPost = (id) => {
        if (window.confirm("Xóa Bài Viết không?")) {
            fetch(`http://localhost:4000/post/delete/${id}`, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then(() => {
                    alert("Đã xóa Bài Viết thành công");
                    fetch("http://localhost:4000/post/list")
                        .then((res) => res.json())
                        .then((data) => setListPost(data))
                        .catch((error) =>
                            console.error(
                                "Lỗi cập nhật danh sách bài viết:",
                                error
                            )
                        );
                })
                .catch((error) => console.error("Lỗi xóa bài viết:", error));
        }
    };
    return (
        <section className="content">
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Bài Viết</h1>
                    </div>
                </div>
                <div className="table-data">
                    <div className="order">
                        <div className="head">
                            <h3>Bài Viết Mới</h3>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Tiêu Đề</th>
                                    <th>Hình Ảnh</th>
                                    <th>Ngày Viết</th>
                                    <th>Ngày Cập Nhật</th>
                                    <th>Sửa Bài Viết</th>
                                    <th>Xóa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listPost.map((post, i) => (
                                    <tr key={i}>
                                        <td>
                                            <p>{post.heading}</p>
                                        </td>
                                        <td>
                                            <img src={post.image} alt="#" />
                                        </td>
                                        <td>
                                            <p>
                                                {new Date(
                                                    post.created_date
                                                ).toLocaleDateString("vi")}
                                            </p>
                                        </td>
                                        <td>
                                            <p>
                                                {new Date(
                                                    post.update_date
                                                ).toLocaleDateString("vi")}
                                            </p>
                                        </td>
                                        <td>
                                            <Link
                                                to={`/admin/EditBaiViet/${post.id_post}`}
                                            >
                                                <span className="btn--show-modal">
                                                    <i className="fas fa-tools"></i>
                                                </span>
                                            </Link>
                                        </td>
                                        <td>
                                            <span
                                                class="delete-cate"
                                                onClick={() =>
                                                    xoaPost(post.id_post)
                                                }
                                            >
                                                <i class="fas fa-trash-alt"></i>
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

export default BlogList;
