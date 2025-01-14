import { useEffect, useState } from "react";
import { UserTable } from "../../components/admin/user-table";
import { User } from "../../types/users";
import { AlertCircle } from "lucide-react";
import { usersApi } from "../../service/users";
import { toast } from "sonner";

export default function ManageUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteUser = async (userId: string) => {
    try {
      await usersApi.deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
      toast.success("User deleted successfully");
    } catch (err) {
      console.error("Failed to delete user:", err);
      toast.error("Failed to delete user");
    }
  };

  const handlePromoteUser = async (userId: string) => {
    try {
      const updatedUser = await usersApi.updateUserRole(userId, "STORE_OWNER");
      setUsers(users.map((user) => (user.id === userId ? updatedUser : user)));
      toast.success("User promoted successfully");
    } catch (err) {
      console.error("Failed to promote user:", err);
      toast.error("Failed to promote user");
    }
  };

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        console.log("Stored user:", JSON.parse(storedUser || "{}"));
        console.log("Current auth state:", {
          user: JSON.parse(localStorage.getItem("user") || "{}"),
          token: localStorage.getItem("token"),
        });

        setLoading(true);
        const data = await usersApi.getUsers();
        setUsers(data);
      } catch (err) {
        console.error("Failed to load users:", err);
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  if (loading) {
    return <ProductsSkeleton />;
  }
  if (error) {
    return (
      <div className="flex justify-center items-center">
        <AlertCircle className="w-5 h-5" />
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Users</h1>
        <p className="text-gray-600 text-lg">View and manage user accounts</p>
      </div>
      <UserTable
        users={users}
        onDeleteUser={handleDeleteUser}
        onPromoteUser={handlePromoteUser}
      />
    </div>
  );
}

const ProductsSkeleton = () => (
  <div className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
    <div className="h-7 w-40 bg-gray-200 rounded mb-4" />
    <div className="overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b">
            <th className="px-6 py-3">Product</th>
            <th className="px-6 py-3">Category</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, i) => (
            <tr key={i} className="border-b last:border-0">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg" />
                  <div className="h-4 w-32 bg-gray-200 rounded" />
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-24 bg-gray-200 rounded" />
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-16 bg-gray-200 rounded" />
              </td>
              <td className="px-6 py-4 text-right">
                <div className="h-4 w-12 bg-gray-200 rounded ml-auto" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="flex items-center justify-between mt-4 pt-4 border-t">
      <div className="h-4 w-48 bg-gray-200 rounded" />
      <div className="flex gap-2">
        <div className="w-9 h-9 bg-gray-200 rounded-lg" />
        <div className="w-9 h-9 bg-gray-200 rounded-lg" />
      </div>
    </div>
  </div>
);
