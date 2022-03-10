import * as ActionList from './ActionsList';
import API from 'config/config';
import jwtdecode from 'jwt-decode';
import { toast } from 'react-toastify';

const SUCCESS = (msg) => {
  return toast.success(msg, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
// const INFO = (msg) => {
//   return toast.info(msg, {
//     position: "top-right",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//   });
// };

const ERROR = (msg) => {
  return toast.error(msg, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const IS_LOGGED_IN = (payload) => ({
  type: ActionList.IS_LOGGED_IN,
});

export const IS_LOGGED_OUT = (payload) => ({
  type: ActionList.IS_LOGGED_OUT,
});

export const TOKEN = (payload) => ({
  type: ActionList.TOKEN,
  payload,
});

export const USER = (data) => {
  return async (dispatch) => {
    await window.localStorage.setItem('Token', data);
    API.defaults.headers.common['x-auth-token'] = data;
    dispatch(TOKEN(jwtdecode(data)));
    dispatch(IS_LOGGED_IN());
  };
};

export const USER_STATUS_IN = () => {
  return async (dispatch) => {
    const token = await window.localStorage.getItem('Token');
    if (token !== null) {
      dispatch(TOKEN(jwtdecode(token)));
      API.defaults.headers.common['x-auth-token'] = token;
      dispatch(IS_LOGGED_IN());
    }
  };
};

export const USER_STATUS_OUT = () => {
  return async (dispatch) => {
    await window.localStorage.removeItem('Token');
    dispatch(IS_LOGGED_OUT());
  };
};

export const LOGIN = (data, callback) => {
  return async (dispatch) => {
    await API.post('/auth/login', data)
      .then((res) => {
        SUCCESS('Login Successful!');
        console.log(res.data);
        dispatch(USER(res.data));
        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request);
        } else {
          ERROR(error.message);
        }
        callback();
      });
  };
};

export const GOOGLE_LOGIN = (data, callback) => {
  return async (dispatch) => {
    await API.post('/auth/api/login', data)
      .then((res) => {
        SUCCESS('Login Successful!');
        dispatch(USER(res.data));
        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request);
        } else {
          ERROR(error.message);
        }
        callback();
      });
  };
};

export const FACEBOOK_LOGIN = (data, callback) => {
  return async (dispatch) => {
    await API.post('/auth/api/login', data)
      .then((res) => {
        SUCCESS('Login Successful!');
        dispatch(USER(res.data));
        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request);
        } else {
          ERROR(error.message);
        }
        callback();
      });
  };
};

export const SIGN_UP = (data, callback) => {
  return async (dispatch) => {
    await API.post('/auth/signUp', data)
      .then((res) => {
        SUCCESS('Registration is Successful!');
        console.log(res.data);
        dispatch(USER(res.data));
        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request);
        } else {
          ERROR(error.message);
        }
        callback();
      });
  };
};

export const GOOGLE_API_SIGN_UP = (payload) => ({
  type: ActionList.API_SIGN_UP,
  payload,
});
export const FACEBOOK_API_SIGN_UP = (payload) => ({
  type: ActionList.FACEBOOK_API_SIGN_UP,
  payload,
});

export const PROFILE = (payload) => ({
  type: ActionList.USER_PROFILE,
  payload,
});

export const GET_PROFILE = (id, callback) => {
  return async (dispatch) => {
    await API.get('/user/' + id)
      .then((res) => {
        dispatch(PROFILE(res.data));
        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request);
        } else {
          ERROR(error.message);
        }
        callback();
      });
  };
};

export const UPDATE_PROFILE = (data, callback) => {
  return async (dispatch) => {
    await API.put('/user/', data)
      .then((res) => {
        dispatch(USER(res.data.token));
        SUCCESS(res.data.msg);
        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request);
        } else {
          ERROR(error.message);
        }
        callback();
      });
  };
};

export const UPDATE_PASSWORD = (data, callback) => {
  return async (dispatch) => {
    await API.put('/user/password', data)
      .then((res) => {
        SUCCESS(res.data);
        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request);
        } else {
          ERROR(error.message);
        }
        callback();
      });
  };
};

export const VENDOR_STATUS = (payload) => ({
  type: ActionList.VENDOR_APPLICATION_STATUS,
  payload,
});

export const GET_VENDOR_APPLICATION_STATUS = (id, callback) => {
  return async (dispatch) => {
    await API.get('/user/vendorApplicationStatus/' + id)
      .then((res) => {
        console.log(res.data);
        dispatch(VENDOR_STATUS(res.data.status));
        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request);
        } else {
          ERROR(error.message);
        }
        callback();
      });
  };
};

export const ADD_VENDOR = (data, callback) => {
  console.log('-------------------------', data);
  return async (dispatch) => {
    await API.post('/user/vendorApplication', data)
      .then((res) => {
        SUCCESS('Application is Registered for Approval!');
        console.log(res.data);
        dispatch(VENDOR_STATUS(res.data.status));
        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request);
        } else {
          ERROR(error.message);
        }
        callback();
      });
  };
};
