import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const stats = [
  {
    name: 'Toplam Ziyaretçi',
    stat: '12,458',
    previousStat: '11,234',
    change: '10.8%',
    changeType: 'increase',
  },
  {
    name: 'Aktif Duyuru',
    stat: '24',
    previousStat: '18',
    change: '33.3%',
    changeType: 'increase',
  },
  {
    name: 'Toplam İçerik',
    stat: '148',
    previousStat: '152',
    change: '2.6%',
    changeType: 'decrease',
  },
]

const chartData = {
  labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'],
  datasets: [
    {
      label: 'Ziyaretçi Sayısı',
      data: [1200, 1900, 1500, 2300, 2100, 2500],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
    },
  ],
}

const recentActivity = [
  {
    id: 1,
    type: 'duyuru',
    title: 'Yeni duyuru eklendi',
    description: 'İçme Suyu Projesi İhalesi hakkında duyuru',
    date: '30 dk önce',
  },
  {
    id: 2,
    type: 'sayfa',
    title: 'Sayfa güncellendi',
    description: 'Hakkımızda sayfası içeriği güncellendi',
    date: '2 saat önce',
  },
  {
    id: 3,
    type: 'kullanıcı',
    title: 'Yeni kullanıcı',
    description: 'Mehmet Yılmaz sisteme eklendi',
    date: '4 saat önce',
  },
]

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-blue-500 p-3">
                {item.changeType === 'increase' ? (
                  <ArrowUpIcon className="h-6 w-6 text-white" aria-hidden="true" />
                ) : (
                  <ArrowDownIcon className="h-6 w-6 text-white" aria-hidden="true" />
                )}
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
              <p
                className={classNames(
                  item.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                  'ml-2 flex items-baseline text-sm font-semibold'
                )}
              >
                {item.change}
              </p>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Grafik */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Ziyaretçi İstatistikleri</h2>
          <div className="h-80">
            <Line
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Son Aktiviteler */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Son Aktiviteler</h2>
          <div className="flow-root">
            <ul role="list" className="-mb-8">
              {recentActivity.map((activity, activityIdx) => (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {activityIdx !== recentActivity.length - 1 ? (
                      <span
                        className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span
                          className={classNames(
                            'bg-blue-500',
                            'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                          )}
                        >
                          <span className="text-white text-sm">
                            {activity.type.charAt(0).toUpperCase()}
                          </span>
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-sm text-gray-500">
                            {activity.title}{' '}
                            <span className="font-medium text-gray-900">
                              {activity.description}
                            </span>
                          </p>
                        </div>
                        <div className="whitespace-nowrap text-right text-sm text-gray-500">
                          {activity.date}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
