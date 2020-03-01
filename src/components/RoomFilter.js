import React, {useContext} from 'react'
import { RoomContext } from '../context'
import Title from './Title'

const getUnique = (items,value) => {
    return [...new Set(items.map(item => item[value]))]
}

export default function RoomFilter({rooms}) {
    const context = useContext(RoomContext);
    const {handleChange,type,capacity,price,minPrice,maxPrice,minSize,maxSize,breakfast,pets} = context;

    // получение разных типов
    let types = getUnique(rooms, 'type');
    // добавление all
    types = ['all', ...types]
    // map to jsx
    types = types.map((item,index) => {
        return <option value={item} key={index}> {item} </option>
    });

    // гости
    let people = getUnique(rooms,'capacity');
    people = people.map((item,index) => {
        return <option value={item} key={index}> {item} </option>
    })

    return (
        <section className='filter-container'>
            <Title title='поиск комнат' />

            <form className="filter-form">

                <div className="form-group">
                    <label htmlFor="type">тип комнаты</label>
                    <select name="type" id="type" value={type} className='form-control' onChange={handleChange}>
                        {types}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="capacity">Гостей</label>
                    <select name="capacity" id="capacity" value={capacity} className='form-control' onChange={handleChange}>
                        {people}
                    </select>
                </div>
                
                <div className="form-group">
                    <label htmlFor="capacity">цена комнаты ${price}</label>
                    <input type="range" name='price' min={minPrice} max={maxPrice} id="price" value={price} onChange={handleChange} className='form-control'/>
                </div>

                <div className="form-group">
                    <label htmlFor="size">размер комнаты</label>
                    <input type="number" name="minSize" id="size" value={minSize} onChange={handleChange} className='size-input' />
                    <input type="number" name="maxSize" id="size" value={maxSize} onChange={handleChange} className='size-input' />
                </div>

                <div className="form-group">
                    <div className="single-extra">
                        <input type="checkbox" name="breakfast" id="breakfast" checked={breakfast} onChange={handleChange} />
                        <label htmlFor="breakfast">завтрак</label>
                    </div>
                    <div className="single-extra">
                        <input type="checkbox" name="pets" id="pets" checked={pets} onChange={handleChange} />
                        <label htmlFor="pets">животные</label>
                    </div>
                </div>
            </form>
        </section>
    )
}
