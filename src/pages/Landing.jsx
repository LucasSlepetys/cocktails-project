import axios from 'axios';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CocktailList from '../components/CocktailList';

const cocktailSearchUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

//exports function to Router so it can call it before Landing is loaded in browser
export const loader = async () => {
  const searchTerm = '';
  const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);

  return { drinks: response.data.drinks, searchTerm };
};

const Landing = () => {
  const { drinks } = useLoaderData();

  return (
    <>
      <CocktailList drinks={drinks}></CocktailList>
    </>
  );
};

export default Landing;
