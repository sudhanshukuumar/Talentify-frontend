import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '../../../utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const {loading,user} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();    //formdata object
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
            dispatch(setLoading(false));
        }
    }

    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
    return (
        <div className='min-h-screen'>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto uppercase '>
                <form onSubmit={submitHandler} className='w-1/2  bg-[#4a515b] rounded-xl p-8 my-7 shadow-xl'>
                    <h1 className=' text-2xl mb-5 flex text-[#F5EDED] justify-center'>Sign Up</h1>
                    <div className='mb-4 font-bold   text-[#F5EDED] '>
                        <Label className=' my-2 text-sm '>Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="Your Name"
                            className="cursor-pointer text-black bg-[#E2DAD6]"
                        />
                    </div>
                    <div className='mb-4 font-bold   text-[#F5EDED] '>
                        <Label className=' my-2 text-sm '>Email id</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="xyz@gmail.com"
                            className="cursor-pointer text-black bg-[#E2DAD6]"
                        />
                    </div>
                    <div className='mb-4 font-bold   text-[#F5EDED] '>
                        <Label className=' my-2 text-sm '>Phone Number</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="1234567890"
                            className="cursor-pointer text-black bg-[#E2DAD6]"
                        />
                    </div>
                    <div className='mb-4 font-bold   text-[#F5EDED] '>
                        <Label className=' my-2 text-sm '>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="***********"
                            className="cursor-pointer text-black bg-[#E2DAD6]"
                        />
                    </div>
                    <div className='flex items-center justify-between mb-4  text-[#F5EDED] '>
                        <RadioGroup className="flex items-center gap-4 my-5 text-xs">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer "
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div className='flex items-center gap-2'>
                            {/* <Label className=' my-1 text-md  text-[#F5EDED]'>Profile</Label> */}
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer text-black bg-[#F7DCB9]"
                            />
                        </div>
                    </div>
                    {
                          loading ? <Button className="w-full "> <Loader2 className='mr-2 h-4 w-4 animate-spin uppercase' /> Please wait </Button> : <Button type="submit" className="w-full uppercase">Signup</Button>
                    }
                    <span className='text-xs text-white'>Already have an account? <Link to="/login" className='text-[#F97300] font-bold'>Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup