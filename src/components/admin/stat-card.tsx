import { ArrowUpRight } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, change, icon }: StatCardProps) => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <span className="text-gray-500 text-sm">{title}</span>
      <div className="p-2 bg-amber-100 rounded-lg">{icon}</div>
    </div>
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-2xl font-bold">{value}</h3>
        <div className="flex items-center gap-1 text-green-600 text-sm">
          <ArrowUpRight size={16} />
          <span>{change}</span>
        </div>
      </div>
    </div>
  </div>
);

export default StatCard;
