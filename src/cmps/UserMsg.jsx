import { eventBus, showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { useState, useEffect, useRef } from 'react'
import { socketService, SOCKET_EVENT_REVIEW_ABOUT_YOU, SOCKET_EVENT_ADD_ORDER, SOCKET_EVENT_ORDER_CONFIRM, SOCKET_EVENT_ORDER_REJECT } from '../services/socket.service'

export function UserMsg() {
	const [msg, setMsg] = useState(null)
	const timeoutIdRef = useRef()

	useEffect(() => {
		const unsubscribe = eventBus.on('show-msg', msg => {
			setMsg(msg)
			if (timeoutIdRef.current) {
				timeoutIdRef.current = null
				clearTimeout(timeoutIdRef.current)
			}
			timeoutIdRef.current = setTimeout(closeMsg, 3000)
		})

		socketService.on(SOCKET_EVENT_ADD_ORDER, order => {
			showSuccessMsg(`New order added by ${order.guest.fullname}`)
		})

		socketService.on(SOCKET_EVENT_ORDER_CONFIRM, order => {
			showSuccessMsg(`Your order confirmed by ${order.host.fullname}`)
		})
		socketService.on(SOCKET_EVENT_ORDER_REJECT, order => {
			showErrorMsg(`Your order rejected by ${order.host.fullname}`)
		})

		return () => {
			unsubscribe()
			socketService.off(SOCKET_EVENT_ADD_ORDER)
			socketService.off(SOCKET_EVENT_ORDER_CONFIRM)
			socketService.off(SOCKET_EVENT_ORDER_REJECT)
		}
	}, [])

	function closeMsg() {
		setMsg(null)
	}

    function msgClass() {
        return msg ? 'visible' : ''
    }
	return (
		<section className={`user-msg ${msg?.type} ${msgClass()}`}>
			<button onClick={closeMsg}>x</button>
			{msg?.txt}
		</section>
	)
}
