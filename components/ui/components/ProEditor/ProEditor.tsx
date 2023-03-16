import React, { useRef } from 'react'
import {Editor, IAllProps} from "@tinymce/tinymce-react";
import {useFormContext, UseFormRegisterReturn} from "react-hook-form";

export type ProEditorProps = IAllProps & Partial<UseFormRegisterReturn>

export const ProEditor = React.forwardRef<unknown, ProEditorProps>((props, ref) => {
    const editorRef = useRef(null);
    const { setValue, formState } = useFormContext();
    const onEditorChange = (a: string) => {
        setValue(props.name, a)
    }

    return <Editor
        onInit={(evt, editor) => editorRef.current = editor}
        init={{
            height: 500,
        }}
        {...props}
        initialValue={formState.defaultValues[props.name]}
        onEditorChange={onEditorChange}
    />
})
