import Head from 'next/head'
import styles from '../styles/Home.module.css'
import * as React from "react";
import {useEffect, useState} from "react";
import useSWR from "swr";


export default function Home() {

    const [query, setQuery] = useState('');



    const {data, error} = useSWR(`http://www.omdbapi.com/?apikey=d1461bf&s=${query}`, fetch)

    const [searchResult, setSearchResult] = useState(data)

    console.log(searchResult.body)
    console.log(data)
    console.log(error)

    return (
        <div className={styles.container}>
            <Head>
                <title>Shoppies Movie Awards </title>
                <link rel="icon" href="/gn-logo.png"/>
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    The Shoppies Movie Awards
                </h1>

                <br/><br/>

                <div className={styles.card}>
                    <h3>Search by Movie Title</h3>
                    <div className={styles.inputContainer}>
                        <input className={styles.searchbar} placeholder="Search..."
                               onChange={({target}) => setQuery(target.value)}

                        />
                        <img className={styles.searchIcon} src="/search.png" alt="search icon"/>
                    </div>
                </div>

                <div className={styles.grid}>
                    <div className={styles.card}>
                        <h3>Results for "{query}"</h3>
                        <ul>
                            {data ?
                                // data.map(movie =>
                                    <a>
                                        <li className={styles.list}><img className={styles.nomIcon} src="/like.png"
                                                                         alt="nominate"/> tea
                                        </li>
                                    </a>
                                // )

                                : ""}
                        </ul>
                    </div>

                    <div className={styles.card}>
                        <h3>Nominations</h3>
                        <ul>
                            <a>
                                <li className={styles.list}><img className={styles.nomIcon} src="/like.png"
                                                                 alt="nominate"/> Tea
                                </li>
                            </a>
                        </ul>
                    </div>
                </div>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    With &hearts; by{' '}
                    <img src="/gn-logo.png" alt="GN Logo" className={styles.logo}/>
                </a>
            </footer>
        </div>
    )
}
