import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {getBusiness} from '../../Redux/actions'

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
    {business.length > 1 ?
    <div className="App">
      <div>
        <div>Empresa con mas ventas {max}</div>
        <div>Mes con mas ventas {month.month}</div>
        {business && business.map((buss,index) =>{
          return (
          <div key={index}>
            <h1>{buss.nameAgency}</h1>
            <p>Total de ventas {buss.finalPrice}</p>
            <p>Comision {buss.finalPrice * 0.025}</p>
            <Link to={`/empresas/${buss.nameAgency.replace(/\s/g, '')}`}>Detalles de la empresa</Link>
          </div>
          )
        })}
      </div>
    </div>
    : <p>Loading..</p>}
    </>
  );
}

export default Home;
