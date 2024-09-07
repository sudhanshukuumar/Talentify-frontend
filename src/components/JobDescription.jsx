import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "../../utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true); // Update the local state
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          ); // Ensure the state is in sync with fetched data
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="min-h-screen max-w-6xl mx-auto text-[#ffffff] p-10">
      <div className="flex items-center justify-between mt-10">
        <div>
          <h1 className="text-4xl uppercase mb-10">{singleJob?.title}</h1>
          <div className="flex items-center gap-2 mt-4 ">
            <Badge className={"text-[#F4CE14]  uppercase text-xs bg-[#222831]"}>
              {singleJob?.position} Positions
            </Badge>
            <Badge className={"text-[#F97300]  uppercase text-xs bg-[#222831]"}>
              {singleJob?.jobType}
            </Badge>
            <Badge className={"text-[#06D001]  uppercase text-xs bg-[#222831]"}>
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-[#77D970] text-black font-bold cursor-not-allowed "
              : " bg-[#E7F0DC] font-bold text-black hover:bg-[#F4CE14] "
          }`}
        >
          {isApplied ? "ALREADY APPLIED" : "APPLY NOW"}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 py-6 text-lg text-[#ffffff]">
        JOB DESCRIPTION
      </h1>
      <div className="my-4 text-xl text-[#76ABAE]">
        <h1 className=" my-1">
          ROLE:{" "}
          <span className="pl-4  text-lg text-[#F5F7F8]">
            {singleJob?.title}
          </span>
        </h1>
        <h1 className=" my-1">
          LOCATION:{" "}
          <span className="pl-4  text-lg text-[#F5F7F8]">
            {singleJob?.location}
          </span>
        </h1>
        <h1 className=" my-1">
          DESCRIPTION:{" "}
          <span className="pl-4  text-lg text-[#F5F7F8]">
            {singleJob?.description}
          </span>
        </h1>
        <h1 className=" my-1">
          EXCPERIENCE:{" "}
          <span className="pl-4  text-lg text-[#F5F7F8]">
            {singleJob?.experienceLevel} yrs
          </span>
        </h1>
        <h1 className=" my-1">
          SALARY:{" "}
          <span className="pl-4  text-lg text-[#F5F7F8]">
            {singleJob?.salary} LPA
          </span>
        </h1>
        <h1 className=" my-1">
          TOTAL APPLICANTS:{" "}
          <span className="pl-4  text-lg text-[#F5F7F8]">
            {singleJob?.applications?.length} Applied
          </span>
        </h1>
        <h1 className="my-1">
          POSTED DATE:{" "}
          <span className="pl-4  text-[#FF6464]">
            {singleJob?.createdAt.split("T")[0]}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
