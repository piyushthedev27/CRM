'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { getDashboardStats } from './dashboard-actions.js';
import dynamic from 'next/dynamic';

// Lazy load ECharts
const ReactECharts = dynamic(
  () => import('echarts-for-react') as any,
  { ssr: false }
);

interface DashboardStats {
  leads: number;
  totalDeals: number;
  wonValue: number;
  lostValue: number;
  winRate: number;
  stageCounts: Record<string, number>;
}

interface StatCardProps {
  label: string;
  value: string | number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    getDashboardStats().then(setStats);
  }, []);

  if (!stats) return <p className="p-6">Loading...</p>;

  const { leads, totalDeals, wonValue, lostValue, winRate, stageCounts } = stats;

  const chartOptions = {
    tooltip: {},
    xAxis: {
      type: 'category' as const,
      data: Object.keys(stageCounts),
    },
    yAxis: {
      type: 'value' as const,
    },
    series: [
      {
        data: Object.values(stageCounts),
        type: 'bar' as const,
        name: 'Deals',
        itemStyle: {
          color: '#4f46e5',
        },
      },
    ],
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <StatCard label="Total Leads" value={leads} />
        <StatCard label="Total Deals" value={totalDeals} />
        <StatCard label="Won Deals Value" value={`₹${wonValue}`} />
        <StatCard label="Lost Deals Value" value={`₹${lostValue}`} />
        <StatCard label="Win Rate" value={`${winRate}%`} />
      </div>

      <div className="bg-white dark:bg-muted border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2">Deal Stage Breakdown</h3>
        <ReactECharts option={chartOptions} style={{ height: 300 }} {...({} as any)} />
      </div>
    </div>
  );
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <Card className="bg-muted/30 dark:bg-muted/40 shadow-sm">
      <CardContent className="p-4">
        <CardTitle className="text-sm text-muted-foreground">{label}</CardTitle>
        <div className="text-xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
