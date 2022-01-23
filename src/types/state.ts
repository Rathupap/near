import { AnyAction } from "redux";

export interface UserType {
  email?: string;
  phone?: string;
  fullName?: string;
  accountId?: string;
}

interface PayloadType {
  email?: string;
  phone?: string;
  fullName?: string;
  accountId?: string;
}

export interface ActionType extends AnyAction {
  payload: PayloadType;
}

export interface FlowState {
  user?: UserType;
  users: UserType[];
}
