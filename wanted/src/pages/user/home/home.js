import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../../../redux/counterSlice";


export default function Home() {
    // react state
    const [reactCount, setCount] = useState(0);

    // redux
    const count = useSelector(state => state.counter.value);
    const dispatch = useDispatch();
    
    return (
        <div style={{"paddingTop": "5em"}}>
            Home
            <div>
                react count
                <button
                    aria-label="Increment value"
                    onClick={() => setCount(reactCount + 1)}
                >
                    Increment
                </button>
                <span>{reactCount}</span>
                <button
                    aria-label="Decrement value"
                    onClick={() => setCount(reactCount - 1)}
                >
                    Decrement
                </button>
            </div>        
            <div>
                redux count
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    Increment
                </button>
                <span>{count}</span>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    Decrement
                </button>
            </div>        
        </div>
    )
};