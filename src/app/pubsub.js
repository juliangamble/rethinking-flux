import atomo from "atomo";
import csp from "js-csp";

export const source = atomo.atom(csp.chan());

export function publication(topicFn){
    return csp.operations.pub.publication(source.deref(), topicFn);
};

export function publish(msg){
    csp.putAsync(source.deref(), msg);
};

