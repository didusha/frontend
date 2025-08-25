
import { useState } from "react"

export function LongTxt({ txt, length = 50}) {

    // const [isShowFullTxt, setIsShowFullTxt] = useState(false)

    const isLongerThanLimit = txt.length > length
    const textToShow = (!isLongerThanLimit) ? txt : (txt.substring(0, length)) + '...'
    return (
        <section className="long-txt">
            <p className="txt">{textToShow}</p>
            {isLongerThanLimit &&
                <div>
                    <button className="show-txt-btn">
                      Show More
                    </button>
                </div>
            }
        </section>
    )
}