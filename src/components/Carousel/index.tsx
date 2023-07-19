import {createRef, ReactElement, UIEventHandler, useEffect, useState, WheelEventHandler} from "react";
import {faCaretLeft, faCaretRight} from "@fortawesome/free-solid-svg-icons";
import "./index.sass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function Carousel(props: {
    children: ReactElement[]
}) {
    let [x, setX] = useState(0)
    let [showL, setShowL] = useState(false)
    let [showR, setShowR] = useState(false)
    let slider = createRef<HTMLUListElement>()

    useEffect(() => {
        if (!slider.current)
            return

        setShowL(x > 0)
        setShowR(x < (slider.current.scrollWidth - slider.current.clientWidth))
    }, [slider, x])

    function goLeft() {
        if (x - 960 >= 0) {
            slider.current?.scrollTo(x - 960, 0);
        } else {
            slider.current?.scrollTo(0, 0);
        }
    }

    function goRight() {
        if (x + 960 <= 2871) {
            slider.current?.scrollTo(x + 960, 0);
        } else {
            slider.current?.scrollTo(2871, 0);
        }
    }

    const onWheel: WheelEventHandler = (event) => {
        event.preventDefault()

        if (!slider.current)
            return

        // noinspection JSSuspiciousNameCombination
        slider.current.scrollLeft += event.deltaY
    }

    const onScroll: UIEventHandler = (event) => {
        event.preventDefault()

        if (!slider.current)
            return

        setX(slider.current.scrollLeft)
    }

    return <div className={"carousel"}>
        <button onClick={goLeft} style={{visibility: showL ? "visible" : "hidden"}} className={"left"}>
            <FontAwesomeIcon icon={faCaretLeft}/>
        </button>

        <ul ref={slider} onScroll={onScroll} onWheel={onWheel}
            className={`carousel-items ${showL && !showR && "gradient-left"} ${showR && !showL && "gradient-right"} ${showL && showR && "gradient"}`}>
            {props.children}
        </ul>

        <button onClick={goRight} style={{visibility: showR ? "visible" : "hidden"}} className={"right"}>
            <FontAwesomeIcon icon={faCaretRight}/>
        </button>
    </div>

}
