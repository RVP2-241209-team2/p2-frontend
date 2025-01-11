import api from '../lib/axios';
import { UserRole } from '../types/users';

interface UserResponse {
    id: string;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    phoneNumber: string;
    role: UserRole;
}

interface MessageResponse {
    message: string;
}

// Mock data since we don't have a get all users endpoint yet
const mockUsers: UserResponse[] = [
    {
        id: "ac75707e-46c5-4432-b916-15cc2494e196",
        username: "admin",
        firstname: "Admin",
        lastname: "User",
        email: "admin@example.com",
        phoneNumber: "123-456-7890",
        role: UserRole.ADMIN
    },
    {
        id: "bc75707e-46c5-4432-b916-15cc2494e197",
        username: "customer1",
        firstname: "John",
        lastname: "Doe",
        email: "john@example.com",
        phoneNumber: "123-456-7891",
        role: UserRole.CUSTOMER
    },
    {
        id: "cc75707e-46c5-4432-b916-15cc2494e198",
        username: "store.owner",
        firstname: "Jane",
        lastname: "Smith",
        email: "jane@example.com",
        phoneNumber: "123-456-7892",
        role: UserRole.STORE_OWNER
    }
];

export const usersApi = {
    // Get all users
    async getUsers(): Promise<UserResponse[]> {
        // const { data } = await api.get('/users');
        // return data;
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockUsers;
    },

    // Delete user
    async deleteUser(userId: string): Promise<MessageResponse> {
        const { data } = await api.delete(`/users/${userId}`);
        return data;
    },

    // Update user role
    async updateUserRole(userId: string, role: UserRole): Promise<UserResponse> {
        const { data } = await api.patch(`/users/${userId}`, { role });
        return data;
    }
};