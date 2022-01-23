import React, {useEffect, useState} from "react";
import base from "../helpers/Base";
import defaultCover from '../img/default.svg';

const AuthorCard = ({author}) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks().then(res => {
            setBooks(res)
        });
    }, [])

    function fetchBooks() {
        return Promise.all(
            author.fields.Books.map(async (book) => await (await fetch(base.apiUrl + 'Books/' + book, base.headers)).json())
        )
    }

    return (
        <article className='shadow-sm bg-white p-6'>
            <div className='square w-full'>
                <div className='block absolute w-full h-full top-0 left-0'>
                    <img src={defaultCover}
                         alt={author.fields.Name}
                         className='w-full h-full object-contain object-center'/>
                </div>
            </div>
            <div className='p-4'>
                <h2 className='line-clamp-1 text-lg font-semibold'>{author.fields.Name}</h2>
                <p>Ses livres:</p>
                <ul className='pt-1 list-disc'>
                    {books.map(book => (
                        <li key={book.id}>
                            <a href={'/livre/' + book.id}
                               className='text-sm text-slate-400 hover:text-slate-600 transition-all'>
                                {book.fields.Titre}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </article>
    )
}

export default AuthorCard;