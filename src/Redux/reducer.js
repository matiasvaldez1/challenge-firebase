import { getMonth } from "../components/utils/Month";
import { 
GET_BUSINESS,
GET_BUSINESS_DETAIL,
CLEAN_BUSINESS_DETAIL 
} from "./types";

const initialState = {
    business: [],
    businessDetail: [],
    maxNum: [],
    monthSales: []
}

export const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        
        case GET_BUSINESS:
            //Guardamos dos copias del estado
            const data = action.payload
            const higher = action.payload
            const obj = {}
            //Creamos el objeto donde pasaremos los meses
            data.map(e =>{
                const date = new Date(e.datePayment)
                const month = date.getMonth()
                const nameOfMonth = getMonth[month]
                if(obj[nameOfMonth]){
                    obj[nameOfMonth].total += e.finalPrice
                }else{
                    obj[nameOfMonth] = {total: e.finalPrice,month: nameOfMonth}
                }
            })
            //Sorteamos el month para obtener el mayor
            const sortedMonth = Object.values(obj).sort(function(a,b){return b-a;})[0]
            //Iteramos sobre toda la data para sumar todos los final price 
            //y deshacernos de los duplicados
            const grouped = data.reduce((map => (r, a) => {
                map.set(a.nameAgency, map.get(a.nameAgency) || r[r.push({ nameAgency: a.nameAgency, finalPrice: 0 }) - 1]);
                map.get(a.nameAgency).finalPrice += a.finalPrice;
                return r;
            })(new Map), []);
            const copy = [...grouped]
            //Sorteamos como arriba para objeter el mes con mayor sales
            const higherSales = copy.sort(function(a,b){return b-a;})[0]
            return {
                ...state,
                business: grouped,
                maxNum: higherSales.finalPrice,
                monthSales:sortedMonth
            }

        case GET_BUSINESS_DETAIL:
            const alldata = action.payload.json
            //Filtramos el pais que corresponda al name pasado a la action
            const detail = alldata.filter(e =>{
                return e.nameAgency.replace(/\s/g, '') == action.payload.name
            })

            return {
                ...state,
                businessDetail: detail
            }

        case CLEAN_BUSINESS_DETAIL:
            return {
                ...state,
                businessDetail: []
            }
        default:
            return state;
    }
}