import model from "./model.js";
import { v4 as uuidv4 } from "uuid";
export default function UsersDao() {
    const createUser = () => { } // implemented later
    const findAllUsers = () => model.find();
    console.log("Users in DAO:", findAllUsers());
    const findUsersByRole = (role) => model.find({ role: role })
    const findUserById = (userId) => model.findById(userId);
    const findUserByUsername = (username) => model.findOne({ username: username });
    const findUserByCredentials = (username, password) => model.findOne({ username, password });
    const updateUser = (userId, user) => model.updateOne({ _id: userId }, { $set: user });
    const deleteUser = (userId) => model.deleteOne({ _id: userId });
    return { findUsersByRole, createUser, findAllUsers, findUserById, findUserByUsername, findUserByCredentials, updateUser, deleteUser };
}
