import axios from 'axios'

export const postMockApi = async (values) => {
  const apiResponse = await axios.post('/route', values)
    .then((response) => response)
    .catch((error) => error.response);

  return apiResponse;
}

export const getMockApi = async (token) => {
  const apiResponse = await axios.get('/route/' + token)
    .then((response) => response)
    .catch((error) => error.response);

  return apiResponse;
}

export const getMockSuccess = async (token) => {
  const apiResponse = await axios.get('/mock/route/success')
    .then((response) => response)
    .catch((error) => error.response);

  return apiResponse;
}


export const getMockInProgress = async (token) => {
  let apiResponse = []
  await axios.get('/mock/route/inprogress')
    .then((response) => {
      apiResponse = response
    })
    .catch((error) => error.response);

  return apiResponse;
}


export const getMockFailure = async (token) => {
  let apiResponse = []
  await axios.get('/mock/route/failure')
    .then((response) => {
      apiResponse = response
    })
    .catch((error) => error.response);

  return apiResponse;
}

