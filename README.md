Welcome to 🍺 FindMyBrewery! Brewery Directory

Made with Next.js, Tailwind, Typescript and the Open Brewery DB API

How to Get Started
Clone the repo:

    git clone https://github.com/yourusername/brewery-directory.git
    cd brewery-directory
    Install dependencies:

    npm install
    # or
    yarn install
    Run the development server:

    npm run dev
    # or
    yarn dev
    Open your browser and go to http://localhost:3000



Project File Strucutre: 

app/
    page.tsx          # Main layout: search bar, filters, table
    layout.tsx        # Global layout for site
    global.css        # Global Background Colours
  
  hooks/
      useDebounce.ts  # Custom hook for debounced input
  
  breweries/
        [id]
            page.tsx  # Specific brewery information card and google map location
  
  components/
    BackButton.tsx    # Reuseable Back Button Component
    BreweryTable.tsx  # Brewery cards with loading UI
    FilterPanel.tsx   # City + Name filters with button
    Navbar.tsx        # Global Navbar Component
    SearchBar.tsx     # Autocomplete search with API fetch
  
  public/
    images/
        FMB.png         # Main Logo

Features:

Search for breweries using keywords.

Filter breweries by name or city.

View details and google map location of selected breweries.

-Built by Dylan Horton