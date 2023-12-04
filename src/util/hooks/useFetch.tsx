"use client";
import { useState } from "react";

/** Tells browsers to exclude credentials from the request, and ignore any credentials sent back in the response (e.g., any Set-Cookie header). */
type omit = "omit";
/** Tells browsers to include crentials with requests to same-origin URLs, and use any credentials sent back in responses from same-origin URLs. This is the default value. */
type sameOrigin = "same-origin";
/** Tells browsers to include credentials in both same- and cross-origin requests, and always use any credentials sent back in responses.*/
type include = "include";
/** Automatically follow redirects. Unless otherwise stated the redirect mode is set to follow. */
type follow = "follow";
/** Abort with an error if a redirect occurs. */
type error = "error";
/** Caller intends to process the response in another context. See https://fetch.spec.whatwg.org/#concept-request-redirect-mode for more information. */
type manual = "manual";
/** A high-priority fetch request relative to other requests of the same type. */
type high = "high";
/** A low-priority fetch request relative to other requests of the same type. */
type low = "low";
/** Automatically determine the priority of the fetch request relative to other requests of the same type (default). */
type auto = "auto";

export type Options = {
    /** The request method, e.g., GET, POST. The default is GET. Note that the Origin header is not set on Fetch requests with a method of HEAD or GET. Any string that is case-insensitive match for one of the methods in RFC 9110 will be uppercased automatically. If you want to use a custom method (like PATCH), you should uppercase it yourself. */
    method?: "GET" | "POST" | "PUT" | "DELETE" | "HEAD" | "CONNECT" | "OPTIONS" | "TRACE" | "PATCH";
    /** Any headers you want to add to your request, contained within a Headers object or an object literal with String values. Note that some names are forbidden. 
     *
     * Note: The Authorization HTTP header may be added to a request, but will be removed if the request is redirected cross-origin.*/
    headers?: {
        /** Informs the server about the types of media that the client can process */
        accept?: string,
        /** Specifies the encoding algorithms that the client cna understand. */
        "accept-encoding"?: string,
        /** Indicates the natural languages that the client can understand. */
        "accept-language"?: string,
        /** Directives for caching mechanisms in both requests and responses. */
        "cache-control"?: string,
        /** Controls whether the network connection stays open after the current transaction finishes. */
        connection?: string,
        /** Specifies the media type of the resource or data. */
        "content-type"?: string,
        /** Used to send cookies from the client to the server. */
        cookie?: string,
        /** Specifies the domain name of the server (useful for virtual hosting), and the TCP port number on which the server is listening. */
        host?: string,
        /** Provides information about the user agent (browser or other client) initiating the request. */
        "user-agent"?: string,
        /** Contains credentials for authenticating the client with the server. */
        authorization?: string,
        /** Indicates the address of the previous web page from which a link to the currently requested page was followed. */
        referer?: string,
        /** Indicates where a fetch originates from. */
        origin?: string,
        /** (Do Not Track): Requests that a web application disable its tracking of a user. */
        dnt?: string,
        /** Used in the "conditional GET" to match a previous response with a current version of the resource. */
        "if-none-match"?: string,
        /** Allows a 304 Not Modified to be returned if the content has not been modified since a specified date. */
        "if-modified-since"?: string,
        /** Used to identify Ajax requests. */
        "x-requested-with"?: string,
        /** A de facto standard for identifying the originating IP address of a client connecting to a web server through an HTTP proxy or load balancer. */
        "x-forwarded-for"?: string,
        /** Clickjacking protection. */
        "x-frame-options"?: string
    },
    /** Any body that you want to add to your request. Note that a request useing the GET or HEAD method cannot have a body. */
    body?: BodyInit | null;
    /** The mode you want to use for the request.*/
    mode?: "cors" | "no-cors" | "same-origin"; 
    /** Controls what borwsers do with credentials (cookies, HTTP authentication entries, and TLS client certificates). */
    credentials?: omit | sameOrigin | include;
    /** A string indicating how the request will interact with the browser's HTTP cache. */
    cache?: "default" | "no-store" | "reload" | "no-cache" | "force-cache" | "only-if-cached"
    /** How to handle a redirect response. */
    redirect?: follow | error | manual;
    /** A string specifying the referrer of the request. This can be a same-origin URL, about:client, or an empty string. */
    referrer?: string;
    /** Specifies the referrer policy to use for the request. */
    referrerPolicy?: "no-referrer" | "no-referrer-when-downgrade" | "same-origin" | "origin" | "strict-origin" | "origin-when-cross-origin" | "strict-origin-when-cross-origin" | "unsafe-url";
    /** Contains the subresource integrity value of the request (e.g., sha256-BpfBw7ivV8q2jLiTi3fxDYAe2tJllusRSZ273h2nFSE=). */
    integrity?: string;
    /** The keepalive option can be used to allow the request to outlive the page. Fetch with the keepalive flag is a replacement for the Navigator.sendBeacon() API. */
    keepAlive?: boolean;
    /** An AbortSignal object instance; allows you to communicate with a fetch request and abort it if desired via an AbortController. */
    signal?: AbortSignal;
    /** Specifies the priority of the fetch request relative to other requests of the same type. */
    priority?: high | low | auto;
}

export default function useFetch<T>({url, options} : {url: string, options?: Options}) {
    const [res, setRes] = useState<T | null>();
    const [err, setErr] = useState<string | null>();
    const [isPending, setIsPending] = useState(true);

    fetch(url, options)
        .then(r => r.json())
        .then(data => {
            setRes(data);
            setErr(null);
            setIsPending(false);
        })
        .catch(e => {
            setErr(e);
            setRes(null);
            setIsPending(false);
        })
    return [res, isPending, err];
}

function optionsBuilder(options: Options): Options | null {
    if (!options) return null;
    return null;
}
