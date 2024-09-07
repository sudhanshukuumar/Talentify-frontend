import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <div onClick={()=> navigate(`/description/${job._id}`)} className='p-5 rounded-xl shadow-xl bg-[#454c55] hover:bg-[#3e454d]  cursor-pointer  '>
            <div>
                <h1 className='text-2xl text-[#EEEDEB] uppercase'>{job?.company?.name}</h1>
                <p className=' text-xs text-[#F9ED69]'>India</p>
            </div>
            <div>
                <h1 className=' text-[#DDE6ED] text-md my-2 uppercase'>{job?.title}</h1>
                <p className='text-sm text-[#EEEEEE]'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-[#F4CE14]   text-xs bg-[#222831] uppercase '} >{job?.position} Positions</Badge>
                <Badge className={'text-[#F97300] text-xs bg-[#222831] uppercase'} >{job?.jobType}</Badge>
                <Badge className={'text-[#06D001] text-xs bg-[#222831] uppercase'} >{job?.salary} LPA</Badge>
            </div>

        </div>
    )
}

export default LatestJobCards