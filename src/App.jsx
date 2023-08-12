import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { loader as landingLoader } from './pages/Landing';
import { loader as singleCocktailLoader } from './pages/Cocktail';
import { action as newsletterAction } from './pages/Newsletter';
import {
  About,
  Cocktail,
  Error,
  HomeLayout,
  Landing,
  Newsletter,
  SinglePageError,
} from './pages';

const router = createBrowserRouter([
  //Each router is a dictionary
  {
    //home page path:
    path: '/',
    //home page element
    element: <HomeLayout />,
    //global error page:
    errorElement: <Error />,
    //nested pages within home page
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <SinglePageError />,
        loader: landingLoader,
      },
      {
        path: 'cocktail/:id',
        errorElement: <SinglePageError />,
        loader: singleCocktailLoader,
        element: <Cocktail />,
      },
      {
        path: 'newsletter',
        element: <Newsletter />,
        action: newsletterAction,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
