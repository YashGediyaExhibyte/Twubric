import { UserService } from "../../services/UsersService";
import { FETCH_DATA } from "../type/types";

export const GetData = (): any => {
  return async (dispatch: any) => {
    const userService = await UserService.getUsers();
    dispatch({
      type: FETCH_DATA,
      payload: userService,
    });
  };
};
