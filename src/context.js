import React, { Component } from 'react';
import items from './data';
import Client from './Contentful';

Client.getEntries({
    content_type: ''
})
.then((response) => console.log(response.items))
.catch(console.error)

const RoomContext = React.createContext();

class RoomProvider extends Component {
    state = {
     rooms: [],
     sortedRooms: [],
     featuredRooms: [],
     loading: true,

     type: 'all',
     capacity: 1,
     price: 0,
     minPrice: 0,
     maxPrice: 0,
     minSize: 0,
     maxSize: 0,
     breakfast: false,
     pets: false
    }
    // getData
    componentDidMount() {
        let rooms = this.formatData(items);
        let featuredRooms = rooms.filter(room => room.featured === true);
        let maxPrice = Math.max(...rooms.map(item => item.price));
        let maxSize = Math.max(...rooms.map(item => item.size));

        this.setState({
           rooms,
           featuredRooms,
           sortedRooms: rooms,
           loading: false,

           price: maxPrice,
           maxPrice,
           maxSize
        });       
    }
    formatData(items) {
        let tempItmes = items.map(item => {
            let id = item.sys.id
            let images = item.fields.images.map(image => image.fields.file.url);
            let room = { ...item.fields, images, id }
            return room;
        });
        return tempItmes;
    }
    // Комнаты
    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find((room) => room.slug === slug);
        return room;
    }
    // настройка функций параметров
    handleChange = (event) => {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = event.target.name

        this.setState({
            [name]: value
        }, this.filterRooms)
    }
    filterRooms = () => {
        let {rooms,type,capacity,price,minPrice,maxPrice,minSize,maxSize,breakfast,pets} = this.state;

        let tempRooms = [...rooms];

        capacity = parseInt(capacity);
        price = parseInt(price)

// фильтр для type
        if(type !== 'all'){
            tempRooms = tempRooms.filter(room => room.type === type)
        }
// фильтр для capacity
        if(capacity !== 1){
            tempRooms = tempRooms.filter(room => room.capacity >= capacity)
        }

// фильтр для price
        tempRooms = tempRooms.filter(room => room.price <= price);
// фильтр для rooms
        tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize);

// фильтр для breakfast
        if(breakfast){
            tempRooms = tempRooms.filter(room => room.breakfast === true)
        }
// фильтр для pets
        if(pets){
            tempRooms = tempRooms.filter(room => room.pets === true)
        }

// изменяем state
        this.setState({
            sortedRooms: tempRooms
        })
    }

// render
    render() {
        return (
            <RoomContext.Provider value={{...this.state, getRoom: this.getRoom, handleChange: this.handleChange}}>
               {this.props.children} 
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer;

// HOC
export function withRoomConsumer(Component){
    return function ConsumerWrapper(props){
        return  (
            <RoomConsumer>
                {value => <Component {...props} context={value} />}
            </RoomConsumer>
        );
    }
}

export {RoomProvider,RoomConsumer,RoomContext};
