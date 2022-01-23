import React from "react";
import AuthorCard from "./AuthorCard";

const AuthorList = ({authors}) => {
    return (
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-10 py-10'>{
            authors.map(author => (
                <AuthorCard key={author.id} author={author}/>
            ))}
        </div>
    )
}

export default AuthorList;


