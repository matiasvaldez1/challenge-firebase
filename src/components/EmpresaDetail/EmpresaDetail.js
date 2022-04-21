import React,{useEffect,useState} from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { getBusinessDetail,cleanBusinessDetail } from '../../Redux/actions'

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
    <>
    {data.length > 0 ?
    <div>
      {data?.map(e =>{
        return (
          <>
          <div>{e.name}</div>
          <p>{e.persons}</p>
          <p>{e.day}</p>
          <p>{e.hour}</p>
          <p>{e.finalPrice}</p>
          </>
        )
      })}
    </div>
    : <p>Loading...</p>}
    </>
  )
}
