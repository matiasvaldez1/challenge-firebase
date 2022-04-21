import { 
GET_BUSINESS,
GET_BUSINESS_DETAIL,
CLEAN_BUSINESS_DETAIL 
} from "./types";

const getMonth = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
};

const initialState = {
    business: [],
    businessDetail: [],
    maxNum: [],
    monthSales: []
}

export const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        
        case GET_BUSINESS:
            const data = action.payload
            const higher = action.payload
            const obj = {}
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
            const sortedMonth = Object.values(obj).sort(function(a,b){return b-a;})[0]
        
            const grouped = data.reduce((map => (r, a) => {
                map.set(a.nameAgency, map.get(a.nameAgency) || r[r.push({ nameAgency: a.nameAgency, finalPrice: 0 }) - 1]);
                map.get(a.nameAgency).finalPrice += a.finalPrice;
                return r;
            })(new Map), []);
            const copy = [...grouped]
            const higherSales = copy.sort(function(a,b){return b-a;})[0]
            return {
                ...state,
                business: grouped,
                maxNum: higherSales.finalPrice,
                monthSales:sortedMonth
            }

        case GET_BUSINESS_DETAIL:
            const alldata = action.payload.json
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