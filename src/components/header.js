import React from 'react';
import '../css/header.css'

function Header() {
  return (
    <div class="header">
        <a href="#default" class="logo">Octavo</a>
        <div class="header-right">
            <a href="#about">About</a>
        </div>
    </div> 
  );
}

export default Header;