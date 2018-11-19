import React from 'react'

const Home = () => {
    return (
        <div>
            <div>home component</div>
            <button onClick={() => console.log('Button pressed')}>Press me!</button>
        </div>
    );
}

export default Home