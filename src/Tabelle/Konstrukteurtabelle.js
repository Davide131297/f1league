import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './../utils/firebase';
import Table from 'react-bootstrap/Table';
import { ScrollArea } from '@mantine/core';
// Flaggen
import Bahrain from './../Flaggen/bahrain.png';
import SaudiArabien from './../Flaggen/saudiarabien.png';
import Australien from './../Flaggen/australien.png';
import Aserbaidschan from './../Flaggen/azerbeidschan.png';
import USA from './../Flaggen/usa.png';
import Italien from './../Flaggen/italien.png';
import Monaco from './../Flaggen/monaco.png';
import Spanien from './../Flaggen/spanien.png';
import Kanada from './../Flaggen/kanada.png';
import Österreich from './../Flaggen/österreich.png';
import England from './../Flaggen/england.png';
import Ungarn from './../Flaggen/ungarn.png';
import Belgien from './../Flaggen/belgien.png';
import Niederlande from './../Flaggen/niederlande.png';
import Singapur from './../Flaggen/singapur.png';
import Japan from './../Flaggen/japan.png';
import Katar from './../Flaggen/katar.png';
import Mexiko from './../Flaggen/mexico.png';
import Brasilien from './../Flaggen/brasilien.png';
import AbuDhabi from './../Flaggen/abudhabi.png';

