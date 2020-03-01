import React from 'react'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import { Link } from 'react-router-dom'
import Services from '../components/Services'
import FeaturedRooms from '../components/FeaturedRooms'

export default function Home() {
    return (
        <>
        <Hero>
                <Banner title='лучшие номера' subtitle='делюкс начинается с $299'>
                <Link to='/rooms' className='btn-primary'>
                    наши предложения
                </Link>
            </Banner>
        </Hero>
        <Services />
        <FeaturedRooms />
        </>
    )
}
