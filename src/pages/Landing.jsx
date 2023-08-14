import axios from 'axios';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CocktailList from '../components/CocktailList';
import SearchForm from '../components/SearchForm';
import { useQuery } from '@tanstack/react-query';

const cocktailSearchUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const searchCocktailsQuery = (searchTerm) => {
  return {
    queryKey: ['search', searchTerm || 'all'],
    queryFn: async () => {
      const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
      return response.data.drinks;
    },
  };
};

//exports function to Router so it can call it before Landing is loaded in browser
//loader is now a function that returns another function (since it is being involked in app)
export const loader =
  (queryClient) =>
  async ({ request }) => {
    console.log(request.url);
    //creates new url instance, which contains function to get searchParams
    const url = new URL(request.url);

    //search term is value whos key is search or if null is ''
    const searchTerm = url.searchParams.get('search') || '';

    //ensureQueryData checks if the data is in the cache
    //if data is there we use it, if not we fetch it
    await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm));

    return { searchTerm };
  };

const Landing = () => {
  const { searchTerm } = useLoaderData();
  //gets the data that matches the search term
  //data has already been inputted with its search term in the loader
  const { data: drinks } = useQuery(searchCocktailsQuery(searchTerm));

  return (
    <>
      <SearchForm searchTerm={searchTerm}></SearchForm>
      <CocktailList drinks={drinks}></CocktailList>
    </>
  );
};

export default Landing;
