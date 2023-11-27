import { Follow } from "../models/follow";
import { User } from "../models/user";

export const follow = async (followerId: number, followeeId: number) => {
  const follow = await Follow.create({
    followerId,
    followeeId
  });
  return follow;
};

export const unfollow = async (followerId: number, followeeId: number) => {
  const follow = await Follow.destroy({
    where: {
      followerId,
      followeeId
    }
  });
  return follow;
};

// these are probably not needed except for testing
export const getFollowers = async (userId: number) => {
  const followers = await Follow.findAll({
    where: {
      followeeId: userId
    },
    include: [
      {
        model: User,
        as: 'follower',
        attributes: ['id', 'name', 'email']
      }
    ]
  });
  return followers;
};

export const getFollowees = async (userId: number) => {
  const followees = await Follow.findAll({
    where: {
      followerId: userId
    },
    include: [
      {
        model: User,
        as: 'followee',
        attributes: ['id', 'name', 'email']
      }
    ]
  });
  return followees;
}