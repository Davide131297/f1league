import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TeilnehmerTabelle from './Tabelle/TeilnehmerTabelle';
import Header from './header/header';
import Profil from './Profil/Profil';

export function Router() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/f1league" element={<TeilnehmerTabelle />} />
                <Route path="/f1league/profil/:id" element={<Profil />} />
            </Routes>
        </BrowserRouter>
    );
}