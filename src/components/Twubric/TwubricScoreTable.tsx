import React, { useState } from "react";
import { Follower as AddFollower } from "../types";

interface Follower extends AddFollower {
  username: string;
  image: string;
}

interface TwubricScoreTableProps {
  followers: Follower[];
  handleSort: (criteria: string) => void;
  handleRemoveFollower: (followerId: string) => void;
}

const sortingFilters = [
  { name: "Twubric Score" },
  { name: "Friends" },
  { name: "Influence" },
  { name: "Chirpiness" },
];

const TwubricScoreTable: React.FC<TwubricScoreTableProps> = ({
  followers,
  handleSort,
  handleRemoveFollower,
}) => {
  const [value, setValue] = useState<string>("");

  const handleSortBy = (criteria: string) => {
    handleSort(criteria);
    setValue(criteria);
  };

  const handleRemove = (followerId: string) => {
    handleRemoveFollower(followerId);
  };

  return (
    <div className="twubric-score-table">
      <div className="my-5 flex gap-2 items-center flex-wrap">
        <h3 className="lg:text-[20px] text-base font-semibold text-blue-500">
          Sort By
        </h3>
        <div className="flex border border-gray-300 rounded-md w-max p-1 flex-wrap gap-2">
          {sortingFilters.map((val, i) => (
            <button
              key={i}
              onClick={() => handleSortBy(val.name)}
              className={`${
                value === val.name ? "bg-blue-300 text-white" : "text-gray-700"
              } md:text-base text-sm md:px-7 px-3 md:py-2 py-1 font-medium text-gray-700 rounded-md`}
            >
              {val.name}
            </button>
          ))}
        </div>
      </div>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-5 gap-3 sm:my-10 my-6">
        {followers.map((follower, i) => {
          const date = new Date(follower.join_date).toDateString();
          return (
            <div
              key={i}
              className="border border-gray-300 rounded-xl p-4 shadow-md"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <img
                    src={follower.image}
                    alt="avatar"
                    className="h-[35px] w-[35px] rounded-full"
                  />
                  <h3 className="font-semibold">{follower.username}</h3>
                </div>
                <span className="font-semibold">{follower.twubric.total}</span>
              </div>
              <div className="py-3 flex items-center border-b border-gray-200">
                <div className="w-full flex flex-col items-center">
                  <h3 className="">Friends</h3>
                  <h4 className="text-gray-500">{follower.twubric.friends}</h4>
                </div>
                <div className="h-[40px] w-[1px] bg-gray-200"></div>
                <div className="w-full flex flex-col items-center">
                  <h3 className="">Influence</h3>
                  <h4 className="text-gray-500">
                    {follower.twubric.influence}
                  </h4>
                </div>
                <div className="h-[40px] w-[1px] bg-gray-200"></div>
                <div className="w-full flex flex-col items-center">
                  <h3 className="">Chirpiness</h3>
                  <h4 className="text-gray-500">
                    {follower.twubric.chirpiness}
                  </h4>
                </div>
              </div>
              <div className="flex justify-between items-center pt-3 text-sm">
                <h4 className="text-blue-500 font-semibold">{date}</h4>
                <button
                  onClick={() => handleRemove(follower.uid)}
                  className="px-5 py-1 font-semibold bg-red-400 text-white rounded-md"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TwubricScoreTable;
