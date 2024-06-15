import React from 'react'
import './LibraryGrid.css'
import LibraryGridTile from './LibraryGridTile'

function LibraryGrid() {
  return (
    <>
        <div id="library-grid">
            <LibraryGridTile/>
            <LibraryGridTile/>
            <LibraryGridTile/>
            <LibraryGridTile/>
            <LibraryGridTile/>
            <LibraryGridTile/>
            <LibraryGridTile/>
            <LibraryGridTile/>
        </div>
    </>
  )
}

export default LibraryGrid