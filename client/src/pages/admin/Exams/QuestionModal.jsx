import { Form, message, Modal } from "antd";
import React from "react";
import {
  addQuestion,
  deleteQuestionById,
  editQuestionById,
} from "../../../api/exam";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/loaderSlice";

const QuestionModal = ({
  setShowQuestionModal,
  showQuestionModal,
  examId,
  refreshData,
  selectedQuestion,
  setSelectedQuestion,
}) => {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    console.log(values);
    try {
      const requiredPayload = {
        name: values.name,
        correctOption: values.correctOption,
        options: {
          A: values.A,
          B: values.B,
          C: values.C,
          D: values.D,
        },
        exam: examId,
      };
      dispatch(showLoading());
      let response;
      if (selectedQuestion) {
        response = await editQuestionById(selectedQuestion._id, {
          ...requiredPayload,
        });
      } else {
        response = await addQuestion(requiredPayload);
      }
      if (response.success) {
        dispatch(hideLoading());
        message.success(response.message);
        refreshData();
        setShowQuestionModal(false);
      } else {
        dispatch(hideLoading());
        message.error(response.error);
      }
      setSelectedQuestion(null);
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };
  return (
    <div>
      <Modal
        title={selectedQuestion ? "Edit Question" : "Add Question"}
        open={showQuestionModal}
        footer={false}
        onCancel={() => {
          setShowQuestionModal(false);
          setSelectedQuestion(null);
        }}
      >
        <Form
          onFinish={onFinish}
          layout={"vertical"}
          initialValues={{
            name: selectedQuestion?.name,
            A: selectedQuestion?.options?.A,
            B: selectedQuestion?.options?.B,
            C: selectedQuestion?.options?.C,
            D: selectedQuestion?.options?.D,
            correctOption: selectedQuestion?.correctOption,
          }}
        >
          <Form.Item name="name" label="Question">
            <input type="text" />
          </Form.Item>
          <Form.Item name="correctOption" label="Answer">
            <input type="text" />
          </Form.Item>
          <div className="flex gap-3">
            <Form.Item name="A" label="Option A">
              <input type="text" />
            </Form.Item>
            <Form.Item name="B" label="Option B">
              <input type="text" />
            </Form.Item>
          </div>
          <div className="flex gap-3">
            <Form.Item name="C" label="Option C">
              <input type="text" />
            </Form.Item>
            <Form.Item name="D" label="Option D">
              <input type="text" />
            </Form.Item>
          </div>
          <div className="flex justify-end">
            <button
              className="primary-outlined-btn"
              onClick={() => {
                setShowQuestionModal(false);
              }}
            >
              Cancel
            </button>
            <button className="primary-contained-btn">Save</button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default QuestionModal;
