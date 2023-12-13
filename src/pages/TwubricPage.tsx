import React, { ReactElement, useEffect, useState } from "react";
import TwubricScoreTable from "../components/Twubric/TwubricScoreTable";
import DateFilter from "../components/Twubric/DateFilter";
import { useSelector } from "react-redux";
import { GetData } from "../redux/action/action";
import { useDispatch } from "react-redux";

interface Follower {
  uid: string;
  twubric: {
    total: number;
    friends: number;
    influence: number;
    chirpiness: number;
  };
  join_date: string;
}

export const TwubricPage = (): ReactElement => {
  const [followers, setFollowers] = useState<Follower[] | any>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [sortingOrder, setSortingOrder] = useState<{ [key: string]: string }>(
    {}
  );

  const userData = useSelector((state: any) => state.users.data);
  const dispatch = useDispatch();

  const handleSort = (criteria: string) => {
    const sortedFollowersCopy = [...followers];
    const isAscending = sortingOrder[criteria] === "asc";
    sortedFollowersCopy.sort((a, b) => {
      let comparison = 0;

      if (criteria === "Twubric Score") {
        comparison = a.twubric.total - b.twubric.total;
      } else if (criteria === "Friends") {
        comparison = a.twubric.friends - b.twubric.friends;
      } else if (criteria === "Influence") {
        comparison = a.twubric.influence - b.twubric.influence;
      } else if (criteria === "Chirpiness") {
        comparison = a.twubric.chirpiness - b.twubric.chirpiness;
      }
      return isAscending ? comparison : -comparison;
    });

    const newSortingOrder = { ...sortingOrder };
    newSortingOrder[criteria] = isAscending ? "desc" : "asc";
    setSortingOrder(newSortingOrder);
    setFollowers(sortedFollowersCopy);
  };

  const handleDateFilter = () => {
    const filteredFollowers = userData.filter((d: any) => {
      const joinDate = new Date(d.join_date).toDateString();
      const startDate1 = new Date(startDate).toDateString();
      const endDate1 = new Date(endDate).toDateString();

      return (
        new Date(joinDate).getTime() >= new Date(startDate1).getTime() &&
        new Date(joinDate).getTime() <= new Date(endDate1).getTime()
      );
    });
    setFollowers(filteredFollowers);
  };

  const handleRemoveFollower = (followerId: string) => {
    const updatedFollowers = followers.filter(
      (follower: any) => follower.uid !== followerId
    );
    setFollowers(updatedFollowers);
  };

  useEffect(() => {
    if (userData) {
      setFollowers(userData);
    }
    console.log(userData);
  }, [userData]);

  useEffect(() => {
    dispatch(GetData());
  }, []);

  return (
    <div>
      <div className="sm:px-5 px-4">
        <h1 className="text-center my-10 text-3xl font-bold text-slate-700">
          Twitter Follower Analysis
        </h1>
        <div className="flex md:justify-end items-center">
          <DateFilter
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            handleDateFilter={handleDateFilter}
          />
        </div>
        <TwubricScoreTable
          followers={followers}
          handleSort={handleSort}
          handleRemoveFollower={handleRemoveFollower}
        />
      </div>
    </div>
  );
};
