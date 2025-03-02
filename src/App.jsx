import { RouterProvider } from 'react-router-dom';

// project import
import router from 'routes';
import { Provider } from "react-redux";
import ThemeCustomization from 'themes';
import store from "./store";
import ScrollTop from 'components/ScrollTop';


export default function App() {
  return (
    <ThemeCustomization>
       <Provider store={store}>
      <ScrollTop>
        <RouterProvider router={router} />
      </ScrollTop>
      </Provider>
    </ThemeCustomization>
  );
}
