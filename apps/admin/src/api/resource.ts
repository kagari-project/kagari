import { ParamsWithPagination } from '../typings';
import $http from './request';

function buildIdUrl(basePath: string, id: string) {
  return basePath + '/' + id;
}

export default function resourceGenerator<Schema extends { id: string }>(
  basePath: string,
) {
  return {
    list(params?: ParamsWithPagination<Record<string, any>>) {
      return $http<{ list: Schema[]; total: number }>({
        method: 'get',
        url: basePath,
        params,
      }).then((res) => res.data);
    },
    getOne(id: string) {
      return $http<Schema>({
        method: 'get',
        url: buildIdUrl(basePath, id),
      }).then((res) => res.data);
    },
    createOne(data: Schema) {
      return $http<Schema>({
        method: 'put',
        url: basePath,
        data,
      }).then((res) => res.data);
    },
    updateOne(id: string, data: Schema) {
      return $http<Schema>({
        method: 'patch',
        url: buildIdUrl(basePath, id),
        data,
      }).then((res) => res.data);
    },
    deleteOne(instance: Schema) {
      return $http<Schema>({
        method: 'delete',
        url: buildIdUrl(basePath, instance.id),
      }).then((res) => res.data);
    },
  };
}
