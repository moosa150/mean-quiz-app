import { message, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../../redux/loaderSlice";
import moment from "moment";
import { getAllReports } from "../../../../api/reports";
import PageTitle from "../../../../components/PageTitle";

const AdminReports = () => {
  const [reportsData, setReportsData] = useState([]);
  const dispatch = useDispatch();
  const columns = [
    {
      title: "Exam Name",
      dataIndex: "examName",
      render: (text, record) => <>{record.exam.name}</>,
    },
    {
      title: "User Name",
      dataIndex: "userName",
      render: (text, record) => <>{record.user.name}</>,
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => (
        <>{moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss")}</>
      ),
    },
    {
      title: "Total Marks",
      dataIndex: "totalQuestions",
      render: (text, record) => <>{record.exam.totalMarks}</>,
    },
    {
      title: "Passing Marks",
      dataIndex: "correctAnswers",
      render: (text, record) => <>{record.exam.passingMarks}</>,
    },
    {
      title: "Obtained Marks",
      dataIndex: "correctAnswers",
      render: (text, record) => <>{record.result.correctAnswers.length}</>,
    },
    {
      title: "Verdict",
      dataIndex: "verdict",
      render: (text, record) => <>{record.result.verdict}</>,
    },
  ];
  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await getAllReports();
      if (response.success) {
        setReportsData(response.data);
        console.log(reportsData);
      } else {
        message.error(response.error);
      }
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      return message.error(error.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <PageTitle title="Reports" />
      <Table columns={columns} dataSource={reportsData} />
    </div>
  );
};

export default AdminReports;
