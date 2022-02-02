export function* sliceRawData(data: {}[], range: number) {
  let index = 0;
  let sliced_data: {}[] = [];
  while (true) {
    const data_fragment = data.slice(range * index, range * (index + 1));
    index++;
    yield [...sliced_data, ...data_fragment];
  }
}