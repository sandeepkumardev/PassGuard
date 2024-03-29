import {
  HANDLE_DELETE_MODAL,
  HANDLE_RESOLVED_MODAL,
  HANDLE_TOAST,
  INCLUDE_RESOLVED,
  IS_RESOLVED,
} from "../constants";
import { ActionsAction, ActionsState } from "../types";
import { getOrSet, set } from "../utils/localStorage";

export const actionsState = {
  deleteModal: { isOpen: false, data: null },
  resolvedModal: { isOpen: false, data: null },
  toast: { isOpen: false, success: false, message: "" },
  isResolved: false,
};

export function actionsReducer(state: ActionsState, action: ActionsAction): ActionsState {
  switch (action.type) {
    case IS_RESOLVED:
      const { status } = getOrSet(INCLUDE_RESOLVED, JSON.stringify({ status: false }));
      return { ...state, isResolved: status };

    case INCLUDE_RESOLVED:
      set(INCLUDE_RESOLVED, JSON.stringify({ status: !state.isResolved }));
      return { ...state, isResolved: !state.isResolved };

    case HANDLE_TOAST:
      const { isOpen, success, message } = action.payload;
      const toast = isOpen
        ? { isOpen, success, message }
        : { isOpen: false, success: false, message: "" };
      return { ...state, toast };

    case HANDLE_DELETE_MODAL:
      const delModal = action.payload;
      return {
        ...state,
        deleteModal: { isOpen: delModal.isOpen, data: delModal.data },
      };

    case HANDLE_RESOLVED_MODAL:
      const resModal = action.payload;
      return {
        ...state,
        resolvedModal: { isOpen: resModal.isOpen, data: resModal.data },
      };

    default:
      return state;
  }
}
