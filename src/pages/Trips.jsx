import { useEffect, useState } from "react"

export function Trips() {
  const [trips, setTrips] = useState([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("order"))
    if (data && Array.isArray(data)) {
      setTrips(data)
    }
  }, [])


  return (
    <section className="trips">
      <h2 className="trips-title">My Trips</h2>
      {!trips.length && <p>No trips booked yet.</p>}
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trips.map(trip => (
          <li
            key={trip._id}
            className="p-5 rounded-2xl shadow-md border bg-white"
          >
            <h3 className="text-lg font-semibold mb-2">{trip.stay?.name}</h3>
            <p className="text-sm text-gray-600">
              Host: {trip.host?.fullname} – {trip.host?.location}
            </p>

            <div className="mt-3 space-y-1">
              <p>
                <span className="font-medium">Check-in:</span>{" "}
                {trip.startDate || "Not set"}
              </p>
              <p>
                <span className="font-medium">Check-out:</span>{" "}
                {trip.endDate || "Not set"}
              </p>
              <p>
                <span className="font-medium">Guests:</span>{" "}
                {trip.guests?.adults} adults, {trip.guests?.children} children,{" "}
                {trip.guests?.infants} infants, {trip.guests?.pets} pets
              </p>
              <p>
                <span className="font-medium">Status:</span> {trip.status}
              </p>
              <p>
                <span className="font-medium">Total Price:</span> $
                {trip.totalPrice || trip.stay?.price}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
