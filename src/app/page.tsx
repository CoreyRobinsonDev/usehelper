"use client";
import styles from "./page.module.css";
import useFetch from "@/util/hooks/useFetch";

export default function Home() {
    const [req, res] = useFetch("https://jsonplaceholder.typicode.com/comments");

    return <main>
        <h1>{res.status}</h1>
        <button onClick={req.addParameters({postId: 20}).call}>Fetch</button>
        {res.isPending
            ? <p>fetching...</p>
            : <>
                <p>{res.toString()}</p>
                <b>{res.error}</b>
                <b>{res.hasError ? "true" : "false"}</b>
            </>
        }
    </main>
}
