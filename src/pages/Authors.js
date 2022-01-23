import React, {useEffect, useState} from "react";
import base from "../helpers/Base";
import AuthorsList from "../components/AuthorsList";

function Authors() {
    const [authors, setAuthors] = useState([]);
    const [offsets, setOffsets] = useState(['0']);
    const [currentOffset, setCurrentOffset] = useState(['0']);

    useEffect(() => {
        fetchAuthors(offsets.at(-1));
    }, [])

    function nextFetch() {
        fetchAuthors(offsets[offsets.indexOf(currentOffset) + 1])
    }

    function previousFetch() {
        fetchAuthors(offsets[offsets.indexOf(currentOffset) - 1])
    }

    function fetchAuthors(offset) {
        setCurrentOffset(offset)
        let sorting = 'sort%5B0%5D%5Bfield%5D=Name'
        let request = base.apiUrl + 'Authors?maxRecords=' + base.maxRecords + sorting + '&view=' + base.authorsView + '&pageSize=' + base.pageSize + '&offset=' + offset;
        fetch(request, base.headers)
            .then(response => response.json())
            .then(json => {
                if (json.offset) {
                    offset = json.offset;
                    if (!offsets.includes(offset)) {
                        offsets.push(offset)
                    }
                } else {
                    offsets.push(false)
                }
                window.scrollTo(0, 0)
                setAuthors(json.records)
            })
            .catch(error => console.error(error))
    }

    return (
        <section>
            <h1 className='text-3xl font-bold'>Voici la liste de nos auteurs référencés</h1>
            <AuthorsList authors={authors}/>

            <div className='w-full flex items-center justify-center gap-10 py-10'>
                {offsets.indexOf(currentOffset) - 1 >= 0 ?
                    <button className='py-2 px-6 bg-slate-300 rounded hover:bg-slate-400 text-white transition-all'
                            onClick={previousFetch}>Précédent</button> : ''}
                {offsets[offsets.indexOf(currentOffset) + 1] !== false ?
                    <button className='py-2 px-6 bg-sky-300 rounded hover:bg-sky-400 text-white transition-all'
                            onClick={nextFetch}>Suivant</button> : ''}
            </div>
        </section>
    )
}

export default Authors;