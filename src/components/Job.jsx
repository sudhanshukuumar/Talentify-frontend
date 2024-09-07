import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();
  // const jobId = "lsekdhjgdsnfvsdkjf";

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="p-5 rounded-lg shadow-xl bg-[#454c55]">
      <div className="flex items-center justify-between">
        <p className="text-md  text-[#E3FDFD]">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="text-xl text-[#E3FDFD] uppercase">
            {job?.company?.name}
          </h1>
          <p className="text-xs text-[#E3FDFD]">India</p>
        </div>
      </div>

      <div>
        <h1 className=" text-sm my-2 text-[#E3FDFD] uppercase">{job?.title}</h1>
        <p className="text-sm text-[#E3FDFD]">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-[#F4CE14]  text-xs bg-[#2f3640] uppercase"}>
          {job?.position} Positions
        </Badge>
        <Badge className={"text-[#F97300]  text-xs bg-[#2f3640] uppercase"}>
          {job?.jobType}
        </Badge>
        <Badge className={"text-[#06D001]  text-xs bg-[#2f3640] uppercase"}>
          {job?.salary} LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4 text-xl ">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          className="bg-[#63717d] text-[#F5F7F8] hover:bg-[#3a4049]   font-bold"
        >
          DETAILS
        </Button>
        {/* <Button className="bg-[#7209b7]">Save For Later</Button> */}
      </div>
    </div>
  );
};

export default Job;
