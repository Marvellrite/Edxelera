"use client"
import { ReactSVG } from 'react-svg';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'

const data = [
  {
    name: 'Mon',
    uv: 760,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Tue',
    uv: 450,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Wed',
    uv: 860,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Thur',
    uv: 240,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Fri',
    uv: 680,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Sat',
    uv: 590,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'sun',
    uv: 770,
    pv: 4300,
    amt: 2100,
  },
];

const BarChartComponent = () => {
  return (
    <section className=' bg-white rounded-2xl p-3.5 space-y-5  grow shrink ' style={{ flexBasis: "calc((632 / (632 + 496)) * 100%)" }}
>
        <div className='flex justify-between items-center'>
            <p className='text-lg'>User Enrollment</p>
            <div className=' rounded-full px-4 py-2 flex items-center gap-2 text-sm'>
                <span>This Week</span>
                <ReactSVG src='/icons/dropdown.svg' afterInjection={svg => svg.setAttribute('width', '14')} />
                
            </div>
        </div>
        <BarChart
            className='w-full h-[85%] aspect-video'
            responsive
            data={data}
            margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" style={{ fontSize: 12 }} />
            <YAxis width="auto" axisLine={false} tickLine={false} allowDecimals={false} ticks={[0, 200, 400, 600, 800, 1000]} style={{ fontSize: 12 }} />
            <Tooltip cursor={false} position={{ y: 0 }} />
            {/* <Legend /> */}
            {/* <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} /> */}
            <Bar dataKey="uv" fill="var(--color-primary)" radius={[100, 100, 0, 0]} barSize={50} isAnimationActive />
        </BarChart>
    </section>
  )
}

export default BarChartComponent