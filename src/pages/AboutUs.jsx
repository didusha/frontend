import React, { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export function AboutUs() {
    const [count, setCount] = useState(100)

    function onTellMeMore() {
        console.log('Telling you more')
    }
    return (
        <section>
            <h2>About Us</h2>

            <section className="grid-container">
                <article>
                    <h2>Hello there</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <img src="/img/sunflowers.jpg" />
                </article>
                <article>
                    <h2>Hello there</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio, ea quis quae odio dolores excepturi quod ratione</p>
                    <img src="/img/sunflowers.jpg" />
                </article>
                <article>
                    <h2>Hello there</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio, ea quis quae odio dolores excepturi</p>
                    <img src="/img/sunflowers.jpg" />
                </article>
                <article>
                    <h2>Hello there</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio, ea quis quae odio dolores excepturi quod ratione, cumque voluptatem repudiandae temporibus dolor modi. Corporis debitis molestias at eos corrupti!</p>
                    <img src="/img/sunflowers.jpg" />
                </article>
            </section>
        </section>
    )
}
