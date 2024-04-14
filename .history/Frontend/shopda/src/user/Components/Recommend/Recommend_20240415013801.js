import React from "react";
import "./Recommend.css";
import user1 from "../../../assets/images/";

const Recommend = () => {
  return (
    <>
      <div className="testimonial">
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
              <img src="images/user1.jpg" alt="User 1" />
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
              <img src="images/user2.jpg" alt="User 2" />
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
              <img src="images/user3.jpg" alt="User 3" />
              <h3>Lionel Messi</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recommend;
