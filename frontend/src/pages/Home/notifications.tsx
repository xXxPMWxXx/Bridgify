import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import { stringify } from 'querystring';

function createNotification(
    image: String,
    sender: String,
    message: String,
    time: number
) {
    return { image, sender, message, time}
}

const rows =[
    createNotification(
        'https://t3.ftcdn.net/jpg/00/56/14/04/240_F_56140454_q4nbUmTCcC1ovIJrOL1SxJuaYXwvSz68.jpg',
        'Ruby B.',
        'condition has been updated to a little sick',
        2
    )
]

function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
}

export default function notifications() {
    
}