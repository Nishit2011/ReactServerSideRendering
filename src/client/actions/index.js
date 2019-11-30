export const FETCH_USERS = "fetch_users";
export const fetchUsers = () => async (dispatch, getState, axiosInstance) => {
  const res = await axiosInstance.get("/users");

  dispatch({
    type: FETCH_USERS,
    payload: res
  });
};
