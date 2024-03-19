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

    return (
        <div className='table-container'>
            <ScrollArea type='never' className='scrollarea'>
                <Table striped bordered hover>
                    <thead className='thead-sticky'>
                        <tr>
                            <th>Pos</th>
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
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{/* Pos */}</td>
                        </tr>
                    </tbody>
                </Table>
            </ScrollArea>
        </div>
    );
};
export default Konstrukteurtabelle;