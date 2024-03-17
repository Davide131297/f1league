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

import React from 'react';
import Table from 'react-bootstrap/Table';
import './Profiltabelle.css';

const Profiltabelle = (person) => {
    // Definieren Sie die Überschriften und die entsprechenden Werte
    const data = [
        {header: <img src={Bahrain} alt="Bahrain" className='img-size'/>, value: person.bahrain || 0},
        {header: <img src={SaudiArabien} alt="SaudiArabien" className='img-size'/>, value: person.saudiArabien || 0},
        {header: <img src={Australien} alt="Australien" className='img-size'/>, value: person.australien || 0},
        {header: <img src={Aserbaidschan} alt="Aserbeidschan" className='img-size'/>, value: person.aserbaidschan || 0},
        {header: <img src={USA} alt="Miami" className='img-size'/>, value: person.miami || 0},
        {header: <img src={Italien} alt="Italien" className='img-size'/>, value: person.italien || 0},
        {header: <img src={Monaco} alt="Monaco" className='img-size'/>, value: person.monaco || 0},
        {header: <img src={Spanien} alt="Spanien" className='img-size'/>, value: person.spanien || 0},
        {header: <img src={Kanada} alt="Kanada" className='img-size'/>, value: person.kanada || 0},
        {header: <img src={Österreich} alt="Österreich" className='img-size'/>, value: person.österreich || 0},
        {header: <img src={England} alt="England" className='img-size'/>, value: person.england || 0},
        {header: <img src={Ungarn} alt="Ungarn" className='img-size'/>, value: person.ungarn || 0},
        {header: <img src={Belgien} alt="Belgien" className='img-size'/>, value: person.belgien || 0},
        {header: <img src={Niederlande} alt="Niederlande" className='img-size'/>, value: person.niederlande || 0},
        {header: <img src={Singapur} alt="Singapur" className='img-size'/>, value: person.singapur || 0},
        {header: <img src={Japan} alt="Japan" className='img-size'/>, value: person.japan || 0},
        {header: <img src={Katar} alt="Katar" className='img-size'/>, value: person.katar || 0},
        {header: <img src={USA} alt="USA" className='img-size'/>, value: person.usa || 0},
        {header: <img src={Mexiko} alt="Mexiko" className='img-size'/>, value: person.mexiko || 0},
        {header: <img src={Brasilien} alt="Brasilien" className='img-size'/>, value: person.brasilien || 0},
        {header: <img src={USA} alt="LasVegas" className='img-size'/>, value: person.lasVegas || 0},
        {header: <img src={AbuDhabi} alt="AbuDhabi" className='img-size'/>, value: person.abuDhabi || 0},
        {header: 'Gesamtpunkte', value: person.gesamtPunkte || 0}
    ];

    return (
        <div className='table-container'>
            <h5 className='table-header'>Punkteübersicht</h5>
            <div className='profiltabelle'>
                <Table striped bordered hover>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <th>{item.header}</th>
                                <td>{item.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default Profiltabelle;