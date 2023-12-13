import { UserService } from "../../services/UsersService";
import { FETCH_DATA } from "../type/types";

interface DataState {
  data: any;
}

const initialState: DataState = {
  data: null,
};

const dataReducer = (state = initialState, action: any): DataState => {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
