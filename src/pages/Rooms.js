import React from 'react';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import RoomContainer from '../components/RoomContainer';

export const Rooms = () => {
    return (
        <>
        <Hero hero='roomsHero'>
            <Banner title='наши номера'>
                <Link to='/' className='btn-primary'>
                    вернуться на главную
                </Link>
            </Banner>
        </Hero>
        <RoomContainer />
        </>
    )
}
