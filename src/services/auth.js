import { User } from '../db/models/user.js';

export const signup = async (data) => await User.create(data);
