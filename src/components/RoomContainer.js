import React from 'react'
import RoomList from './RoomList'
import RoomFilter from './RoomFilter'
import { withRoomConsumer } from '../context';
import Loading from './Loading';

function RoomContainer({ context }) {
    const { loading, sortedRooms, rooms } = context;
    if (loading) {
        return <Loading />;
    }
    return (
        <>
            <RoomFilter rooms={rooms} />
            <RoomList rooms={sortedRooms} />
        </>
    )
}

export default withRoomConsumer(RoomContainer);
