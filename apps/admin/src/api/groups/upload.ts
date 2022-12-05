import request from '../request';
import { DTO, Media } from '../../typings';

export const upload = {
  upload(params: { file: File }) {
    const data = new FormData();
    data.append('file', params.file);
    return request<{
      url: string;
      key: string;
      mime: string;
      ext: string;
      storage: string;
    }>({
      url: 'api/upload',
      method: 'put',
      data,
    });
  },

  complete(data: { key: string; storage: string; mime: string; ext: string }) {
    return request<DTO<Media>>({
      url: 'api/upload/complete',
      method: 'post',
      data,
    });
  },
};
