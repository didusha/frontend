import { useEffect, useState } from 'react'

export function StayEdit() {

    const [stay, setStay] = useState({})
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
        setLocalFilter(prev => ({ ...prev, [name]: val }))
    }

    const handleMultiSelect = (ev) => {
        const selected = Array.from(ev.target.selectedOptions, (opt) => opt.value);
        setStay((prev) => ({ ...prev, amenities: selected }));
    }

    const handleImageUpload = (ev) => {
        // const files = Array.from(ev.target.files)
        // const fileURLs = files.map(file => URL.createObjectURL(file))

        // setImages(prev => [...prev, ...fileURLs])
        // setStay(prev => ({ ...prev, images: [...(prev.images || []), ...files] }))
    }

    const handleSubmit = (ev) => {
        ev.preventDefault();
        onSave(stay);
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
                    <input name="city" value={stay.city || ""} onChange={handleChange} />
                </div>

                <div className="form-row">
                    <label>Country</label>
                    <input name="country" value={stay.country || ""} onChange={handleChange} />
                </div>

                <div className="form-row">
                    <label>Street</label>
                    <input name="street" value={stay.street || ""} onChange={handleChange} />
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
                    <select name="propertyType" value={stay.propertyType || ""} onChange={handleChange}>
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
                    <label>Upload Images</label>
                    <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
                    <div className="image-preview">
                        {images.map((img, idx) => (
                            <img key={idx} src={img} alt="Preview" />
                        ))}
                    </div>
                </div>

                <div className="form-row full-width">
                    <label>Description</label>
                    <textarea name="description" rows="4" value={stay.description || ""} onChange={handleChange} />
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