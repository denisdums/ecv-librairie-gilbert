import React from "react";
import EditorCard from "./EditorCard";

const EditorsList = ({editors}) => {
    return (

        <div className='grid grid-cols-1 gap-4 lg:gap-10 py-10'>
            {editors.map(editor => (
                    <EditorCard key={editor.id} editor={editor}/>
                ))
            }
        </div>
    )
}

export default EditorsList;


