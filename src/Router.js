import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TeilnehmerTabelle from './Tabelle/TeilnehmerTabelle';
import Header from './header/header';
import Profil from './Profil/Profil';
import Popup from './Popup/Popup';
import Konstrukteurtabelle from './Tabelle/Konstrukteurtabelle';

export function Router() {
    return (
        <BrowserRouter>
            <Header />
            <Popup />
            <Routes>
                <Route path="/f1league" element={<TeilnehmerTabelle />} />
                <Route path="/f1league/konstrukteure" element={<Konstrukteurtabelle />} />
                <Route path="/f1league/profil/:id" element={<Profil />} />
            </Routes>
        </BrowserRouter>
    );
}