import csp from "js-csp";
import pubsub from "./pubsub";
import {ACTIONS} from "./constants";

let userChan = csp.chan(),
    pub = pubsub.publication((v) => v.get("type"));

pub.sub(ACTIONS.LOG_IN, userChan);
pub.sub(ACTIONS.LOG_OUT, userChan);

csp.go(function*(){
    let action = yield userChan;

    while (action !== csp.CLOSED) {
        let {type} = action;

        if (type === ACTIONS.LOG_IN) {
            let user = action.get("payload");
            console.log(user, " just logged in.")
        } else {
            console.log("The user just logged out.");
        }

        action = yield userChan;
    }
});

