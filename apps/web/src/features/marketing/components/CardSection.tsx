import React from 'react'

import MagicBento from '../style/MagicBento'

function CardSection() {
    return (
        <div className="w-full">
            <MagicBento
                textAutoHide={true}
                enableStars={true}
                enableSpotlight={true}
                enableBorderGlow={true}
                disableAnimations={false}
                enableTilt={false}
                enableMagnetism={true}
                clickEffect={true}
                spotlightRadius={1000}
                particleCount={12}
                glowColor="127, 0, 255"
            />
        </div>
    )
}

export default CardSection