import apiInstance from ".";

export const addExam = async (payload) => {
  try {
    const response = await apiInstance.post("/exams/add", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllExams = async () => {
  try {
    const response = await apiInstance.get("/exams/get-all-exams");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getExamById = async (id) => {
  try {
    const response = await apiInstance.get(`/exams/get-exam-by-id/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const editExamById = async (id, payload) => {
  try {
    const response = await apiInstance.post(`/exams/edit/${id}`, payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteExamById = async (id) => {
  try {
    const response = await apiInstance.delete(`/exams/delete/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const addQuestion = async (payload) => {
  try {
    const response = await apiInstance.post("/exams/add-question", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const editQuestionById = async (id, payload) => {
  try {
    const response = await apiInstance.post(
      `/exams/edit-question-in-exam/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteQuestionById = async (id, payload) => {
  try {
    const response = await apiInstance.post(
      `/exams/delete-question/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
