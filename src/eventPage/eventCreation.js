/* eventCreation.js
 *
 * Donde la cosa sucede.
 */
import React from 'react'
import PropTypes from 'prop-types'

import canasta from '../assets/iconos-colab/canasta.png'
import hamburguesa from '../assets/iconos-colab/comida-hamburguesa.png'
import fuego from '../assets/iconos-colab/fuego1.png'
import escoba from '../assets/iconos-colab/limpieza-escoba.png'
import guitarra from '../assets/iconos-colab/music-guitarra.png'
import parlante from '../assets/iconos-colab/music-parlante.png'
import terraza from '../assets/terraza.png'


const BACKGROUND_COLOR = 'white'

function onDragStart(ev, imgSrc) {
    console.log(ev)
    ev.dataTransfer.setData("text/plain", ev.target.id)
    ev.dataTransfer.dropEffect = "move"

    const img = new Image()
    img.src = imgSrc
    ev.dataTransfer.setDragImage(img, 0, 0)
}


function onDragOver(ev) {
    ev.preventDefault()
    // Set the dropEffect to move
    ev.dataTransfer.dropEffect = "move"
}

function onDrop(ev) {
    ev.preventDefault()
    // Get the id of the target and add the moved element to the target's DOM
    console.log(ev.dataTransfer.getData("text"))
    const data = ev.dataTransfer.getData("text")
    ev.target.appendChild(document.getElementById(data))
}

function Icon(props) {
    const styles = {
        container: {
            display: 'inline-block',
            width: 90,
        },
        icon: {
            width: 75,
        },
    }
    return (
        <div style={styles.container}>
            <img
                alt={props.id}
                src={props.img}
                style={styles.icon}
                width={55}
                id={props.id}
                draggable={true}
                onDragStart={event => onDragStart(event, props.img)}
                title="¡Arrastrá tu colaboración a la terraza!"
            />
        </div>
    )
}

Icon.propTypes = {
    img: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
}

function IconRow() {
    const styles = {
        container: {
            padding: 50,
            minWidth: 600,
            textAlign: 'center',
        },
    }
    return (
        <div style={styles.container}>
            <Icon img={canasta} id="canasta"/>
            <Icon img={guitarra} id="guitarra"/>
            <Icon img={parlante} id="parlante"/>
            <Icon img={fuego} id="fuego"/>
            <Icon img={hamburguesa} id="hamburguesa"/>
            <Icon img={escoba} id="escoba"/>
        </div>
    )
}

function Terraza() {
    const styles = {
        dropZone: {
            height: 80,
            borderTop: '1px dashed',
            borderBottom: '1px dashed',
            // textAlign: 'center',
        },
    }
    return (
        <div>
            <div
                id="target"
                onDragOver={event => onDragOver(event)}
                onDrop={event => onDrop(event)}
                style={styles.dropZone}
            />
            <img alt="terraza" src={terraza} width={500}/>
        </div>
    )
}

export class EventCreation extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    render() {
        const styles = {
            around: {
                display: 'flex',
                justifyContent: 'center',
            },
            container: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: BACKGROUND_COLOR,
                // borderRadius: 8,
                maxWidth: 600,
                minHeight: 700,
                margin: 30,
                alignItems: 'center',
            },
        }
        return (
            <div style={styles.around}>
                <div style={styles.container}>
                    <IconRow/>
                    <Terraza/>
                </div>
            </div>
        )
    }
}
