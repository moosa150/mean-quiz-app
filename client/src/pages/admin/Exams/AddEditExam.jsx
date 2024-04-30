import { Col, Form, message, Row, Select, Table, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addExam,
  deleteQuestionById,
  editExamById,
  getExamById,
} from "../../../api/exam";
import PageTitle from "../../../components/PageTitle";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/loaderSlice";
import TabPane from "antd/lib/tabs/TabPane";
import QuestionModal from "./QuestionModal";
import axios from "axios";

const AddEditExam = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [examData, setExamData] = useState(null);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const getExamData = async () => {
    try {
      dispatch(showLoading());
      const response = await getExamById(params.id);
      dispatch(hideLoading());
      if (response.success) {
        setExamData(response.data);
      } else {
        message.error(response.error);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };
  useEffect(() => {
    if (params.id) getExamData();
  }, []);
  const onFinish = async (values) => {
    console.log(values);
    try {
      let response;
      dispatch(showLoading());
      if (params.id) {
        response = await editExamById(params.id, values);
      } else {
        response = await addExam(values);
      }
      dispatch(hideLoading());
      if (response.success) {
        message.success(response.message);
        sendEmailToUser(values.email);
        navigate("/admin/exams");
      } else {
        dispatch(hideLoading());
        message.error(response.error);
      }
    } catch (error) {}
  };
  const sendEmailToUser = async (userEmail) => {
    try {
      const emailData = {
        to: userEmail,
        subject: "Exam Created",
        text: "Your exam has been successfully created.",
      };

      const response = await axios.post(
        "/admin/exams/add", // Replace with your backend email API endpoint
        emailData
      );

      if (response.status === 200) {
        console.log("Email sent successfully!");
      } else {
        console.error("Failed to send email.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  const deleteQuestion = async (questionId) => {
    try {
      const resposne = await deleteQuestionById(questionId, {
        examId: params.id,
      });
      if (resposne.success) {
        message.success(resposne.message);
        window.location.reload(true);
      } else {
        message.error(resposne.error);
      }
    } catch (error) {}
  };
  const questionsColumns = [
    {
      title: "Question",
      dataIndex: "name",
    },
    {
      title: "Options",
      dataIndex: "options",
      render: (text, record) => {
        return Object.keys(record.options).map((key) => {
          return (
            <div>
              {key}:{record.options[key]}
            </div>
          );
        });
      },
    },
    {
      title: "Correct Option",
      dataIndex: "correctOption",
      render: (text, record) => {
        return `${record.correctOption}:${
          record.options[record.correctOption]
        }`;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-2">
          <span
            className="material-symbols-outlined"
            onClick={() => {
              setSelectedQuestion(record);
              setShowQuestionModal(true);
            }}
          >
            edit
          </span>
          <span
            className="material-symbols-outlined"
            onClick={() => {
              deleteQuestion(record._id);
            }}
          >
            delete
          </span>
        </div>
      ),
    },
  ];
  return (
    <div>
      {params.id ? (
        <PageTitle title="Edit Exam" />
      ) : (
        <PageTitle title="Add Exam" />
      )}
      {(examData || !params.id) && (
        <Form layout="vertical" onFinish={onFinish} initialValues={examData}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Exam Details" key="1">
              <Row gutter={[10, 10]}>
                <Col span={8}>
                  <Form.Item label="Exam Name" name="name">
                    <input type="text" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Exam Duration" name="duration">
                    <input type="number" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Category" name="category">
                    <select name="" id="">
                      <option value="">Select Category</option>
                      <option value="javascript">JavaScript(ES 6)</option>
                      <option value="node">Node</option>
                      <option value="react">React</option>
                      <option value="mongo">Mongo</option>
                    </select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Total Marks" name="totalMarks">
                    <input type="number" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Passing Marks" name="passingMarks">
                    <input type="number" />
                  </Form.Item>
                </Col>
              </Row>

              <div className="flex justify-end ">
                <button className="primary-contained-btn" type="submit">
                  Save
                </button>
              </div>
            </TabPane>
            {params.id && (
              <TabPane tab="Exam Questions" key="2">
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="primary-outlined-btn"
                    onClick={() => {
                      setShowQuestionModal(true);
                    }}
                  >
                    Add Question
                  </button>
                </div>
                <Table
                  columns={questionsColumns}
                  dataSource={examData?.questions}
                ></Table>
              </TabPane>
            )}
          </Tabs>
        </Form>
      )}
      {showQuestionModal && (
        <QuestionModal
          setShowQuestionModal={setShowQuestionModal}
          showQuestionModal={showQuestionModal}
          examId={params.id}
          refreshData={getExamData}
          selectedQuestion={selectedQuestion}
          setSelectedQuestion={setSelectedQuestion}
        />
      )}
    </div>
  );
};

export default AddEditExam;
