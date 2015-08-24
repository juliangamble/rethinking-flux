import {ACTIONS} from "./constants";
import {action} from "./actions";
import pubsub from "./pubsub";
import http from "./http";
import {fromJS} from "immutable";


export function tryLogIn(username, password){
    http.post("/login", {username, password})
        .then((user) => pubsub.publish(action(ACTIONS.LOG_IN, fromJS(user))))
        .catch((errors) => pubsub.publish(action(ACTIONS.LOG_IN_FAILED, fromJS(errors))))
};

export function logout(username, password){
    pubsub.publish(action(ACTIONS.LOG_OUT));
};

