import { ActionTypeEnum } from "../types/enum";
import { ActionType, FlowState } from "../types/state";

const initialState = {
  user: {},
};

export const flowReducer = (
  state: FlowState = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ActionTypeEnum.EMAIL:
      return {
        ...state,
        user: {
          ...state.user,
          email: action?.payload?.email || state.user?.email,
          phone: "",
        },
      };
    case ActionTypeEnum.PHONE:
      return {
        ...state,
        user: {
          ...state.user,
          phone: action?.payload?.phone || state.user?.phone,
          email: "",
        },
      };
    case ActionTypeEnum.USER_DETAILS:
      return {
        ...state,
        user: {
          ...state.user,
          fullName: action?.payload?.fullName || state.user?.fullName,
          accountId: action?.payload?.accountId || state.user?.accountId,
        },
      };
    default:
      return state;
  }
};
