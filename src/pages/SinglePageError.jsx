import React from 'react';
import { useRouteError } from 'react-router-dom';

const SinglePageError = () => {
  const error = useRouteError();
  console.log(error);

  return <div>Oopps... Something went wrong! {error.message}</div>;
};

export default SinglePageError;
