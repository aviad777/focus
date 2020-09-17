import React from 'react'

import Sloth from '../assets/img/avatars/Sloth.png'
import Snail from '../assets/img/avatars/Snail.png'
import Bear from '../assets/img/avatars/Bear.png'
import Lion from '../assets/img/avatars/Lion.png'
import Squirrel from '../assets/img/avatars/Squirrel.png'
import Octopus from '../assets/img/avatars/Octopus.png'
import Chimpanzee from '../assets/img/avatars/Chimpanzee.png'
import Penguin from '../assets/img/avatars/Penguin.png'
import Beaver from '../assets/img/avatars/Beaver.png'
import Bee from '../assets/img/avatars/Bee.png'
import Ant from '../assets/img/avatars/Ant.png'


export default function Rank({ user }) {

    const ranks = [
        {title: 'Sloth', img: Sloth},
        {title: 'Snail', img: Snail},
        {title: 'Bear', img: Bear},
        {title: 'Lion', img: Lion},
        {title: 'Squirrel', img: Squirrel},
        {title: 'Octopus', img: Octopus},
        {title: 'Chimpanzee', img: Chimpanzee},
        {title: 'Penguin', img: Penguin},
        {title: 'Beaver', img: Beaver},
        {title: 'Bee', img: Bee},
        {title: 'Ant', img: Ant},
    ]

    return user ?<div>
        <img src={ranks[user.rank].img}/>
        <p>{user.userName}</p>
        <p>{user.rank}</p>
        <p>{ranks[user.rank].title}</p>
    </div>
        : <p>Loading</p>
}

