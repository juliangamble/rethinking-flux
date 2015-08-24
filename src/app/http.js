/* eslint-disable new-cap, no-undef, no-shadow */

import superagent from "superagent";
import {Record, fromJS} from "immutable";

// NOTE: Superagent is silly enough to ignore the plaintext bodies
superagent.parse["text/plain"] = (x) => x;

// ================================================================================
// Headers

export const headers = {
    authorization(rawToken){
        return { "Authorization": `Bearer ${rawToken}` };
    },
    contentType(rawContentType) {
        return { "Content-Type": rawContentType };
    }
};

// ================================================================================
// Response

export const Response = Record({status: null, headers: null, body: null});

export function response(rawResponse){
    return new Response({
        status: rawResponse.status,
        headers: fromJS(rawResponse.headers),
        body: rawResponse.body
    });
}

export const STATUS = {
    // Success
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NON_AUTHORITATIVE: 203,
    NO_CONTENT: 204,
    RESET_CONTENT: 205,
    PARTIAL_CONTENT: 206,

    // Redirection
    MULTIPLE_CHOICES: 300,
    MOVED_PERMANENTLY: 301,
    FOUND: 302,
    SEE_OTHER: 303,
    NOT_MODIFIED: 304,
    USE_PROXY: 305,
    SWITCH_PROXY: 306,
    TEMPORARY_REDIRECT: 307,
    PERMANENT_REDIRECT: 308,

    // Client errors
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    PAYMENT_REQUIRED: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    NOT_ACCEPTABLE: 406,
    PROXY_AUTHENTICATION_REQUIRED: 407,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    GONE: 410,
    LENGTH_REQUIRED: 411,
    PRECONDITION_FAILED: 412,
    REQUEST_ENTITY_TOO_LARGE: 413,
    REQUEST_URI_TOO_LONG: 414,
    UNSUPPORTED_MEDIA_TYPE: 415,
    REQUESTED_RANGE_NOT_SATISFIABLE: 416,
    EXPECTATION_FAILED: 417,
    AUTHENTICATION_TIMEOUT: 419,

    // Server errors
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
    HTTP_VERSION_NOT_SUPPORTED: 505
};

// ================================================================================
// Request

// :: Method -> URL -> Payload -> Maybe Query -> Maybe Headers -> Promise Response
function request(method, url, payload, query = {}, headers = {}){
    return new Promise(function(resolve, reject){
        let req = superagent(method, url)
            .query(query)
            .set(headers);

        if (payload) {
            req = req.send(payload);
        }

        req.end((err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(response(res));
            }
        });
    });
}

// ================================================================================
// HTTP methods

// :: URL -> Maybe { params, headers } -> Promise Response
export function GET(url, options = {}) {
    let { query, headers } = options;
    return request("GET", url, undefined, query, headers);
};

// :: URL -> Maybe { query, headers, body } -> Promise Response
export function POST(url, options = {}){
    let { query, headers, body } = options;
    return request("POST", url, body, query, headers);
};

// :: URL -> Maybe { query, headers, body } -> Promise Response
export function PUT(url, options = {}){
    let { query, headers, body } = options;
    return request("PUT", url, body, query, headers);
};

// :: URL -> Maybe { params, headers } -> Promise Response
export function DELETE(url, options = {}) {
    let { query, headers, body } = options;
    return request("DELETE", url, body, query, headers);
};


export default { GET, POST, PUT, DELETE, STATUS, headers};
