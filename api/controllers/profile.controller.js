import User from "../models/User.js";

export const profiles = async (req, res, next) => {
  const { userId, gender, turnOns, lookingFor } = req.query;

  try {
    let filter = { gender: gender === "male" ? "female" : "male" };

    if (turnOns) {
      filter.turnOns = { $in: turnOns };
    }

    if (lookingFor) {
      filter.lookingFor = { $in: lookingFor };
    }

    const currentUser = await User.findById(userId)
      .populate("matches", "_id")
      .populate("crushes", "_id");

    const friendIds = currentUser.matches.map((friend) => friend._id);

    const crushIds = currentUser.crushes.map((crush) => crush._id);

    const profiles = await User.find(filter)
      .where("_id")
      .nin([userId, ...friendIds, ...crushIds]);

    return res.status(200).json({ profiles });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetching profiles", error });
  }
};
export const sendLike = async (req, res, next) => {
  const { currentUserId, selectedUserId } = req.body;

  try {
    //update the recepient's friendRequestsArray!
    await User.findByIdAndUpdate(selectedUserId, {
      $push: { recievedLikes: currentUserId },
    });
    //update the sender's sentFriendRequests array
    await User.findByIdAndUpdate(currentUserId, {
      $push: { crushes: selectedUserId },
    });

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const receivedLikes = async (req, res, next) => {
  const { userId } = req.params;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch details of users who liked the current user
    const receivedLikesDetails = [];
    for (const likedUserId of user.recievedLikes) {
      const likedUser = await User.findById(likedUserId);
      if (likedUser) {
        receivedLikesDetails.push(likedUser);
      }
    }

    res.status(200).json({ receivedLikesDetails });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching received likes details",
      error: error.message,
    });
  }
};

export const createMatch = async (req, res, next) => {
  try {
    const { currentUserId, selectedUserId } = req.body;

    //update the selected user's crushes array and the matches array
    await User.findByIdAndUpdate(selectedUserId, {
      $push: { matches: currentUserId },
      $pull: { crushes: currentUserId },
    });

    //update the current user's matches array recievedlikes array
    await User.findByIdAndUpdate(currentUserId, {
      $push: { matches: selectedUserId },
      $pull: { recievedLikes: selectedUserId },
    });

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: "Error creating a match", error });
  }
};
export const getMatches = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const matchIds = user.matches;

    const matches = await User.find({ _id: { $in: matchIds } });

    res.status(200).json({ matches });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the matches", error });
  }
};
