import React from 'react'

import CurvedLoop from '../style/CurvedLoop'

import { CurvedLoopSectionConstants } from '../constants/constants.jsx'

function CurvedLoopSection() {
    return (
        <div>
            <CurvedLoop
                marqueeText={CurvedLoopSectionConstants.marqueeText}
                speed={0.3}
                curveAmount={0}
                direction="right"
                interactive={true}
                className="custom-text-style"
            />
        </div>
    )
}

export default CurvedLoopSection