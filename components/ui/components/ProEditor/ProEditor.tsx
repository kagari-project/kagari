import React, { useRef } from 'react';
import { Editor, IAllProps } from '@tinymce/tinymce-react';
import { ControllerRenderProps } from 'react-hook-form/dist/types/controller';

export type ProEditorProps = IAllProps & {
  onChange?: ControllerRenderProps['onChange'];
  onBlur?: ControllerRenderProps['onBlur'];
  value?: ControllerRenderProps['value'];
};

export const ProEditor = React.forwardRef<unknown, ProEditorProps>(
  ({ onChange, value, ...props }) => {
    const editorRef = useRef(null);
    return (
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        init={{
          height: 500,
        }}
        {...props}
        onEditorChange={onChange}
        value={value}
      />
    );
  },
);
