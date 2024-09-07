import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { filterJobs, setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  console.log(query+query);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className=" mx-auto px-4 py-2 rounded-full bg-[#3d4e6c] text-[#EEEEEE] text-sm uppercase font-medium ">
          Empowering Your Next Career Move
        </span>
        <h1 className="text-5xl  text-[#FF8225]">
        TALENT<span className="text-[#EEEEEE]">IFY
            <br/> 
            <span className="text-[#7AB2B2] text-xl uppercase"> Unleash Your Potential
                </span>
          </span>
        </h1>
        <p className="text-[#EEF7FF] text-lg">
          The #1 Destination for Top Talent and Dream Jobs!
        </p>
        <div
          className="flex w-[40%] border pl-4  rounded-full items-center gap-4 mx-auto bg-white text-black"
          style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.5)" }}
        >
          <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full'

                    />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-[#008170] hover:bg-[#de3d3d]"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
