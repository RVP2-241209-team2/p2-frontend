import { useState } from "react";
import { User, UserRole } from "../../types/users";
import { Trash2, UserCog } from "lucide-react";

interface UserTableProps {
  users: User[];
  onDeleteUser: (userId: string) => void;
  onPromoteUser: (userId: string) => void;
}

type ConfirmAction = {
  userId: string;
  type: "delete" | "promote";
} | null;

export function UserTable({
  users,
  onDeleteUser,
  onPromoteUser,
}: UserTableProps) {
  const [confirm, setConfirm] = useState<ConfirmAction>(null);

  // todo: empty state
  if (!users || users.length === 0) return null;

  const handleAction = (userId: string, type: "delete" | "promote") => {
    if (type === "delete") {
      onDeleteUser(userId);
    } else {
      onPromoteUser(userId);
    }
    setConfirm(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Username
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {user.firstname} {user.lastname}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{user.username}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.role === UserRole.CUSTOMER
                      ? "bg-purple-100 text-purple-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                  {confirm?.userId === user.id ? (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleAction(user.id, confirm.type)}
                        className="text-red-600 hover:text-red-900 text-xs font-semibold"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setConfirm(null)}
                        className="text-gray-600 hover:text-gray-900 text-xs font-semibold"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      {user.role === UserRole.ADMIN && (
                        <button
                          onClick={() =>
                            setConfirm({ userId: user.id, type: "promote" })
                          }
                          className="text-purple-600 hover:text-purple-900"
                          title="Promote to Manager"
                        >
                          <UserCog className="h-5 w-5" />
                        </button>
                      )}
                      <button
                        onClick={() =>
                          setConfirm({ userId: user.id, type: "delete" })
                        }
                        className="text-red-600 hover:text-red-900"
                        title="Delete User"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
