import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams} from "react-router-dom";
import base from "../helpers/Base";
import defaultCover from "../img/default.svg";
import CartIcon from "../components/CartIcon";

const Book = () => {
    let match = useRouteMatch();
    return (
        <div>
            <Switch>
                <Route path={`${match.path}/:bookID`}>
                    <BookPage/>
                </Route>
                <Route path={match.path}>
                    <BookNotFound/>
                </Route>
            </Switch>
        </div>
    )
}

const BookPage = () => {
    const {bookID} = useParams();
    const [book, setBook] = useState([]);

    useEffect(() => {
        fetchBook();
    }, [])

    /**
     * Retrive book by ID using bookID
     */
    function fetchBook() {
        let request = base.apiUrl + 'Books/' + bookID;
        fetch(request, base.headers)
            .then(response => response.json())
            .then(json => {
                setBook(json)
            })
            .catch(error => console.error(error))
    }

    return (
        <div>
            {book.hasOwnProperty('fields') ? <BookRender book={book}/> : <BookNotFound/>}
        </div>
    )
}

const BookRender = ({book}) => {
    const [url, setUrl] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [editors, setEditors] = useState([]);

    useEffect(() => {
        if (book.fields.Cover) {
            setUrl(book.fields.Cover[0].url)
        } else {
            setUrl(defaultCover)
        }
        if (book.fields['Auteur(s)']) {
            fetchAuthors(book.fields['Auteur(s)']).then(res => {
                setAuthors(res)
            })
        }
        if (book.fields.Editeur) {
            fetchEditors(book.fields.Editeur).then(res => {
                setEditors(res)
            })
        }
    }, [])

    function fetchAuthors(authors) {
        return Promise.all(
            authors.map(async (author) => await (await fetch(base.apiUrl + 'Authors/' + author, base.headers)).json())
        )
    }

    function fetchEditors(editors) {
        return Promise.all(
            editors.map(async (editor) => await (await fetch(base.apiUrl + 'Editors/' + editor, base.headers)).json())
        )
    }

    return (
        <div className='flex lg:flex-row flex-col-reverse'>
            {console.log(book)}
            <div className='w-full lg:w-3/4'>
                <h1 className='text-3xl'>{book.fields.Titre}</h1>
                <div className='pt-1 flex justify-between items-center pr-10'>
                    <div className='flex gap-2'>
                        <small className='py-1 px-2 bg-slate-100 rounded text-slate-400'>
                            {book.fields.Statut}
                        </small>
                        {book.fields['Numérique'] === true ?
                            <small className='py-1 px-2 bg-violet-100 rounded text-violet-400'>Numérique</small> : ''}
                        {book.fields.Topic.map(topic => (
                            <small key={topic} className='py-1 px-2 bg-rose-100 rounded text-rose-400'>{topic}</small>
                        ))}
                    </div>
                    {book.fields['Où le trouver'] ? <CartIcon url={book.fields['Où le trouver']}/> : ''}
                </div>
                <div className='pt-10'>
                    <div>
                        Auteur{authors.length > 1 ? 's' : ''}: {authors.map(author => (
                        <span key={author.id}>{author.fields.Name}</span>
                    ))}
                    </div>
                    <div>
                        Editeur{authors.length > 1 ? 's' : ''}: {editors.map(editor => (
                        <span key={editor.id}>{editor.fields.Name}</span>
                    ))}
                    </div>
                </div>
            </div>
            <div className='w-full lg:w-1/4 mb-10 lg:mb-0'>
                <div className='square'>
                    <div className='block absolute w-full h-full top-0 left-0'>
                        <img src={url}
                             alt={book.fields.Titre}
                             className='w-full h-full object-contain object-center'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

const BookNotFound = () => {
    return (
        <div>
            <h1 className='text-8xl font-black mt-40 text-center text-slate-200'>Livre non trouvé</h1>
        </div>
    )
}

export default Book;


