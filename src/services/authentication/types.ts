export type User = {
  avatar: string;
  collectionId: string;
  collectionName: string;
  created: string;
  email: string;
  emailVisibility: boolean;
  favourite_locations: string[];
  id: string;
  name: string;
  updated: string;
  username: string;
  verified: boolean;
};

export type LoggedUser = {
  user: User;
  token: string;
};
