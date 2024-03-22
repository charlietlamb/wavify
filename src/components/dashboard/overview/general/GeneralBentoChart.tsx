import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
const data = [
  {
    goal: 400,
    date: '20th Mar',
  },
  {
    goal: 300,
    date: '21st Mar',
  },
  {
    goal: 200,
    date: '22nd Mar',
  },
  {
    goal: 300,
    date: '23rd Mar',
  },
  {
    goal: 200,
    date: '24th Mar',
  },
  {
    goal: 278,
    date: '25th Mar',
  },
  {
    goal: 189,
    date: '26th Mar',
  },
  {
    goal: 239,
    date: '27th Mar',
  },
  {
    goal: 300,
    date: '28th Mar',
  },
  {
    goal: 200,
    date: '29th Mar',
  },
]

export default function GeneralBentoChart() {
  return (
    <div className="flex h-full min-h-[450px] w-full flex-col gap-y-2 rounded-md border border-zinc-700 p-4 transition hover:border-zinc-200 md:min-h-[250px]">
      <h3 className=" text-2xl font-semibold">Overview</h3>
      <ResponsiveContainer className="h-full w-full flex-grow" height="100%">
        <BarChart data={data}>
          <Bar
            dataKey="goal"
            style={
              {
                fill: '#E4E4E7',
                opacity: 0.9,
              } as React.CSSProperties
            }
          />
          <XAxis dataKey="date" className="text-sm" />
          <YAxis className="text-sm" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
