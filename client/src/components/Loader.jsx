import React from 'react';
import { Audio } from 'react-loader-spinner'

function Loader() {
    return (
        <div >
         <div style={{display:'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginTop: '2rem'}}>
         Loading your virtual window....
            <Audio
                height="80"
                width="80"
                radius="9"
                color="green"
                ariaLabel="loading"
                wrapperStyle
                wrapperClass
                
            />
         </div>
            
        </div>
    );
}

export default Loader;