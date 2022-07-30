import React from 'react';
import { useFormik } from 'formik';

import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { useApplyFotForgetPass } from 'hooks';
function ForgotPassword() {
  let navigate = useNavigate();

  const { mutateAsync: applyFotForgetPass, isLoading } =
    useApplyFotForgetPass();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid email address').required('required'),
    }),
    onSubmit: async (values) => {
      const response = await applyFotForgetPass(values);

      if (response.status) {
        navigate('/');
      }
    },
  });
  return (
    <div>
      <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
        <div className='flex content-center items-center justify-center h-full'>
          <div className='w-full lg:w-4/12 px-4'>
            <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0'>
              <div className='rounded-t mb-0 px-6 py-6'>
                <div className='text-center mb-3'>
                  <h6 className='text-blueGray-500 text-sm font-bold'>
                    Forgot Passwort
                  </h6>
                </div>

                <hr className='mt-6 border-b-1 border-blueGray-300' />
              </div>
              <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
                <form onSubmit={formik.handleSubmit}>
                  <div className='relative w-full mb-3'>
                    <label
                      className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                      htmlFor='grid-password'
                    >
                      Email
                    </label>
                    <input
                      id='email'
                      name='email'
                      type='email'
                      className='input-styl'
                      placeholder='Email'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className='text-red-500 text-xs'>
                        {formik.errors.email}
                      </div>
                    ) : null}
                  </div>

                  <div className='text-center mt-6'>
                    {isLoading === true ? (
                      <div />
                    ) : (
                      <button className='btn-styl' type='submit'>
                        Send
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
            <div className='flex flex-wrap mt-6 relative'>
              {/* <div className='w-1/2'>
                <a
                  href='#pablo'
                  onClick={(e) => e.preventDefault()}
                  className='text-black'
                >
                  <small>Forgot password?</small>
                </a>
              </div> */}
              <div className='w-1/2 text-right'>
                <a href='/signup' className='text-black'>
                  <small>Signup</small>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
