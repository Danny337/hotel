import React, { Component } from 'react'
import Title from './Title'
import {FaCocktail,FaHiking,FaShuttleVan,FaBeer} from 'react-icons/fa'

export default class Services extends Component {
    state = {
        services: [
            {
                icon: <FaCocktail />,
                title: 'Бесплатные коктейли',
                info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, praesentium!'
            },
            {
                icon: <FaHiking />,
                title: 'Лучшие экскурсии',
                info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, praesentium!'
            },
            {
                icon: <FaShuttleVan />,
                title: 'Бесплатный трансфер',
                info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, praesentium!'
            },
            {
                icon: <FaBeer />,
                title: 'Самое вкусное пиво',
                info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, praesentium!'
            }
        ]
    }
    render() {
        return (
            <section className='services'>
                <Title title='преимущества' />
                
                <div className="services-center">
                    {this.state.services.map((item,index) => {
                        return (
                         <article key={index} className='service'>
                            <span>{item.icon}</span>
                            <h6>{item.title}</h6>
                            <p>{item.info}</p>
                         </article>
                        );
                    })}
                </div>
            </section>
        )
    }
}
