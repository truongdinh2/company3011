import React from 'react';
// import {us} from 'react-router'

function Seacrch(props) {
    return (
        <div>
            <input type="search" className="search"
                placeholder="Search ..."
                onChange={(e) => { props.valSearch(e.target.value) }}
            />
        </div>
    );
}

export default Seacrch;