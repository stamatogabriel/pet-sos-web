import produce from "immer";

const INITIAL_STATE = {
  open: false,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case "@menu/CHANGE_MENU": {
        draft.open = action.payload;
        break;
      }
      default:
    }
  });
}
