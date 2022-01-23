import React, {useEffect, useState} from "react";
import BookList from "../components/BookList";
import base from "../helpers/Base";

function Home() {
    const [books, setBooks] = useState([]);
    const [offsets, setOffsets] = useState(['0']);
    const [currentOffset, setCurrentOffset] = useState(['0']);

    useEffect(() => {
        fetchBooks(offsets.at(-1));
    }, [])

    function nextFetch() {
        fetchBooks(offsets[offsets.indexOf(currentOffset) + 1])
    }

    function previousFetch() {
        fetchBooks(offsets[offsets.indexOf(currentOffset) - 1])
    }

    function fetchBooks(offset) {
        setCurrentOffset(offset)
        let request = base.apiUrl + 'Books?maxRecords=' + base.maxRecords + '&view=' + base.booksView + '&pageSize=' + base.pageSize + '&offset=' + offset;
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
                setBooks(json.records)
            })
            .catch(error => console.error(error))
    }

    return (
        <section>
            <BookList books={books}/>

            <div className='w-full flex items-center justify-center gap-10 py-10'>
                {offsets.indexOf(currentOffset) - 1 >= 0 ?
                    <button className='py-2 px-6 bg-slate-300 rounded hover:bg-slate-400 text-white transition-all'
                            onClick={previousFetch}>Previous</button> : ''}
                {offsets[offsets.indexOf(currentOffset) + 1] !== false ?
                    <button className='py-2 px-6 bg-sky-300 rounded hover:bg-sky-400 text-white transition-all'
                            onClick={nextFetch}>Next</button> : ''}
            </div>
        </section>
    )
}

export default Home;