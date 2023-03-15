import React, { useRef } from 'react'
import {Editor, IAllProps} from "@tinymce/tinymce-react";

export type ProEditorProps = IAllProps

export function ProEditor(props: ProEditorProps) {
    const editorRef = useRef(null);
    return <Editor
        onInit={(evt, editor) => editorRef.current = editor}
        init={{
            height: 500,
        }}
        {...props}
    />
}
