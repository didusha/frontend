import { useEffect, useState } from 'react'
import { addStay } from '../store/actions/stay.actions'
import { stayService } from '../services/stay/'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { ImgUploader } from '../cmps/ImgUploader'



export function StayEdit() {

    const [stay, setStay] = useState(stayService.getEmptyStay())
    const [images, setImages] = useState([])

    const amenitiesOptions = [
        "TV", "Cable TV", "Internet", "Wifi", "Air conditioning", "Pool", "Kitchen",
        "Free parking on premises", "Gym", "Elevator", "Hot tub", "Family/kid friendly",
        "Washer", "Dryer", "Smoke detector", "Carbon monoxide detector", "First aid kit",
        "Safety card", "Fire extinguisher", "Essentials", "Shampoo", "Lock on bedroom door",
        "24-hour check-in", "Hangers", "Hair dryer", "Iron", "Laptop friendly workspace",
        "Self check-in", "Building staff", "Private entrance", "Bathtub", "Baby bath",
        "High chair", "Children’s books and toys", "Crib", "Pack ’n Play/travel crib",
        "Children’s dinnerware", "Hot water", "Bed linens", "Extra pillows and blankets",
        "Microwave", "Coffee maker", "Refrigerator", "Dishwasher", "Dishes and silverware",
        "Cooking basics", "Oven", "Stove", "BBQ grill", "Patio or balcony", "Beach essentials",
        "Step-free access", "Disabled parking spot", "Beachfront"
    ]

    function handleChange(ev) {
        const { type, name, value } = ev.target
        const val = (type === 'number') ? +value : value
        setStay(prev => {
            if (["city", "country", "address"].includes(name)) {
                return { ...prev, loc: { ...prev.loc, [name]: val } }
            }
            return { ...prev, [name]: val }
        })
    }

    const handleMultiSelect = (ev) => {
        const selected = Array.from(ev.target.selectedOptions, (opt) => opt.value);
        setStay((prev) => ({ ...prev, amenities: selected }));
    }

    function onUploaded(url) {
        setStay(prev => ({ ...prev, imgUrls: [...(prev.imgUrls || []), url] }))
    }

    const handleImageUpload = (ev) => {
        // const files = Array.from(ev.target.files)
        // const fileURLs = files.map(file => URL.createObjectURL(file))

        // setImages(prev => [...prev, ...fileURLs])
        // setStay(prev => ({ ...prev, images: [...(prev.images || []), ...files] }))
    }

    async function handleSubmit(ev) {
        ev.preventDefault()
        try {
            const savedStay = await addStay(stay)
            console.log('added stay')
            // showSuccessMsg(`Stay added (id: ${savedStay._id})`)
        } catch (err) {
            console.log('Cannot add stay')
            showErrorMsg('Cannot add stay')
        }
    }

    return (
        <form className="stay-edit" onSubmit={handleSubmit}>
            <h2>Become a host!</h2>
            <div className="form-grid">

                <div className="form-row">
                    <label>Name</label>
                    <input name="name" value={stay.name || ""} onChange={handleChange} />
                </div>

                <div className="form-row">
                    <label>City</label>
                    <input name="city" value={stay.loc.city || ""} onChange={handleChange} />
                </div>

                <div className="form-row">
                    <label>Country</label>
                    <input name="country" value={stay.loc.country || ""} onChange={handleChange} />
                </div>

                <div className="form-row">
                    <label>Address</label>
                    <input name="address" value={stay.loc.address || ""} onChange={handleChange} />
                </div>

                <div className="form-row">
                    <label>Capacity</label>
                    <input type="number" name="capacity" value={stay.capacity || ""} onChange={handleChange} />
                </div>

                <div className="form-row">
                    <label>Bedrooms</label>
                    <input type="number" name="bedrooms" value={stay.bedrooms || ""} onChange={handleChange} />
                </div>

                <div className="form-row">
                    <label>Bathrooms</label>
                    <input type="number" name="bathrooms" value={stay.bathrooms || ""} onChange={handleChange} />
                </div>

                <div className="form-row">
                    <label>Property Type</label>
                    <select name="type" value={stay.type || ""} onChange={handleChange}>
                        <option value="">Select type</option>
                        <option value="Private room">Private room</option>
                        <option value="Apartment">Apartment</option>
                    </select>
                </div>

                <div className="form-row">
                    <label>Price per night</label>
                    <input type="number" name="price" value={stay.price || ""} onChange={handleChange} />
                </div>

                <div className="form-row full-width">
                    {/* <label>Upload Images</label> */}
                    <ImgUploader onUploaded={onUploaded} />
                    {/* <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
                    <div className="image-preview">
                        {stay.imgUrls.map((img, idx) => (
                            <img key={idx} src={img} alt="Preview" />
                        ))}
                    </div> */}
                </div>

                <div className="form-row full-width">
                    <label>Summary</label>
                    <textarea name="summary" rows="4" value={stay.summary || ""} onChange={handleChange} />
                </div>

                <div className="form-row full-width">
                    <label>Amenities</label>
                    <select multiple value={stay.amenities || []} onChange={handleMultiSelect}>
                        {amenitiesOptions.map((a) => (
                            <option key={a} value={a}>{a}</option>
                        ))}
                    </select>
                </div>
            </div>

            <button type="submit" className="btn-save">Save</button>
        </form>
    )
}