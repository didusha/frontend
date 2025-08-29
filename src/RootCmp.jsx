import React from 'react'
import { Routes, Route } from 'react-router'

// import { HomePage } from './pages/HomePage'
import { AboutUs } from './pages/AboutUs'
import { StayIndex } from './pages/StayIndex.jsx'
// import { ReviewIndex } from './pages/ReviewIndex.jsx'
import { ChatApp } from './pages/Chat.jsx'
import { AdminIndex } from './pages/AdminIndex.jsx'

import { StayDetails } from './pages/StayDetails'
import { UserDetails } from './pages/UserDetails'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg.jsx'
import { LoginSignup, Login, Signup } from './pages/LoginSignup.jsx'
import { ConfirmReservation } from './cmps/ConfirmReservation.jsx'
import { StayEdit } from './pages/StayEdit.jsx'

import { Dashboard } from './pages/Dashboard.jsx'
import { Trips } from './pages/Trips.jsx'
import { Listing } from './pages/Listing.jsx'


export function RootCmp() {
    return (
        <div className="main-container">
            <AppHeader />
            <UserMsg />

            <main>
                <Routes>
                    <Route path="" element={<StayIndex />} />
                    <Route path="about" element={<AboutUs />} />
                    <Route path="stay" element={<StayIndex />} />
                    <Route path="stay/:stayId" element={<StayDetails />} />
                    <Route path="stay/:stayId/order" element={<ConfirmReservation />} />
                    <Route path="stay/edit" element={<StayEdit />} />
                    <Route path="user/:id" element={<UserDetails />} />
                    {/* <Route path="review" element={<ReviewIndex />} /> */}
                    <Route path="chat" element={<ChatApp />} />
                    <Route path="admin" element={<AdminIndex />} />
                    <Route path="auth" element={<LoginSignup />}>
                        <Route path="login" element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                    </Route>
                    <Route path="dashboard" element={<Dashboard />}/>
                    <Route path="trips" element={<Trips />}/>
                    <Route path="listing" element={<Listing />}/>
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}


