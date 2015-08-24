import immutable from "immutable";

export const Action = immutable.Record({type: null, payload: null});

export function action(type, payload){
    return new Action({type, payload});
};

