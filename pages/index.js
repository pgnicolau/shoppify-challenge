import Head from 'next/head'
import styles from '../styles/Home.module.css'
import * as React from "react";
import {useEffect, useState} from "react";
import {toast, ToastContainer} from 'react-nextjs-toast'

export default function Home() {


    // SESSION CODE
    if (!localStorage.getItem('nomination_list')) {
        localStorage.setItem('nomination_list', []);
    }

    const [query, setQuery] = useState('');

    const [searchResult, setSearchResult] = useState(null)
    const [error, setError] = useState('')

    const storedNames = JSON.parse(localStorage.getItem("nomination_list"));

    const [nominate, setNominate] = useState(storedNames.length > 0 ? storedNames : [])

    localStorage.setItem("nomination_list", JSON.stringify(nominate));

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
    }, [nominate])

    function selectedNomination(result) {

        if (nominate.length === 4) {
            toast.notify('You have reached the max number of nominations!', {
                title: 'Just a Friendly Reminder',
                duration: 20,
                type: "info",
            })
        }

        if (nominate.length < 5) {
            if (!(nominate.some(nom => nom.imdbID === result.imdbID))) {
                setNominate([...nominate, result]);
            }
        }
    }

    function removeNomination(result) {
        setNominate((nominations) => nominations.filter((nom) => nom.imdbID !== result.imdbID))
    }

    function getButtonStyle(result) {
        if ((nominate.some(nom => nom.imdbID === result.imdbID))) {
            return styles.disabled
        } else {
            return styles.nominate
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Shoppies Movie Awards </title>
                <link rel="icon" href="/gn-logo.png"/>
            </Head>

            <main className={styles.main}>

                <ToastContainer position={"top"}/>

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
                                                    className={getButtonStyle(result)}
                                                >Nominate
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
                                nominate.length > 0 ? nominate.map(result =>
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
