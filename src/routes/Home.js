import React, { useEffect, useState } from "react";
import { 
    dbService, 
    dbAddDoc, 
    dbCollection, 
    dbQuery,
    dbOnSnapShot,
    storageService,
} from "fbase";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import Nweet from "components/Nweet";
import { v4 } from "uuid";

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState("");
    const getNweets = async () => {
        const query = await dbQuery(
            dbCollection(dbService, "nweets"),
        );
        dbOnSnapShot(query, (snapshot) => {
            const nweetArr = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setNweets(nweetArr);
            console.log('Something happened')
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
        let attachmentUrl = "";
        if (attachment !== "") {
            const attachmentRef = ref(storageService, `${userObj.uid}/${v4()}`);
            const response = await uploadString(attachmentRef, attachment, "data_url");
            attachmentUrl = await getDownloadURL(response.ref);
        }

        const nweetObj = {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        };
        try{
            await dbAddDoc(dbCollection(dbService, "nweets"), nweetObj);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
        setNweet("");
        setAttachment("");
    };

    const onFileChange = (event) => {
        const { 
            target: { files },
        } = event
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const { 
                currentTarget : { result }, 
            } = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };

    const onClearAttachment = () => {
        setAttachment("");
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
                <input type='file' accept="image/*" onChange={onFileChange}/>
                <input type='submit' value='Nweet' />
                {attachment && (
                    <div>
                        <img src={attachment} alt='attachment' width={200}/>
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>
                )}
            </form>
            <div>
                {nweets.map(nweet =>
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
                )}
            </div>
        </>
    );
};

export default Home;