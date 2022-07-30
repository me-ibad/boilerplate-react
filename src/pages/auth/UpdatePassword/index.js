import React from 'react';
import { useFormik } from 'formik';

import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { useParams } from 'react-router-dom';

import { useUpdatePass } from 'hooks';

function UpdatePassword() {
  let navigate = useNavigate();

  const { mutateAsync: updatepassword, isLoading } = useUpdatePass();

  const params = useParams();

  const formik = useFormik({
    initialValues: {
      pass: '',
      cpass: '',
    },
    validationSchema: Yup.object().shape({
      pass: Yup.string()
        .min(8, 'must be 8 digit')
        .required('Required')
        .matches(
          /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
          'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
        ),
      cpass: Yup.string().oneOf(
        [Yup.ref('pass'), null],
        'Passwords must match'
      ),
    }),
    onSubmit: async (values) => {
      values.email = decodeURIComponent(params.email);
      values.uniqueId = params.id;

      const response = await updatepassword(values);

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
                    Update Password
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
                      Passwort
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
                      <div className='text-red-500 text-xs'>
                        {formik.errors.pass}
                      </div>
                    ) : null}
                  </div>

                  <div className='relative w-full mb-3'>
                    <label
                      className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                      htmlFor='grid-password'
                    >
                      Confirm Passwort
                    </label>
                    <input
                      name='cpass'
                      id='cpass'
                      type='password'
                      className='input-styl'
                      placeholder='Confirm Passwort'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.cpass}
                    />
                    {formik.touched.cpass && formik.errors.cpass ? (
                      <div className='text-red-500 text-xs'>
                        {formik.errors.cpass}
                      </div>
                    ) : null}
                  </div>

                  <div className='text-center mt-6'>
                    {isLoading === true ? (
                      <div />
                    ) : (
                      <button className='btn-styl' type='submit'>
                        Update
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
            <div className='flex flex-wrap mt-6 relative'>
              <div className='w-1/2'>
                <a href='/' className='text-black'>
                  Signin
                </a>
              </div>
              {/* <div className='w-1/2 text-right'>
                    <Link to='/auth/register' className='text-black'>
                      <small>Create new account</small>
                    </Link>
                  </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdatePassword;
