export interface Follower {
  uid: string;
  twubric: {
    total: number;
    friends: number;
    influence: number;
    chirpiness: number;
  };
  join_date: string;
}
