import { dbDeleteDoc, dbService, dbDoc, dbUpdateDoc } from 'fbase';
import React, { useState } from 'react'

const Nweet = ({ nweetObj, isOwner }) => {
    const [idEditing, setIsEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm('Are you sure you want to delete this nweet?');
        if(ok) {
            const nweetTextRef = dbDoc(dbService, `nweets/${nweetObj.id}`);
            await dbDeleteDoc(nweetTextRef);
        }
    };
    const toggleEditing = () => setIsEditing((prev) => !prev);
    const onNweetChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewNweet(value);
    }
    const onEditingSubmit = async (event) => {
        event.preventDefault();
        const nweetTextRef = dbDoc(dbService, `nweets/${nweetObj.id}`);
        await dbUpdateDoc(nweetTextRef, {
            text: newNweet,
        });
        setIsEditing(false);
    };

    return (
        <div>
            {idEditing ? (
                <>
                    <form onSubmit={onEditingSubmit}>
                        <input 
                            onChange={onNweetChange} 
                            placeholder='Edit your Nweet'
                            type='text' 
                            value={newNweet} 
                        />
                        <input type='submit' value='updateNweet' />
                    </form> 
                    <button onClick={toggleEditing}>cancel</button>
                </>
            ) : (
                <>
                <h4>{newNweet}</h4>
                {isOwner && (
                    <>
                        <button onClick={onDeleteClick}>delete nweet</button>
                        <button onClick={toggleEditing}>edit nweet</button>
                    </>
                )}
                </>
            )}
            
            
            
        </div>
    );
};

export default Nweet;