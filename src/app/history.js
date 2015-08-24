import {List} from "immutable";
import {state} from "./state";

const history = atomo.atom(new List());

state.addWatch(function(atom, oldValue, newValue){
    history.swap((hs) => hs.push(oldValue));
});

