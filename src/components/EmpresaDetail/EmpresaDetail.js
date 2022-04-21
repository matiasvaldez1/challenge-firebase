import React,{useEffect,useState} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { getBusinessDetail,cleanBusinessDetail } from '../../Redux/actions'
import Nav from '../Nav/Nav'
import styles from './EmpresaDetail.module.css'

export default function EmpresaDetail() {
  const location = useLocation()
  const dispatch = useDispatch()
  const data = useSelector(state => state.businessDetail)
  const splitted = location.pathname.split("/")

  useEffect(() => {
    dispatch(getBusinessDetail(splitted[2]))
    //Limpiamos el estado al desmontar el componente
    return () =>{dispatch(cleanBusinessDetail())}
  }, [])
  
  return (
    <div className={styles.bgDetail}>
        <Nav />
    {data.length > 0 ?
    <div>
      <Link className={styles.linkStyles} to="/empresas">Go back to home</Link>
      <table className={styles.tableDetail}>
        <tbody>
                  <tr>
                    <th className={styles.trBorder}>Nombre de cliente</th>
                    <th className={styles.trBorder}>Personas</th>
                    <th className={styles.trBorder}>Dia</th>
                    <th className={styles.trBorder}>Hora</th>
                    <th className={styles.trBorder}>Valor Renta</th>
                  </tr>
          {data?.map((e,i) =>{
              return (
                  <tr key={i}>
                    <td>{e.name}</td>
                    <td>{e.persons}</td>
                    <td>{e.day}</td>
                    <td>{e.hour}</td>
                    <td>${e.finalPrice}</td>
                  </tr>
              )
            })}
        </tbody>
    </table>
          </div>
    : <p>Loading...</p>}
    </div>
  )
}