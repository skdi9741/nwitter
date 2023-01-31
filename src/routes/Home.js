import React, { useEffect, useState } from "react";
import { 
    dbService, 
    dbAddDoc, 
    dbCollection, 
    dbGetDocs,
    dbQuery,
} from "fbase";

const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const getNweets = async () => {
        const query = await dbQuery(dbCollection(dbService, "nweets"));
        const dbNweets = await dbGetDocs(query);
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
                text: nweet,
                createAt: Date.now(),
                creatorId: userObj.uid,
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
            <div>
                {nweets.map(nweet => 
                    <div key={nweet.id}>
                        <h4>{nweet.text}</h4>
                        <h5>{nweet.creatorId}</h5>
                    </div>
                )}
            </div>
        </>
    );
};

export default Home;