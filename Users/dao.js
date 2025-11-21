import model from "./model.js";
import { v4 as uuidv4 } from "uuid";
export default function UsersDao() {
    const createUser = (user) => {
        const newUser = { ...user, _id: uuidv4() };
        return model.create(newUser);
    }

    const findAllUsers = () => model.find();

    const findUsersByRole = (role) => model.find({ role: role })
    const findUserById = (userId) => model.findById(userId);
    const findUserByUsername = (username) => model.findOne({ username: username });
    const findUserByCredentials = (username, password) => model.findOne({ username, password });
    const findUsersByPartialName = (name) => model.find({
        $or: [
            { firstName: { $regex: name, $options: "i" } },
            { lastName: { $regex: name, $options: "i" } }
        ]
    });
    const updateUser = (userId, user) => model.updateOne({ _id: userId }, { $set: user });
    const deleteUser = (userId) => model.deleteOne({ _id: userId });
    return { findUsersByRole, createUser, findAllUsers, findUserById, findUserByUsername, findUserByCredentials, findUsersByPartialName, updateUser, deleteUser };
}
