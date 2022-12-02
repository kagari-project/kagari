import React, { useEffect, useRef, useState } from 'react';
import { useFormContext, UseFormRegisterReturn } from 'react-hook-form';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ErrorIcon from '@mui/icons-material/Error';
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

export type IFile = File & {
  url?: string;
  ext?: string;
  mime?: string;
  isLoading?: boolean;
};
type UploadHandler = (file: IFile) => Promise<void>;

function createPreview(file: IFile) {
  if (file) {
    if (file.url) {
      return file.url;
    }
  }
  return URL.createObjectURL(file);
}

const PreviewBoxStyles = {
  height: 100,
  width: 100,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 1,
  margin: 0.5,
  border: 'solid 1px #e6e6e6',
  position: 'relative',
  '& button': {
    display: 'none',
    background: '#fff',
    '&:hover': {
      background: '#fff',
    },
  },
  '& .progress': {
    display: 'inherit',
  },
  '&:hover': {
    button: {
      display: 'inherit',
    },
  },
};

export type ProUploadProps = {
  accept?: string[];
  multiple?: boolean;
  upload?: UploadHandler;
} & UseFormRegisterReturn<any>;

export function ImageItem(props: {
  file: IFile;
  click: React.MouseEventHandler;
  remove: CallableFunction;
  upload: UploadHandler;
}) {
  const [error, setError] = useState(false);
  const [stage, setStage] = useState<'idle' | 'uploading' | 'error'>('idle');
  const { file, click, remove, upload } = props;
  async function handleUpload() {
    if (typeof upload === 'function' && stage !== 'uploading') {
      try {
        setStage('uploading');
        await upload(file);
        setStage('idle');
      } catch (e) {
        setStage('error');
        throw e;
      }
    }
  }
  function handleError(e) {
    setError(true);
  }
  function handleLoad() {
    setError(false);
  }

  useEffect(() => {
    handleUpload();
  }, []);
  return (
    <Tooltip title={file.name}>
      <Box sx={PreviewBoxStyles}>
        {error ? <Typography>No Preview</Typography> : null}
        <img
          onLoad={handleLoad}
          onError={handleError}
          onClick={click}
          src={createPreview(file)}
          alt=""
          style={{ height: 100, cursor: 'pointer', zIndex: 1 }}
        />
        {stage === 'idle' ? (
          <IconButton
            sx={{ position: 'absolute', zIndex: 2 }}
            onClick={() => remove(file)}
          >
            <DeleteIcon />
          </IconButton>
        ) : null}
        {stage === 'uploading' ? (
          <IconButton
            className="progress"
            sx={{ position: 'absolute', zIndex: 1, display: 'inherit' }}
          >
            <CircularProgress />
          </IconButton>
        ) : null}
        {stage === 'error' ? (
          <IconButton sx={{ position: 'absolute', zIndex: 2 }}>
            <ErrorIcon />
          </IconButton>
        ) : null}
      </Box>
    </Tooltip>
  );
}

export const ProUpload = React.forwardRef<HTMLInputElement, ProUploadProps>(
  (props, ref) => {
    const { accept = [], multiple = true, upload, onChange, name } = props;
    const [files, setFiles] = useState<IFile[]>([]);
    const inputRef = useRef<HTMLInputElement | null>();
    const { setValue } = useFormContext();

    function handleClick() {
      inputRef.current?.click();
    }
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const newFiles = Array.from(e.target.files);
      const merged = [...files, ...newFiles];
      setFiles(merged);
      setValue(name, merged);
      onChange(e);

      if (upload) {
        newFiles.map(upload);
      }
    }
    function handleRemove(file: IFile) {
      const i = files.indexOf(file);
      if (i >= 0) {
        const removed = [...files];
        removed.splice(i, 1);
        setFiles(removed);
        setValue(name, removed);
      }
    }

    function renderEmptyList() {
      return (
        <Box onClick={handleClick} sx={PreviewBoxStyles}>
          <AddIcon
            fontSize="large"
            sx={{ height: 40, width: 40, cursor: 'pointer' }}
          />
        </Box>
      );
    }

    function renderFiles() {
      return (
        <>
          {files.map((file, i) => (
            <ImageItem
              key={i}
              file={file}
              click={handleClick}
              remove={handleRemove}
              upload={upload}
            />
          ))}
          {multiple ? renderEmptyList() : null}
        </>
      );
    }

    return (
      <Box>
        <input
          ref={inputRef}
          type="file"
          style={{ display: 'none' }}
          onChange={handleChange}
          multiple={multiple}
          accept={accept.join(',')}
        />
        <Stack justifyContent="start" alignItems="center" direction="row">
          {files.length === 0 ? renderEmptyList() : renderFiles()}
        </Stack>
      </Box>
    );
  },
);
