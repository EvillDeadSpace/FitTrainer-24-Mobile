import React, { useState } from 'react';
import { UserContext } from './Context';

export const UserProvider = ({ children }) => {
    const [username, setUsername] = useState(null);
    const [userImage, setUserImage] = useState(null);
    return (
        <UserContext.Provider value={{ username, setUsername, userImage, setUserImage }}>
            {children}
        </UserContext.Provider>
    );
};