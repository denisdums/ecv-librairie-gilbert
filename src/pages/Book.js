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
    useEffect(() => {
        if (book.fields.Cover) {
            setUrl(book.fields.Cover[0].url)
        } else {
            setUrl(defaultCover)
        }
    }, [])
    return (
        <div className='flex lg:flex-row flex-col-reverse'>
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
                            <small className='py-1 px-2 bg-rose-100 rounded text-rose-400'>{topic}</small>
                        ))}
                    </div>
                    {book.fields['Où le trouver'] ? <CartIcon url={book.fields['Où le trouver']}/> : ''}
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
            {console.log(book)}
        </div>
    )
}

const BookNotFound = () => {
    return (
        <div>
            <h1 className='text-8xl font-black mt-40 text-center text-slate-200'>Book not found</h1>
        </div>
    )
}

export default Book;


