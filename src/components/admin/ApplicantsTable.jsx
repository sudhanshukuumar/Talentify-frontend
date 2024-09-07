import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '../../../utils/constant';
import axios from 'axios';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        console.log('called');
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            console.log(res);
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div>
            <Table>
                <TableCaption className="uppercase">A list of your recent applied user</TableCaption>
                <TableHeader>
                    <TableRow className='hover:bg-[#393E46]'>
                        <TableHead  className="text-lg text-[#00ADB5]">FULL NAME</TableHead>
                        <TableHead className="text-lg text-[#00ADB5]">EMAIL ID</TableHead>
                        <TableHead className="text-lg  text-[#00ADB5]">CONTACT NO</TableHead>
                        <TableHead className="text-lg  text-[#00ADB5]">RESUME</TableHead>
                        <TableHead className="text-lg  text-[#00ADB5]">DATE</TableHead>
                        <TableHead className="text-lg  text-[#00ADB5] text-right">ACTION</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((item) => (
                            <tr key={item._id}>
                                <TableCell className="text-md uppercase text-[#DBE2EF] ">{item?.applicant?.fullname}</TableCell>
                                <TableCell className="text-md uppercase text-[#DBE2EF] ">{item?.applicant?.email}</TableCell>
                                <TableCell className="text-md uppercase text-[#DBE2EF] ">{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell >
                                    {
                                        item.applicant?.profile?.resume ? <a className="text-[#F4CE14] text-md cursor-pointer uppercase" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a> : <span>NA</span>
                                    }
                                </TableCell>
                                <TableCell className="text-md uppercase text-[#DBE2EF] ">{item?.applicant.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-md uppercase text-[#DBE2EF]  float-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            {
                                                shortlistingStatus.map((status, index) => {
                                                    return (
                                                        <div onClick={() => statusHandler(status, item?._id)} key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                                                            <span>{status}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </PopoverContent>
                                    </Popover>

                                </TableCell>

                            </tr>
                        ))
                    }

                </TableBody>

            </Table>
        </div>
    )
}

export default ApplicantsTable