const Konstrukteurtabelle = () => {

    const [personen, setPersonen] = useState([]);
    const [bahrain, setBahrain] = useState([]);
    const [saudiArabien, setSaudiArabien] = useState([]);
    const [australien, setAustralien] = useState([]);
    const [aserbaidschan, setAserbaidschan] = useState([]);
    const [miami, setMiami] = useState([]);
    const [italien, setItalien] = useState([]);
    const [monaco, setMonaco] = useState([]);
    const [spanien, setSpanien] = useState([]);
    const [kanada, setKanada] = useState([]);
    const [österreich, setÖsterreich] = useState([]);
    const [england, setEngland] = useState([]);
    const [ungarn, setUngarn] = useState([]);
    const [belgien, setBelgien] = useState([]);
    const [niederlande, setNiederlande] = useState([]);
    const [singapur, setSingapur] = useState([]);
    const [japan, setJapan] = useState([]);
    const [katar, setKatar] = useState([]);
    const [usa, setUSA] = useState([]);
    const [mexiko, setMexiko] = useState([]);
    const [brasilien, setBrasilien] = useState([]);
    const [lasVegas, setLasVegas] = useState([]);
    const [abuDhabi, setAbuDhabi] = useState([]);


    useEffect(() => {
        const personenRef = collection(db, 'personen');
        const unsubscribe = onSnapshot(personenRef, (snapshot) => {
            let tempListe = [];
            snapshot.forEach((doc) => {
                tempListe.push({ 
                    id: doc.id, 
                    ...doc.data()
                });
            });
            setPersonen(tempListe);

            // Gruppieren der Personen nach ihrem Attribut "team"
            const gruppiertePersonen = tempListe.reduce((gruppen, person) => {
                const team = person.team;
                if (!gruppen[team]) {
                    gruppen[team] = [];
                }
                gruppen[team].push(person);
                return gruppen;
            }, {});

            // Berechnung und Aktualisierung der Punkte für jedes Team
            const updatedTeamPunkte = {};
            for (const team in gruppiertePersonen) {
                const bahrainPunkte = gruppiertePersonen[team].reduce((sum, person) => {
                    return sum + (isNaN(person.bahrain) ? 0 : person.bahrain);
                }, 0);
                updatedTeamPunkte[team] = bahrainPunkte;
            }
            setBahrain(updatedTeamPunkte);
            console.log("Bahrein", updatedTeamPunkte);

            const saudiArabienPunkte = {};
            for (const team in gruppiertePersonen) {
                const teamPunkte = gruppiertePersonen[team].reduce((sum, person) => {
                    return sum + (isNaN(person.saudiArabien) ? 0 : person.saudiArabien);
                }, 0);
                saudiArabienPunkte[team] = teamPunkte;
            }
            setSaudiArabien(saudiArabienPunkte);
            console.log("Saudi Arabien", saudiArabienPunkte);

            const australienPunkte = {};
            for (const team in gruppiertePersonen) {
                const teamPunkte = gruppiertePersonen[team].reduce((sum, person) => {
                    return sum + (isNaN(person.australien) ? 0 : person.australien);
                }, 0);
                australienPunkte[team] = teamPunkte;
            }
            setAustralien(australienPunkte);
            console.log("Australien", australienPunkte);

            const aserbaidschanPunkte = {};
            for (const team in gruppiertePersonen) {
                const teamPunkte = gruppiertePersonen[team].reduce((sum, person) => {
                    return sum + (isNaN(person.aserbaidschan) ? 0 : person.aserbaidschan);
                }, 0);
                aserbaidschanPunkte[team] = teamPunkte;
            }
            setAserbaidschan(aserbaidschanPunkte);
            console.log("Aserbaidschan", aserbaidschanPunkte);
            
            const miamiPunkte = {};
            for (const team in gruppiertePersonen) {
                const teamPunkte = gruppiertePersonen[team].reduce((sum, person) => {
                    return sum + (isNaN(person.miami) ? 0 : person.miami);
                }, 0);
                miamiPunkte[team] = teamPunkte;
            }
            setMiami(miamiPunkte);
            console.log("Miami", miamiPunkte);
            
            const italienPunkte = {};
            for (const team in gruppiertePersonen) {
                const teamPunkte = gruppiertePersonen[team].reduce((sum, person) => {
                    return sum + (isNaN(person.italien) ? 0 : person.italien);
                }, 0);
                italienPunkte[team] = teamPunkte;
            }
            setItalien(italienPunkte);
            console.log("Italien", italienPunkte);

            const monacoPunkte = {};
            for (const team in gruppiertePersonen) {
                const teamPunkte = gruppiertePersonen[team].reduce((sum, person) => {
                    return sum + (isNaN(person.monaco) ? 0 : person.monaco);
                }, 0);
                monacoPunkte[team] = teamPunkte;
            }
            setMonaco(monacoPunkte);
            console.log("Monaco", monacoPunkte);

            const spanienPunkte = {};
            for (const team in gruppiertePersonen) {
                const teamPunkte = gruppiertePersonen[team].reduce((sum, person) => {
                    return sum + (isNaN(person.spanien) ? 0 : person.spanien);
                }, 0);
                spanienPunkte[team] = teamPunkte;
            }
            setSpanien(spanienPunkte);
            console.log("Spanien", spanienPunkte);

            const kanadaPunkte = {};
            for (const team in gruppiertePersonen) {
                const teamPunkte = gruppiertePersonen[team].reduce((sum, person) => {
                    return sum + (isNaN(person.kanada) ? 0 : person.kanada);
                }, 0);
                kanadaPunkte[team] = teamPunkte;
            }
            setKanada(kanadaPunkte);
            console.log("Kanada", kanadaPunkte);

            const österreichPunkte = {};
            for (const team in gruppiertePersonen) {
                const teamPunkte = gruppiertePersonen[team].reduce((sum, person) => {
                    return sum + (isNaN(person.österreich) ? 0 : person.österreich);
                }, 0);
                österreichPunkte[team] = teamPunkte;
            }
            setÖsterreich(österreichPunkte);
            console.log("Österreich", österreichPunkte);

            const englandPunkte = {};
            for (const team in gruppiertePersonen) {
                const teamPunkte = gruppiertePersonen[team].reduce((sum, person) => {
                    return sum + (isNaN(person.england) ? 0 : person.england);
                }, 0);
                englandPunkte[team] = teamPunkte;
            }
            setEngland(englandPunkte);
            console.log("England", englandPunkte);

            const ungarnPunkte = {};
            for (const team in gruppiertePersonen) {
                const teamPunkte = gruppiertePersonen[team].reduce((sum, person) => {
                    return sum + (isNaN(person.ungarn) ? 0 : person.ungarn);
                }, 0);
                ungarnPunkte[team] = teamPunkte;
            }
            setUngarn(ungarnPunkte);
            console.log("Ungarn", ungarnPunkte);

            const belgienPunkte = {};
            for (const team in gruppiertePersonen) {
                const teamPunkte = gruppiertePersonen[team].reduce((sum, person) => {
                    return sum + (isNaN(person.belgien) ? 0 : person.belgien);
                }, 0);
                belgienPunkte[team] = teamPunkte;
            }
            setBelgien(belgienPunkte);
            console.log("Belgien", belgienPunkte);

            const niederlandePunkte = {};
            for (const team in gruppiertePersonen) {
                const teamPunkte = gruppiertePersonen[team].reduce((sum, person) => {
                    return sum + (isNaN(person.niederlande) ? 0 : person.niederlande);
                }, 0);
                niederlandePunkte[team] = teamPunkte;
            }
            setNiederlande(niederlandePunkte);
            console.log("Niederlande", niederlandePunkte);

            const singapurPunkte = {};
            for (const team in gruppiertePersonen) {
                const teamPunkte = gruppiertePersonen[team].reduce((sum, person) => {
                    return sum + (isNaN(person.singapur) ? 0 : person.singapur);
                }, 0);
                singapurPunkte[team] = teamPunkte;
            }
            setSingapur(singapurPunkte);
            console.log("Singapur", singapurPunkte);

            const japanPunkte = {};
            for (const team in gruppiertePersonen) {
                const teamPunkte = gruppiertePersonen[team].reduce((sum, person) => {
                    return sum + (isNaN(person.japan) ? 0 : person.japan);
                }, 0);
                japanPunkte[team] = teamPunkte;
            }
            setJapan(japanPunkte);
            console.log("Japan", japanPunkte);

            const katarPunkte = {};
            for (const team in gruppiertePersonen) {
                const teamPunkte = gruppiertePersonen[team].reduce((sum, person) => {
                    return sum + (isNaN(person.katar) ? 0 : person.katar);
                }, 0);
                katarPunkte[team] = teamPunkte;
            }
            setKatar(katarPunkte);
            console.log("Katar", katarPunkte);

            const usaPunkte = {};
            for (const team in gruppiertePersonen) {
                const teamPunkte = gruppiertePersonen[team].reduce((sum, person) => {
                    return sum + (isNaN(person.usa) ? 0 : person.usa);
                }, 0);
                usaPunkte[team] = teamPunkte;
            }
            setUSA(usaPunkte);
            console.log("USA", usaPunkte);

            const mexikoPunkte = {};
            for (const team in gruppiertePersonen) {
                const teamPunkte = gruppiertePersonen[team].reduce((sum, person) => {
                    return sum + (isNaN(person.mexiko) ? 0 : person.mexiko);
                }, 0);
                mexikoPunkte[team] = teamPunkte;
            }
            setMexiko(mexikoPunkte);
            console.log("Mexiko", mexikoPunkte);

            const brasilienPunkte = {};
            for (const team in gruppiertePersonen) {
                const teamPunkte = gruppiertePersonen[team].reduce((sum, person) => {
                    return sum + (isNaN(person.brasilien) ? 0 : person.brasilien);
                }, 0);
                brasilienPunkte[team] = teamPunkte;
            }
            setBrasilien(brasilienPunkte);
            console.log("Brasilien", brasilienPunkte);

            const lasVegasPunkte = {};
            for (const team in gruppiertePersonen) {
                const teamPunkte = gruppiertePersonen[team].reduce((sum, person) => {
                    return sum + (isNaN(person.lasVegas) ? 0 : person.lasVegas);
                }, 0);
                lasVegasPunkte[team] = teamPunkte;
            }
            setLasVegas(lasVegasPunkte);
            console.log("Las Vegas", lasVegasPunkte);

            const abuDhabiPunkte = {};
            for (const team in gruppiertePersonen) {
                const teamPunkte = gruppiertePersonen[team].reduce((sum, person) => {
                    return sum + (isNaN(person.abuDhabi) ? 0 : person.abuDhabi);
                }, 0);
                abuDhabiPunkte[team] = teamPunkte;
            }
            setAbuDhabi(abuDhabiPunkte);
            console.log("Abu Dhabi", abuDhabiPunkte);
        });

        // Aufräumen bei Unmount
        return () => unsubscribe();
    }, []);

    function safeAdd(...values) {
        return values.reduce((sum, value) => sum + (isNaN(value) ? 0 : value), 0);
    }

    return (
        <div className='table-container'>
            <ScrollArea type='never' className='scrollarea'>
                <Table striped bordered hover>
                    <thead className='thead-sticky'>
                        <tr>
                            <th>Konstrukteur</th>
                            <th><img src={Bahrain} alt="Bahrain" className='img-size'/></th>
                            <th><img src={SaudiArabien} alt="SaudiArabien" className='img-size'/></th>
                            <th><img src={Australien} alt="Australien" className='img-size'/></th>
                            <th><img src={Aserbaidschan} alt="Aserbeidschan" className='img-size'/></th>
                            <th><img src={USA} alt="Miami" className='img-size'/></th>
                            <th><img src={Italien} alt="Italien" className='img-size'/></th>
                            <th><img src={Monaco} alt="Monaco" className='img-size'/></th>
                            <th><img src={Spanien} alt="Spanien" className='img-size'/></th>
                            <th><img src={Kanada} alt="Kanada" className='img-size'/></th>
                            <th><img src={Österreich} alt="Österreich" className='img-size'/></th>
                            <th><img src={England} alt="England" className='img-size'/></th>
                            <th><img src={Ungarn} alt="Ungarn" className='img-size'/></th>
                            <th><img src={Belgien} alt="Belgien" className='img-size'/></th>
                            <th><img src={Niederlande} alt="Niederlande" className='img-size'/></th>
                            <th><img src={Singapur} alt="Singapur" className='img-size'/></th>
                            <th><img src={Japan} alt="Japan" className='img-size'/></th>
                            <th><img src={Katar} alt="Katar" className='img-size'/></th>
                            <th><img src={USA} alt="USA" className='img-size'/></th>
                            <th><img src={Mexiko} alt="Mexiko" className='img-size'/></th>
                            <th><img src={Brasilien} alt="Brasilien" className='img-size'/></th>
                            <th><img src={USA} alt="LasVegas" className='img-size'/></th>
                            <th><img src={AbuDhabi} alt="AbuDhabi" className='img-size'/></th>
                            <th>Gesamtpunkte</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ["Mercedes", "Ferrari", "Red Bull", "McLaren", "Williams", "Aston Martin"].map((team) => (
                                <tr>
                                    <td>{team}</td>
                                    <td>{isNaN(bahrain[team]) ? '' : bahrain[team]}</td>
                                    <td>{isNaN(saudiArabien[team]) ? '' : saudiArabien[team]}</td>
                                    <td>{isNaN(australien[team]) ? '' : australien[team]}</td>
                                    <td>{isNaN(aserbaidschan[team]) ? '' : aserbaidschan[team]}</td>
                                    <td>{isNaN(miami[team]) ? '' : miami[team]}</td>
                                    <td>{isNaN(italien[team]) ? '' : italien[team]}</td>
                                    <td>{isNaN(monaco[team]) ? '' : monaco[team]}</td>
                                    <td>{isNaN(spanien[team]) ? '' : spanien[team]}</td>
                                    <td>{isNaN(kanada[team]) ? '' : kanada[team]}</td>
                                    <td>{isNaN(österreich[team]) ? '' : österreich[team]}</td>
                                    <td>{isNaN(england[team]) ? '' : england[team]}</td>
                                    <td>{isNaN(ungarn[team]) ? '' : ungarn[team]}</td>
                                    <td>{isNaN(belgien[team]) ? '' : belgien[team]}</td>
                                    <td>{isNaN(niederlande[team]) ? '' : niederlande[team]}</td>
                                    <td>{isNaN(singapur[team]) ? '' : singapur[team]}</td>
                                    <td>{isNaN(japan[team]) ? '' : japan[team]}</td>
                                    <td>{isNaN(katar[team]) ? '' : katar[team]}</td>
                                    <td>{isNaN(usa[team]) ? '' : usa[team]}</td>
                                    <td>{isNaN(mexiko[team]) ? '' : mexiko[team]}</td>
                                    <td>{isNaN(brasilien[team]) ? '' : brasilien[team]}</td>
                                    <td>{isNaN(lasVegas[team]) ? '' : lasVegas[team]}</td>
                                    <td>{isNaN(abuDhabi[team]) ? '' : abuDhabi[team]}</td>
                                    <td>{safeAdd(bahrain[team], saudiArabien[team], australien[team], aserbaidschan[team], miami[team], italien[team], monaco[team], spanien[team], kanada[team], österreich[team], england[team], ungarn[team], belgien[team], niederlande[team], singapur[team], japan[team], katar[team], usa[team], mexiko[team], brasilien[team], lasVegas[team], abuDhabi[team])}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </ScrollArea>
        </div>
    );
};
export default Konstrukteurtabelle;