import User from "../models/User";

/*READ */
export const getUser = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id);
    } catch(err) {
        res.status(404).json({message: err.message});
    }
};
export const getUserFollowing = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        const following = await Promise.all(
            user.following.map((id)=> User.findById(id))
        );
        const formattedFollowing= following.map(
            ({ _id, firstName, lastName, occupation, location, picturePath}) => {
                return { _id, firstName, lastName, occupation, location, picturePath};
            }
        );
        res.status(200).json(formattedFollowing);
} catch(err) {
    res.status(404).json({message: err.message});
}
};
/*UPTADE*/
export const addRemoveFollow = async (req, res) => {
    try{
        const { id, FollowingId } = req.params;
        const user = await User.findById(id);
        const followings = await User.findById(FollowingId);
        if(user.following.includes(FollowingId)){
            user.following = user.following.filter((id) => id !== FollowingId);
            followings.following = followings.following.filter((id) => id !== id);
        }
        else{
            user.following.push(FollowingId);
            followings.following.push(id);
        }
        await user.save()
        await following.save();
        const following = await Promise.all(
            user.following.map((id)=> User.findById(id))
        );
        const formattedFollowing= following.map(
            ({ _id, firstName, lastName, occupation, location, picturePath}) => {
                return { _id, firstName, lastName, occupation, location, picturePath};
            }
        );
        res.status(200).json(formattedFollowing);
    }catch(err) {
        res.status(404).json({message: err.message});
    }
}; 