import explore from "../assets/images/svg/explor.svg"
import wishlist from "../assets/images/svg/wishlist.svg"
import trips from "../assets/images/svg/trips.svg"
import messages from "../assets/images/svg/messages.svg"
import profile from "../assets/images/svg/profile.svg"
import { useNavigate } from "react-router"
import { useState } from "react"
import { useSelector } from "react-redux"
import { logout } from "../store/actions/user.actions"
import { showSuccessMsg } from "../services/event-bus.service"

export function SmallFooter() {
    const navigate = useNavigate()
    const [selected, setSelected] = useState('explore')
    const user = useSelector(storeState => storeState.userModule.user)
    const isDetailsPage = location.pathname.startsWith('/stay')

    async function onLogout() {
        try {
            await logout()
            navigate('/')
            setSelected('explore')
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    return (
        !isDetailsPage && (
            <footer className="small-footer">
                <section
                    className={selected === 'explore' ? 'page-selected' : ''}
                    onClick={() => {
                        navigate('/')
                        setSelected('explore')
                    }}
                >
                    <img className="footer-imgs" src={explore} alt="explore" />
                    <span>Explore</span>
                </section>

                <section
                    className={selected === 'wishlist' ? 'page-selected' : ''}
                    onClick={() => {
                        navigate('/wishlist')
                        setSelected('wishlist')
                    }}
                >
                    <img className="footer-imgs" src={wishlist} alt="wishlist" />
                    <span>Wishlist</span>
                </section>

                <section
                    className={selected === 'trips' ? 'page-selected' : ''}
                    onClick={() => {
                        navigate('/trips')
                        setSelected('trips')
                    }}
                >
                    <img className="footer-imgs" src={trips} alt="trips" />
                    <span>Trips</span>
                </section>
                <section>
                    <img className="footer-imgs" src={messages} alt="message" />
                    <span>Messages</span>
                </section>
                {!user &&
                    <section
                        className={selected === 'login' ? 'page-selected' : ''}
                        onClick={() => {
                            navigate('/auth/login')
                            setSelected('login')
                        }}>
                        <img className="footer-imgs" src={profile} alt="login" />
                        <span>Log in</span>
                    </section>
                }
                {user &&
                    <section
                        className={selected === 'logout' ? 'page-selected' : ''}
                        onClick={() => {
                            onLogout()
                        }}>
                        <img className="footer-imgs" src={profile} alt="login" />
                        <span>Log out</span>
                    </section>
                }
            </footer>
        )
    )
}