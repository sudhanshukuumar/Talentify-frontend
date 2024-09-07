import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const {allAppliedJobs} = useSelector(store=>store.job);
    return (
        <div className='bg-[#4a515b] rounded-lg '>
            <Table>
                {/* <TableCaption className='text-[#F8EDED] text-xs mb-5'>A list of your applied jobs</TableCaption> */}
                <TableHeader >
                    <TableRow  className='uppercase'>
                        <TableHead className='text-[#F4CE14] '>Date</TableHead>
                        <TableHead className='text-[#F4CE14]  '>Job Role</TableHead>
                        <TableHead className='text-[#F4CE14]  '>Company</TableHead>
                        <TableHead className='text-[#F4CE14]  text-center '>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length <= 0 ? <span className='flex m-5' >You haven't applied for any job yet.</span> : allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id} className='uppercase '>
                                <TableCell  >{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell>{appliedJob.job?.title}</TableCell>
                                <TableCell>{appliedJob.job?.company?.name}</TableCell>
                                <TableCell className="text-center"><Badge className={`${appliedJob?.status === "rejected" ? 'bg-[#A91D3A]' : appliedJob.status === 'pending' ? 'bg-[#F4A442] text-black' : 'bg-green-400 '}`}>{appliedJob.status.toUpperCase()}</Badge></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable