import OverviewCard from "@/components/admin_and_instructors/ui/custom/overview-card";
import { Certificate, MoneyReceive, TeacherOutline } from "@/components/admin_and_instructors/icons/modified";

const Overview = () => {
  return (
        <section className=' '>
            <p className='text-lg'>Overview</p>
    
            <div className='flex *:grow justify-between gap-3 mt-3'>
                <OverviewCard icon={<MoneyReceive/>} title="Total Revenue" numbers={16487} change={4.9} initialVal={840000}/>
    
                <OverviewCard title="Active Learners" numbers={16487} icon={<TeacherOutline/>} initialVal={13892} change={4.9}/>
                              
                <OverviewCard title="Total Transactions" numbers={400} icon={<Certificate/>} initialVal={800} change={-4.9}/>
    
            </div>
        </section>
  )
}

export default Overview