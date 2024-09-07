import React, { useEffect, useRef } from 'react';

const Dropdown = (props) => {
    // const dropdownRef = useRef();

    // const handleClick = (event) => {
    //     if (dropdownRef && !dropdownRef.current.contains(event.target) && props.onClose) {
    //         props.onClose();
    //     }
    // };
    // useEffect(() => {

    //     document.addEventListener("click", handleClick);
    //     return () => {
    //         document.removeEventListener("click", handleClick);
    //     };

    // }, []);

    return (
        <div
            // ref={dropdownRef}
            style={{ position: "absolute", top: "100%", right: "0" }}
            className={`dropdown custom-scroll ${props.class ? props.class : ""}`}
        >
            {props.children}
        </div>
    );
}

export default Dropdown;
