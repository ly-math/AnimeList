import React from "react";

function PrevNextButtons({ handleNext, handlePrev, currentPage, totalPage }) {
  return (
    <>
      <div className="btn-wrap">
        <button
          className="prev-btn"
          onClick={handlePrev}
          disabled={currentPage == 1}
        >
          {`<< Previous`}
        </button>
        <button
          className="next-btn"
          onClick={handleNext}
          disabled={currentPage == totalPage}
        >
          {`Next >>`}
        </button>
      </div>
    </>
  );
}

export default PrevNextButtons;
