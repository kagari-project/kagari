import React, { useEffect, useRef, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import Container from '@mui/material/Container';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { BaseDTO, DTO, Media } from '../../typings';
import * as api from '../../api';
import config from '../../config';
import urlJoin from 'url-join';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import { SetDifference, SetComplement, Subtract } from 'utility-types';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import { ProModal } from '@kagari/ui/components/ProModal';
import { CreationForm } from './CreationForm';

function buildImageUrl(key: string) {
  return urlJoin(config.baseURL ?? '/', 'media', key);
}

export default function Gallery() {
  const [page, setPage] = useState();
  const [pageSize, setPageSize] = useState();
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState<Media[]>([]);
  const modalRef = useRef<any>();
  const formRef = useRef<any>();

  async function handleCreate(form: unknown) {
    const { files } = form as { files: File[] };
    await Promise.all(
      files.map(async (file) => {
        const res = await api.upload.upload({ file });
        const done = await api.upload.complete({
          key: res.data.key,
          ext: res.data.ext,
          mime: res.data.mime,
          storage: res.data.storage,
        });
        return done.data;
      }),
    );
    await handleList();
    modalRef.current.handleClose();
  }
  async function handleDelete(row: Media) {
    await api.media.deleteOne(row);
    await handleList();
  }
  async function handleList() {
    const res = await api.media.list();
    setItems(res.list);
    setTotal(res.total);
  }

  async function onCreateButtonClick() {
    modalRef.current.handleOpen();
  }
  async function onEditButtonClick(item: DTO<Media>) {
    modalRef.current.handleOpen();
  }
  useEffect(() => {
    handleList();
  }, []);

  return (
    <Container sx={{ mt: 2, mb: 2 }}>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        onClick={onCreateButtonClick}
      >
        <AddIcon />
      </Fab>
      <Box component={Paper} sx={{ mb: 2, padding: 2 }}>
        <Grid container spacing={2}>
          {items.map((item) => (
            <Grid key={item.id} xs={6} md={4}>
              <Card>
                <CardActionArea
                  onClick={() => window.open(buildImageUrl(item.key))}
                >
                  <CardMedia
                    component="img"
                    height="200px"
                    image={buildImageUrl(item.key)}
                  />
                  <CardContent>
                    <Box>{item.id}</Box>
                    <Box>{item.createdAt}</Box>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" onClick={() => handleDelete(item)}>
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <ProModal ref={modalRef}>
        <CreationForm ref={formRef} handleCreate={handleCreate} />
      </ProModal>
    </Container>
  );
}
