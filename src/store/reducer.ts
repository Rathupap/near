import { ActionTypeEnum } from "../types/enum";
import { ActionType, FlowState } from "../types/state";

const initialState = {
  user: {},
  users: [
    {
      email: "walter@gmail.com",
      phone: "",
      fullName: "Walter James",
      accountId: "walterj",
    },
    {
      email: "",
      phone: "0745057082",
      fullName: "John Doe",
      accountId: "johnd",
    },
  ],
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
    case ActionTypeEnum.CREATE_ACCOUNT:
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
