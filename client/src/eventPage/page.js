import React from 'react'

import logo from '../assets/logo.png'
import eric from '../assets/eric.png'
import {EventCreation} from './eventCreation'


const BACKGROUND_COLOR = '#202A65'

function Header() {
    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: 30,
        },
        logo: {
            width: 100,
        },
        username: {
            fontSize: 14,
            color: 'white',
        },
        userContainer: {
            width: 200,
            maxHeight: 30,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        divider: {
            borderRight: '1px solid white',
            minHeight: 20,
        },
    }
    return (
        <div style={styles.container}>
            <div style={styles.logo}>
                <img alt="logo" src={logo} width={100}/>
            </div>
            <div style={styles.userContainer}>
                <img alt="avatar" src={eric} width={30}/>
                <div style={styles.username}>Eric Clapton</div>
                <div style={styles.divider}/>
                <div style={styles.username}>Salir</div>
            </div>
        </div>
    )
}

export function EventPage() {
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            background: BACKGROUND_COLOR,
        },
    }
    return (
        <div style={styles.container}>
            <Header/>
            <EventCreation/>
        </div>
    )
}