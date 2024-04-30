import apiInstance from ".";

export const addReport = async (payload) => {
  try {
    const response = await apiInstance.post("/reports/add-report", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllReports = async () => {
  try {
    const response = await apiInstance.post("/reports/get-all-reports");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllReportsByUser = async () => {
  try {
    const response = await apiInstance.post("/reports/get-all-reports-by-user");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
