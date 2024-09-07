import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '../../../utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState();
    const dispatch = useDispatch();
    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='min-h-screen uppercase text-[#000000] '>
            <Navbar />
            <div className='max-w-4xl mx-auto'>
                <div className='my-10'>
                    {/* <h1 className=' text-2xl text-[#00ADB5]'>Your Company Name</h1> */}
                    {/* <p className=' lowercase text-[#F4CE14]'>What would you like to give your company name? you can change this later.</p> */}
                </div>

                <Label className=' text-xl text-[#00ADB5]'>Company Name</Label>
                <Input
                    type="text"
                    className="my-2"
                    placeholder="Google, Microsoft etc."
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                <div className='flex items-center gap-2 my-10'>
                    <Button variant="outline" onClick={() => navigate("/admin/companies")} className='uppercase'>Cancel</Button>
                    <Button onClick={registerNewCompany} className='uppercase'>Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate