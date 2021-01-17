import Head from 'next/head'
import styles from '../styles/Home.module.css'
import * as React from "react";
import {useEffect, useState} from "react";

export default function Home() {

    const [query, setQuery] = useState('');

    const [searchResult, setSearchResult] = useState(null)
    const [error, setError] = useState('')
    const [nominate, setNominate] = useState([])

    console.log(nominate);

    // fetch data
    useEffect(() => {

        fetch(`http://www.omdbapi.com/?apikey=d1461bf&s=${query}`).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong');
            }
        }).then((responseJson) => {

            if (responseJson.Response === "True") {
                setSearchResult(responseJson.Search);
            } else {
                setSearchResult(null);
            }
        }).catch((error) => {
            console.log(error)
        });

    }, [query])

    // fetch data
    useEffect(() => {

        console.log("Changed", nominate);
    }, [nominate])

    function selectedNomination(result) {

        if (nominate.length < 5) {
            if (!(nominate.some(nom => nom.imdbID === result.imdbID))) {
                setNominate([...nominate, result]);
            }
        }
    }

    function removeNomination(result) {
        setNominate((nominations) => nominations.filter((nom) =>  nom.imdbID !== result.imdbID))
    }

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
                            {
                                searchResult ? searchResult.map(result =>
                                        <a>
                                            <li className={styles.list}>
                                                <button
                                                    onClick={() => selectedNomination(result)}
                                                    className={styles.nominate}>Nominate
                                                </button>
                                                {result.Title} ({result.Year})
                                            </li>
                                        </a>
                                    )
                                    : ""
                            }
                        </ul>
                    </div>

                    <div className={styles.card}>
                        <h3>Nominations</h3>
                        <ul>
                            {
                                nominate ? nominate.map(result =>
                                        <a>
                                            <li className={styles.list}>
                                                <button
                                                    onClick={() => removeNomination(result)}
                                                    className={styles.activeNominate}>Remove
                                                </button>
                                                {result.Title} ({result.Year})
                                            </li>
                                        </a>
                                    )
                                    : ""
                            }
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
