import { createEffect, createStore, createEvent } from 'effector';
import type { TemperatureOption } from '@/types/Global';

const temperatureStore = createStore<TemperatureOption[]>([]);
const editTemperature = createEvent<TemperatureOption>();
const addNewTemperature = createEvent<string>();
const deleteTemperature = createEvent<string>();

const getTemperatureFx = createEffect(async () => {
  const data: TemperatureOption[] = [];

  if (!localStorage.getItem('tableData')) {
    localStorage.setItem('tableData', JSON.stringify(data));
  } else {
    const json = await JSON.parse(localStorage.getItem('tableData') || '[]');
    data.push(...json);
  }

  return data || [];
});

temperatureStore.on(getTemperatureFx.doneData, (_, payload) => {
  return payload;
});

temperatureStore.on(addNewTemperature, (state, payload) => {
  const item = {
    id: getRandomString(),
    temperature: payload,
  };
  const data = [item, ...state];
  localStorage.setItem('tableData', JSON.stringify(data));

  return data;
});

temperatureStore.on(deleteTemperature, (state, payload) => {
  const itemIndex = state.findIndex((item) => item.id === payload);

  state.splice(itemIndex, 1);

  const data = [...state];
  localStorage.setItem('tableData', JSON.stringify(data));

  return data;
});

temperatureStore.on(editTemperature, (state, payload) => {
  const itemIndex = state.findIndex((item) => item.id === payload.id);

  state[itemIndex] = payload;

  const data = [...state];
  localStorage.setItem('tableData', JSON.stringify(data));

  return data;
});

export const temperatureApi = {
  temperatureStore,
  getTemperatureFx,
  addNewTemperature,
  deleteTemperature,
  editTemperature,
};
