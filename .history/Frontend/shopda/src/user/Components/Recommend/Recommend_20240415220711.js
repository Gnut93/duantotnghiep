import React, { useEffect } from "react";
import "./Recommend.css";
import user1 from "../../../assets/images/user1.jpg";
import user2 from "../../../assets/images/user2.jpg";
import user3 from "../../../assets/images/user3.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
const Recommend = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
    AOS.refresh();
  }, []);

  return (
    <>
      <h3
        className="related-heading" data=
        style={{ marginBottom: "30px", marginTop: "70px" }}
      >
        Khách Hàng Nói Gì Về Chúng Tôi?
      </h3>
      <div className="testimonial" data-aos="fade-up">
        <div className="small-container">
          <div className="row">
            <div className="col-3">
              <i className="ri-chat-quote-fill"></i>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
                modi rerum nam esse ipsam illum incidunt, optio provident dicta
                iusto laboriosam eos maiores enim sit corrupti ipsa omnis
                officiis quo!
              </p>
              <img src={user1} alt="User 1" />
              <h3>Andree right hand</h3>
            </div>
            <div className="col-3">
              <i className="ri-chat-quote-fill"></i>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
                modi rerum nam esse ipsam illum incidunt, optio provident dicta
                iusto laboriosam eos maiores enim sit corrupti ipsa omnis
                officiis quo!
              </p>
              <img src={user2} alt="User 2" />
              <h3>C. Ronaldo</h3>
            </div>
            <div className="col-3">
              <i className="ri-chat-quote-fill"></i>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
                modi rerum nam esse ipsam illum incidunt, optio provident dicta
                iusto laboriosam eos maiores enim sit corrupti ipsa omnis
                officiis quo!
              </p>
              <img src={user3} alt="User 3" />
              <h3>Lionel Messi</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recommend;
