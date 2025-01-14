import api from "../lib/axios";
import { User, UserRole } from "../types/users";

type UserResponse = User;

interface MessageResponse {
  message: string;
}

export const usersApi = {
  // Get all users
  async getUsers(): Promise<UserResponse[]> {
    const { data } = await api.get("/v1/users/all");
    return data;
  },

  // Delete user
  async deleteUser(userId: string): Promise<MessageResponse> {
    const { data } = await api.delete(`/v1/users/${userId}`);
    return data;
  },

  // Update user role
  async updateUserRole(userId: string, role: UserRole): Promise<UserResponse> {
    const { data } = await api.patch(`/v1/users/${userId}`, { role });
    return data;
  },
};
