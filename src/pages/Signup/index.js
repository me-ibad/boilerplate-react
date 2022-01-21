import React from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { userSignup } from 'store/actions/userAction/userActions';

function Signup() {
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      pass: '',
      email: '',
      role: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .min(3, 'Must be more than 4 characters')
        .required('Required'),
      pass: Yup.string()
        .min(8, 'Must be more than 8 characters')
        .required('Required'),
      role: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      // toast('');
      if (values.role === 'admin') {
        toast('admin');
        navigate('/admin/adduser');
      } else if (values.role === 'boot') {
        toast('home');
        navigate('/home');
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
                    Signup
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
                      <div className='text-red-500 text-sm'>
                        {formik.errors.email}
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
                  <div className='relative w-full mb-3'>
                    <label
                      className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                      htmlFor='grid-password'
                    >
                      Roles
                    </label>
                    <select
                      name='role'
                      id='role'
                      className='input-styl'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.role}
                    >
                      <option value='' disabled selected>
                        select role
                      </option>
                      <option value='admin'>Admin</option>
                      <option value='boot'>Boot</option>
                    </select>

                    {formik.touched.role && formik.errors.role ? (
                      <div className='text-red-500 text-sm'>
                        {formik.errors.role}
                      </div>
                    ) : null}
                  </div>

                  <div className='text-center mt-6'>
                    <button className='btn-styl' type='submit'>
                      Sign In
                    </button>
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

export default Signup;
