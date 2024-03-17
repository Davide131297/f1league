import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TeilnehmerTabelle from './Tabelle/TeilnehmerTabelle';
import Header from './header/header';
import Profil from './Profil/Profil';

const router = createBrowserRouter([
    {
        path: '/f1league',
        element: <TeilnehmerTabelle />,
    },
    {
        path: `/f1league/profil/:id`,
        element: <Profil />,
    }
]);

export function Router() {
    return (
        <>
            <Header />
            <RouterProvider router={router} />
        </>
    );
}