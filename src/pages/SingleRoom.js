import React, { Component } from 'react'
import defaultImg from '../images/room-1.jpeg'
import { RoomContext } from '../context';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import StyledHero from '../components/StyledHero';

export default class SingleRoom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            slug: this.props.match.params.slug,
            defaultImg
        }       
    }
    static contextType = RoomContext;

    // componentDidMount() {

    // }

    render() {
        const {getRoom} = this.context;
        const room = getRoom(this.state.slug);
        // если комната не нашлась
        if(!room) {
            return (
                <div className="error">
                    <h3>мы не нашли такую комнату...</h3>
                    <Link to='/rooms' className='btn-primary'>
                        вернутья к выбору
                    </Link>
                 </div>
            );
        }
        // если такая комната есть
        const {name,description,capacity,size,price,extras,breakfast,pets,images} = room;
        const [mainImg, ...defaultImg] = images;  
        return (
            <>
            <StyledHero img={mainImg || this.state.defaultImg}>
                <Banner title={`${name} room`}>
                    <Link to='/rooms' className='btn-primary'>
                        вернуться к выбору
                    </Link>
                </Banner>
            </StyledHero>
            <section className="single-room">
                <div className="single-room-images">
                    {defaultImg.map( (item,index) => {
                        return <img key={index} src={item} alt={name} />
                    })}
                </div>
                
                <div className="single-room-info">
                    <article className='desc'>
                        <h3>детали</h3>
                        <p>{description}</p>
                    </article>

                    <article className='info'>
                        <h3>информация</h3>
                        <h6>цена : ${price}</h6>
                        <h6>размер : {size} SQFT</h6>
                        <h6>максимальная вместимость : { capacity > 1 ? `${capacity} ` : `${capacity} персона` }</h6>
                        <h6>{pets ? 'с животными' : 'без животных'}</h6>
                        <h6>{breakfast && 'завтрак включен'}</h6>
                    </article>
                </div>
            </section>

{/* доп инфа */}
            <section className="room-extras">
                <h6>доп услуги</h6>
                <ul className="extras">
                    {extras.map((item,index) => {
                        return <li key={index}>- {item}</li>
                    })}
                </ul>
            </section>
            </>
        )
    }
}
