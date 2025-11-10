import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "src/resources/js/routes";
import { StoreProvider } from "src/resources/js/core/store";

const router = createBrowserRouter(routes);

const App = () => (
    <StoreProvider>
        <RouterProvider router={router} />
    </StoreProvider>
);

export { App, router };
export default App;




