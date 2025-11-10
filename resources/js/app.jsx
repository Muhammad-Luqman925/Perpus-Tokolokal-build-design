import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "@/routes";
import { StoreProvider } from "@/core/store";

const router = createBrowserRouter(routes);

const App = () => (
    <StoreProvider>
        <RouterProvider router={router} />
    </StoreProvider>
);

export { App, router };
export default App;




