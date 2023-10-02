import { AxiosServices } from './axios';

const axiosServices = AxiosServices.getInstance();

export const RoomServices = {
  list: async (): Promise<any> => {
    const rooms = await axiosServices.get<any>('/rooms');
    return rooms;
  },
  getById: async (id: string): Promise<any> => {
    const room = await axiosServices.get<any>(`/rooms/${id}`);
    const messages = await axiosServices.get<any>(`/rooms/${id}/messages`);
    return { ...room, messages };
  }
};
