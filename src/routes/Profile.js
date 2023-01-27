import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { useHistory } from "react-router-dom";

const Profile = () => {
    const auth = getAuth();
    const history = useHistory();
    const onSignOut = () => {
        signOut(auth);
        history.push('/');
    }

    return (
        <div>
            <button onClick={onSignOut}>Log out</button>
        </div>
    );
};

export default Profile;