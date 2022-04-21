import { CLEAN_BUSINESS_DETAIL, GET_BUSINESS,GET_BUSINESS_DETAIL } from "./types";
import {db} from '../firebase'
import {collection, getDocs} from 'firebase/firestore';

const businessRef = collection(db,"empresas")

export function getBusiness() {
    return async function (dispatch) {
        const data = await getDocs(businessRef)
        const json = data.docs.map(doc => ({...doc.data()}))

      return dispatch({
        type: GET_BUSINESS,
        payload: json,
      });
    };
  }

  export function getBusinessDetail(name) {
    return async function (dispatch) {
        const data = await getDocs(businessRef)
        const json = data.docs.map(doc => ({...doc.data()}))

      return dispatch({
        type: GET_BUSINESS_DETAIL,
        payload: {
          json:json,
          name:name
        },
      });
    };
  }

  export function cleanBusinessDetail(){
      return {
        type: CLEAN_BUSINESS_DETAIL,
      };
  }