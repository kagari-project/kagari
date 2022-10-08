export function deserialize(data: Record<string, unknown>) {
  return Object.keys(data)
    .map((key) => `${key}=${data[key]}`)
    .join('&');
}
