import React from "react";
import "./Navbar.css";
import { useSelector } from "react-redux";

const Navbar = () => {
    const user = useSelector((state) => state.auth.user);
    const daDangNhap = useSelector((state) => state.auth.daDangNhap);

    return (
        <div>
            <section className="content">
                <nav>
                    <i className="bx bx-menu"></i>

                    <form action="#">
                        <div className="form-input"></div>
                    </form>
                    <span href="#" className="notification">
                        <i className="bx bxs-bell"></i>
                        <span className="num">8</span>
                    </span>
                    {daDangNhap === true ? (
                        <span className="profile">{user.name}</span>
                    ) : (
                        <span className="profile">Login</span>
                    )}
                </nav>
            </section>
        </div>
    );
};

export default Navbar;
