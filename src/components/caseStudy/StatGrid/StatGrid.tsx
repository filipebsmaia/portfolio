import { Code2, HardDrive, Server, Users } from 'lucide-react';
import styles from './StatGrid.module.sass';

export interface StatData {
  id: string;
  value: string;
  label: string;
  detail?: string;
  icon: string;
}

const iconMap: Record<string, React.ReactNode> = {
  Users: <Users size={20} />,
  Server: <Server size={20} />,
  HardDrive: <HardDrive size={20} />,
  Code2: <Code2 size={20} />,
};

interface StatGridProps {
  stats: StatData[];
  asOf?: string;
}

export function StatGrid({ stats, asOf }: StatGridProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {stats.map((stat) => (
          <div key={stat.id} className={styles.card}>
            <span className={styles.icon}>{iconMap[stat.icon]}</span>
            <div>
              <p className={styles.value}>{stat.value}</p>
              <p className={styles.label}>{stat.label}</p>
              {stat.detail && <p className={styles.detail}>{stat.detail}</p>}
            </div>
          </div>
        ))}
      </div>
      {asOf && <p className={styles.asOf}>{asOf}</p>}
    </div>
  );
}
