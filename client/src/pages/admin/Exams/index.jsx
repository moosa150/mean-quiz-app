import React, { useEffect, useState } from "react";
import PageTitle from "../../../components/PageTitle";
import { useNavigate } from "react-router-dom";
import { message, Table } from "antd";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/loaderSlice";
import { deleteExamById, getAllExams } from "../../../api/exam";

const Exams = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const dispatch = useDispatch();
  const columns = [
    {
      title: "Exam Name",
      dataIndex: "name",
    },
    {
      title: "Duration",
      dataIndex: "duration",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Total Marks",
      dataIndex: "totalMarks",
    },
    {
      title: "Passing Marks",
      dataIndex: "passingMarks",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-2">
          <span
            className="material-symbols-outlined"
            onClick={() => {
              navigate(`/admin/exams/edit/${record._id}`);
            }}
          >
            edit
          </span>
          <span
            className="material-symbols-outlined"
            onClick={() => {
              deleteExam(record._id);
            }}
          >
            delete
          </span>
        </div>
      ),
    },
  ];
  const deleteExam = async (id) => {
    try {
      dispatch(showLoading());
      const response = await deleteExamById(id);
      window.location.reload(true);
      dispatch(hideLoading());
      if (response.success) {
        message.success(response.message);
      } else {
        message.error(response.error);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  const getExamsData = async () => {
    try {
      dispatch(showLoading());
      const response = await getAllExams();
      dispatch(hideLoading());
      if (response.success) {
        setExams(response.data);
        message.success(response.message);
      } else {
        message.error(response.error);
      }
    } catch (error) {
      dispatch(hideLoading);
      message.error(error.message);
    }
  };
  useEffect(() => {
    getExamsData();
  }, []);
  return (
    <div>
      <div className="flex justify-between mt-2 items-end">
        <PageTitle title="Exams" />

        <button
          className="primary-outlined-btn flex items-center"
          onClick={() => navigate("/admin/exams/add")}
        >
          <i className="ri-add-line"></i>
          Add Exam
        </button>
      </div>
      <Table columns={columns} dataSource={exams} />
    </div>
  );
};

export default Exams;
