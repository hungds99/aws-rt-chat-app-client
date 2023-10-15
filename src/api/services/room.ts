import axiosClient from "../axios";

export const RoomServices = {
  list: async (): Promise<any> => {
    const rooms = await axiosClient.get<any>("/rooms");
    return rooms;
  },
  getById: async (id: string): Promise<any> => {
    const room = await axiosClient.get<any>(`/rooms/${id}`);
    const messages = await axiosClient.get<any>(`/rooms/${id}/messages`);
    return { ...room, messages };
  },
};
