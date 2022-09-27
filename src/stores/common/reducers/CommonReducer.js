import { LOADING } from "../../../constants/common/CommonConstants";
const initialState = {
   loading:false
   };
 
   // eslint-disable-next-line import/no-anonymous-default-export
   export default function(state = initialState, action) {
     const { type, payload } = action;
     switch(type) {
         case LOADING:
             return{
                 ...state,
                 loading:payload
             }
         default:
                 return state;
     }
   };