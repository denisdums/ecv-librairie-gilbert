import React from "react";
import BookCard from "./BookCard";

const BookList = ({books}) => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-10 py-10'>{
            books.map(book => (
                <BookCard key={book.id} book={book}/>
            ))}
        </div>
    )
}

export default BookList;


