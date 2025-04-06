import React, { useState } from "react";
import "./Value.css";
import grayscale from "./../assets/Claude_Monet_Sunrise_1872_grayscale.png";
import sunrise from "./../assets/Claude_Monet_Sunrise_1872.jpg";
import ValueTrainer from "./ValueTrainer.jsx";
function Value() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="value-trainer">
      <div className="explanation">
        {/* Collapsible logic */}
        <button
          className={`collapsible ${isOpen ? "active" : ""}`}
          onClick={toggleCollapse}
        >
          {isOpen ? "Hide explanation" : "See explanation"}
        </button>
        <div
          className="content"
          style={{
            maxHeight: isOpen ? "1200px" : "0",
            padding: isOpen ? "6px" : "0 16px",
          }}
        >
          {isOpen && (
            <div className="explanation-content">
              <p>
                This entire explanation comes from the context that the book
                (Livingstone, M. (2002). Vision and art: the biology of seeing.
                Harry N. Abrams.) provides, as well as my personal knowledge,
                drawing practice and computer science vision knowledge. For more
                detailed explanation of the subject check out the book.
                <br />
                <br /> Our vision it's a combination of a <b>WHERE</b> system,
                and a <b>WHAT</b> system. When processing images on our brain,
                the WHERE system is colorblind so it uses luminance evaluation
                to determine where does an object exist relative to us in the
                world, it's ultimate objective is not to identify objects, but
                their positions, whereas the WHAT system is not colorblind and
                it's main task is to identify in detail objects.
                <br /> However when working with these two systems into
                consideration, it's important to keep in mind that both are
                cummulae of neurons which share most of processing tasks, so
                each one fallsback on the other one in although on a more poorly
                way
              </p>
              <div
                className="comparison"
                style={{ display: "inline'block", width: "100%" }}
              >
                <img
                  src={sunrise}
                  alt="Claude_Monet_Sunrise_1872"
                  style={{ width: "50%" }}
                />

                <p>
                  When Claude Monet exhibited <i>Impression: Sunrise(1872)</i>
                  it caused furor. Parisan art critic Louis Leroy said the
                  painting was "at once vague and brutal" and reviled it as
                  being "worse than anyone hast hitherto dared to paint." Such
                  reaction nowithstanding, history has acknowledged this work:
                  From it's title comes the name for the art movement
                  Impressionism.
                </p>
                <img
                  src={grayscale}
                  alt="Claude_Monet_Sunrise_1872 on grayscale"
                  style={{ width: "50%" }}
                />
                <p>
                  Look at the difference between the first and the second image
                  whilst on the first one the sun looks vibrant, different the
                  grayscale one reveals that the sun it's not different on value
                  to the clouds and the sky. The vibrant sun only exists to the
                  <b>WHAT</b> system, history wise there's been lot's of artist
                  that discovered that you can trick the brain creating
                  information that exists on the <b>WHAT</b> system that is not
                  on the <b>WHERE</b> system. The purpose of the next trainer is
                  to get you the ability to evaluate value from color, so you
                  cna make your own tricks to the mind and express them for your
                  art
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="app">
          <ValueTrainer />
        </div>
      </div>
    </div>
  );
}

export default Value;
