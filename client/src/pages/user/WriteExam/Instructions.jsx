import React from "react";

const Instructions = ({ examsData, setView, startTimer }) => {
  return (
    <div className="flex flex-col items-center">
      <ul className="flex flex-col gap-1">
        <h1 className="text-2xl  text-center">Instructions</h1>
        <li>Exam must be completed in {examsData?.duration} seconds</li>
        <li>Donot refresh your page</li>
        <li>Once submitted you cannot change your answers</li>
        <li>Total marks of exam is {examsData?.totalMarks}</li>
        <li>Passing marks of exam is {examsData?.passingMarks}</li>
      </ul>
      <button
        className="primary-outlined-btn"
        onClick={() => {
          startTimer();
          setView("questions");
        }}
      >
        Start Exam
      </button>
    </div>
  );
};

export default Instructions;
