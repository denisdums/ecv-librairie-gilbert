import React, {useEffect, useState} from "react";
import base from "../helpers/Base";

const EditorCard = ({editor}) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        loadBooks().then(res => {
            setBooks(res)
        })
    }, [])

    async function loadBooks() {
        return Promise.all(
            editor.fields.Books.map(async (book) => await (await fetch(base.apiUrl + 'Books/' + book, base.headers)).json())
        )
    }

    return (
        <article className='flex gap-10 shadow-sm bg-white p-6'>
            <div className='p-4 w-10/12'>
                <h2 className='line-clamp-1 text-lg font-semibold'>{editor.fields.Name}</h2>
                <p>Leurs livres:</p>
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

export default EditorCard;