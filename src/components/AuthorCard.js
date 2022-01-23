import React, {useEffect, useState} from "react";


const AuthorCard = ({author}) => {
    return (
        <div>
            {console.log(author)}
            {author.fields.Name}
        </div>
    )
}

export default AuthorCard;