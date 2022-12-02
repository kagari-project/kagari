import React, { useEffect, useState } from 'react';
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
import { media } from '../../api';
import config from '../../config';
import urlJoin from 'url-join';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import { SetDifference, SetComplement, Subtract } from 'utility-types';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';

function buildImageUrl(key: string) {
  return urlJoin(config.baseURL ?? '/', 'media', key);
}

export default function Gallery() {
  const [page, setPage] = useState();
  const [pageSize, setPageSize] = useState();
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState<Media[]>([]);

  async function handleCreate(form: Subtract<Media, Subtract<Media, BaseDTO>>) {
    console.log(form);
  }
  async function handleDelete(row: Media) {
    await media.deleteOne(row);
    await handleList();
  }
  async function handleList() {
    const res = await media.list();
    setItems(res.list);
    setTotal(res.total);
  }
  useEffect(() => {
    handleList();
  }, []);

  return (
    <Container sx={{ mt: 2, mb: 2 }}>
      <Stack
        component={Card}
        sx={{ mb: 1 }}
        justifyContent={'center'}
        alignItems={'end'}
      >
        <IconButton>
          <AddIcon />
        </IconButton>
      </Stack>
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
                    {item.id} {item.createdAt}
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small">Edit</Button>
                  <Button size="small" onClick={() => handleDelete(item)}>
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
