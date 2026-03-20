import { ListingStatus, STATUS_COLORS } from '../../data/mockData';

interface StatusBadgeProps {
  status: ListingStatus;
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full ${sizeClasses} ${STATUS_COLORS[status]}`}
      style={{ fontWeight: 600 }}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          status === 'Available' ? 'bg-green-500' :
          status === 'Reserved' ? 'bg-amber-500' :
          status === 'Sold' ? 'bg-gray-400' :
          'bg-red-500'
        }`}
      />
      {status}
    </span>
  );
}
