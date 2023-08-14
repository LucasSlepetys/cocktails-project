import React from 'react';
import { Form, redirect, useNavigation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const newsletterUrl = 'https://www.course-api.com/cocktails-newsletter';

export const action = async ({ request }) => {
  try {
    //get all data from form
    //must have name=... on the inputs of the form
    const formData = await request.formData();
    //gets all entries from formData
    const data = Object.fromEntries(formData);

    //get response for post request to the server
    const response = await axios.post(newsletterUrl, data);
    toast.success(response.data.msg);

    //redirect is designed for the actions and loaders
    return redirect('/');
  } catch (error) {
    toast.error(
      error?.response?.data?.msg || 'Please try with different values'
    );
    return error;
  }
};

const Newsletter = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Form className='form' method='POST'>
      <h4 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        our newsletter
      </h4>
      {/* name */}
      <div className='form-row'>
        <label htmlFor='name' className='form-label'>
          name
        </label>
        <input
          type='text'
          className='form-input'
          name='name'
          id='name'
          required
        />
      </div>
      {/* lastName */}
      <div className='form-row'>
        <label htmlFor='lastName' className='form-label'>
          last name
        </label>
        <input
          type='text'
          className='form-input'
          name='lastName'
          id='lastName'
          required
        />
      </div>
      {/* email */}
      <div className='form-row'>
        <label htmlFor='email' className='form-label'>
          email
        </label>
        <input
          type='text'
          className='form-input'
          name='email'
          id='email'
          defaultValue='test@test.com'
          required
        />
      </div>
      <button
        type='submit'
        className='btn btn-block'
        disabled={isSubmitting}
        style={{ marginTop: '0.5rem' }}
      >
        {isSubmitting ? 'submitting' : 'submit'}
      </button>
    </Form>
  );
};

export default Newsletter;
