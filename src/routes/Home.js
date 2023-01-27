import React, { useEffect, useState } from "react";
import { 
    dbService, 
    dbAddDoc, 
    dbCollection, 
    dbGetDocs, 
    dbGetDoc,
} from "fbase";

const Home = () => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const getNweets = async () => {
        const dbNweets = await dbGetDocs(dbCollection(dbService, "nweets"));
        dbNweets.forEach((doc) => {
            const nweetObject = {
                ...doc.data(),
                id: doc.id,
            };
            setNweets((prev) => [nweetObject, ...prev]);
        });
    };

    useEffect(() => {
        getNweets();
    }, []);

    const onChangeNweet = (event) => {
        const {
            target: { value },
        } = event;
        setNweet(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            await dbAddDoc(dbCollection(dbService, "nweets"),{
                nweet,
                createAt: Date.now(),
            });
        } catch (error) {
            console.error("Error adding document: ", error);
        }
        setNweet("");
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <input 
                    name='nweet'
                    value={nweet}
                    type='text' 
                    placeholder="What's on your mind?"
                    onChange={onChangeNweet}
                />
                <input 
                    type='submit'
                    value='Nweet'
                />
            </form>
        </>
    );
};

export default Home;