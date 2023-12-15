import { ReactElement, useEffect, useState } from "react";
import TwubricScoreTable from "../components/twubric/TwubricScoreTable";
import DateFilter from "../components/twubric/DateFilter";
import { useSelector } from "react-redux";
import { GetData } from "../redux/action/action";
import { useDispatch } from "react-redux";
import { Follower } from "../components/types";

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
      const aValue =
        criteria === "Twubric Score"
          ? a.twubric.total
          : a.twubric[criteria.toLowerCase()];
      const bValue =
        criteria === "Twubric Score"
          ? b.twubric.total
          : b.twubric[criteria.toLowerCase()];
      comparison = aValue - bValue;
      return isAscending ? comparison : -comparison;
    });
    const newSortingOrder = { ...sortingOrder };
    newSortingOrder[criteria] = isAscending ? "desc" : "asc";
    setSortingOrder(newSortingOrder);
    setFollowers(sortedFollowersCopy);
  };

  const handleDateFilter = () => {
    const filteredFollowers = userData.filter((d: Follower) => {
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
      (follower: Follower) => follower.uid !== followerId
    );
    setFollowers(updatedFollowers);
  };

  useEffect(() => {
    if (userData) {
      setFollowers(userData);
    }
  }, [userData]);

  useEffect(() => {
    dispatch(GetData());
  }, [dispatch]);

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
