#### Type for `left` and `right`
| Name       | Required | Description                      | type                                                                                |
|------------|----------|----------------------------------|-------------------------------------------------------------------------------------|
| loadMore   | true     | load list function               | `(page?: number, pageSize?: number) => Promise<{ list: unknown[], total: number }>` |
| render     | true     | render a list item               |                                                                                     |
| searchable | false    | if searchable(filter in browser) | `boolean`                                                                           |
| filter     | false    | a filter function                | `boolean`                                                                           |
| title      | false    | a title above list               | `string`                                                                            |
