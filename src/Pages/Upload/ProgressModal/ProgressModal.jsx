import React from 'react'
import './ProgressModal.css'

function ProgressModal({ open, text }) {
    if(!open) return null
  return (
    <>
        <div id="progress-modal">
            <div id="progress-updates">
            <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                <p id="progress-modal-text">{text}</p>
            </div>
        </div>
    </>
  )
}

export default ProgressModal