import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {getBusiness} from '../../Redux/actions'
import Nav from '../Nav/Nav';
import styles from './Home.module.css'

function Home() {
  const dispatch = useDispatch()
  const business = useSelector(state => state.business)
  const max = useSelector(state => state.maxNum)
  const month = useSelector(state => state.monthSales)

  useEffect(() => {
    dispatch(getBusiness())
  }, [])
 

  return (
    <>
    <Nav />
    <div className={styles.bg}>
    {business.length > 1 ?
    <div>
      <div>
        <div className={styles.overview}>
          <div className={styles.ovrcontainer}>
            <h1>Empresa con mas ventas</h1>
            <h2>${max}</h2>
          </div>
          <div className={styles.ovrcontainer}>
            <h1>Mes con mas ventas</h1>
            <h2>{month.month}</h2>
          </div>
        </div>
        <div>
            <table cellSpacing='10' className={styles.table}>
              <tbody>
                  <tr className={styles.trPosition}>
                    <th className={styles.tr}>Nombre de empresa</th>
                    <th className={styles.tr}>Total de ventas</th>
                    <th className={styles.tr}>Comision</th>
                    <th className={styles.tr}>Detalles</th>
                  </tr>
              {business && business.map((buss,index) =>{
                return (
                  <tr key={index} className={styles.trPosition}>
                    <td>{buss.nameAgency}</td>
                    <td>${buss.finalPrice}</td>
                    <td>${buss.finalPrice * 0.025}</td>
                    <td><Link className={styles.linkStyle} to={`/empresas/${buss.nameAgency.replace(/\s/g, '')}`}>Detalles de la empresa</Link></td>
                  </tr>
                )
              })}
              </tbody>
            </table>
        </div>
      </div>
    </div>
    : <p>Loading..</p>}
    </div>
    </>
  );
}

export default Home;