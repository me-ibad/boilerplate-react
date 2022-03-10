import React from 'react';
import { useFormik } from 'formik';

import { useNavigate, Link } from 'react-router-dom';

import * as Yup from 'yup';
import { useLoginEmailAccount } from 'hooks';

function Signin() {
  let navigate = useNavigate();
  const { mutateAsync: loginEmailAccount, isLoading } = useLoginEmailAccount();

  const formik = useFormik({
    initialValues: {
      pass: '',
      username: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .min(3, 'Must be more than 4 characters')
        .required('Required'),
      pass: Yup.string()
        .min(8, 'Must be more than 8 characters')
        .required('Required')
        .matches(
          /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
          'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
        ),
    }),
    onSubmit: async (values) => {
      // eslint-disable-next-line
      const response = await loginEmailAccount(values);
      navigate('/');
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
                    Sign in
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
                      Email/UserName
                    </label>
                    <input
                      id='username'
                      name='username'
                      type='text'
                      className='input-styl'
                      placeholder='Email/UserName'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                    />
                    {formik.touched.email && formik.errors.username ? (
                      <div className='text-red-500 text-sm'>
                        {formik.errors.username}
                      </div>
                    ) : null}
                  </div>

                  <div className='relative w-full mb-3'>
                    <label
                      className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                      htmlFor='grid-password'
                    >
                      Password
                    </label>
                    <input
                      name='pass'
                      id='pass'
                      type='password'
                      className='input-styl'
                      placeholder='Password'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.pass}
                    />
                    {formik.touched.pass && formik.errors.pass ? (
                      <div className='text-red-500 text-sm'>
                        {formik.errors.pass}
                      </div>
                    ) : null}
                  </div>

                  <div className='text-center mt-6'>
                    {isLoading ? (
                      <div />
                    ) : (
                      <>
                        <button className='btn-styl' type='submit'>
                          Sign In
                        </button>
                      </>
                    )}
                  </div>
                </form>
              </div>
            </div>
            <div className='flex flex-wrap mt-6 relative'>
              <div className='w-1/2'>
                <a
                  href='#pablo'
                  onClick={(e) => e.preventDefault()}
                  className='text-black'
                >
                  <small>Forgot password?</small>
                </a>
              </div>
              <div className='w-1/2 text-right'>
                <Link to='/signup' className='text-black'>
                  <small>Create new account</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
