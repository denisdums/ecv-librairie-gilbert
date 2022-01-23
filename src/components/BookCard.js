import React, {useEffect, useState} from "react";
import CartIcon from "./CartIcon";
import defaultCover from '../img/default.svg';


const BookCard = ({book}) => {
    const [url, setUrl] = useState([]);

    useEffect(() => {
        if (book.fields.Cover) {
            setUrl(book.fields.Cover[0].url)
        } else {
            setUrl(defaultCover)
        }
    }, [])

    return (
        <article className='shadow-sm bg-white p-6'>
            <div className='square w-full'>
                <a href={'/livre/' + book.id} className='block absolute w-full h-full top-0 left-0'>
                    <img src={url}
                         alt={book.fields.Titre}
                         className='w-full h-full object-contain object-center'/>
                </a>
            </div>
            <div className='p-4'>
                <h2 className='line-clamp-1'>{book.fields.Titre}</h2>
                <div className='pt-1 flex justify-between items-center'>
                    <small className='py-1 px-2 bg-slate-100 rounded text-slate-400'>
                        {book.fields.Statut}
                    </small>
                    {book.fields['Où le trouver'] ? <CartIcon url={book.fields['Où le trouver']}/> : ''}
                </div>
            </div>
        </article>
    )
}

export default BookCard;