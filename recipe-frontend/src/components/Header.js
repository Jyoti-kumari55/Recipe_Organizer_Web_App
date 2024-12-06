import React from 'react'
import { Link } from 'react-router'

const Header = () => {
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container">
    <Link class="navbar-brand" to="/">Recipe Organiser</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <Link class="nav-link text-primary fw-semibold" to="/">Recipes</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link text-primary fw-semibold" to="/addRecipe">Add Recipe</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Header
