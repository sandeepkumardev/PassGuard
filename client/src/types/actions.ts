import { Domain } from "../api";
import {
  HANDLE_DELETE_MODAL,
  HANDLE_RESOLVED_MODAL,
  HANDLE_TOAST,
  INCLUDE_RESOLVED,
  IS_RESOLVED,
} from "../constants";

export type IToast = {
  isOpen: boolean;
  success?: boolean;
  message?: string;
};

export type ActionsState = {
  deleteModal: { isOpen: boolean; data: null | Domain };
  resolvedModal: { isOpen: boolean; data: null | Domain };
  toast: IToast;
  isResolved: boolean;
};

export type ActionsAction =
  | { type: typeof IS_RESOLVED; payload?: boolean }
  | { type: typeof HANDLE_TOAST; payload: IToast }
  | {
      type: typeof HANDLE_DELETE_MODAL;
      payload: { isOpen: boolean; data: null | Domain };
    }
  | {
      type: typeof HANDLE_RESOLVED_MODAL;
      payload: { isOpen: boolean; data: null | Domain };
    }
  | { type: typeof INCLUDE_RESOLVED; payload: boolean };
