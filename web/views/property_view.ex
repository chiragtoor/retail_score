defmodule RetailScore.PropertyView do
  use RetailScore.Web, :view

  alias RetailScore.Property
  alias RetailScore.PropertySpace
  alias RetailScore.Demographic
  alias RetailScore.Crypto

  def render("index.json", %{properties: properties}) do
    %{properties: render_many(properties, RetailScore.PropertyView, "property.json")}
  end

  def render("show.json", %{property: property}) do
    %{property: render_one(property, RetailScore.PropertyView, "property.json")}
  end

  def render("property.json", %{property: property}) do
    %{id: Crypto.encrypt(property.id),
      street_address: property.street_address,
      city: property.city,
      state: property.state,
      postal_code: property.postal_code,
      description: property.description,
      retail_score: property.retail_score}
  end

  def render("srp.json", %{properties: properties}) do
    %{properties: render_many(properties, RetailScore.PropertyView, "srp.json")}
  end

  def render("srp.json", %{property: property}) do
    %{id: Crypto.encrypt(property.id),
      street_address: property.street_address,
      city: property.city,
      state: property.state,
      postal_code: property.postal_code,
      description: property.description,
      retail_score: property.retail_score,
      lat: property.lat,
      lng: property.lng,
      image_lat: property.image_lat,
      image_lng: property.image_lng,
      image_heading: property.image_heading,
      spaces: PropertySpace.get_spaces_for_property_preloaded(property.spaces),
      min_sq_feet: PropertySpace.get_min_sq_feet(property.spaces),
      max_sq_feet: PropertySpace.get_max_sq_feet(property.spaces),
      rental_rate_min: PropertySpace.get_rental_rate_min(property.spaces),
      rental_rate_max: PropertySpace.get_rental_rate_max(property.spaces)}
  end

  def render("pdp.json", %{property: property}) do
    %{property: %{id: Crypto.encrypt(property.id),
      street_address: property.street_address,
      city: property.city,
      state: property.state,
      postal_code: property.postal_code,
      description: property.description,
      retail_score: property.retail_score,
      lat: property.lat,
      lng: property.lng,
      image_lat: property.image_lat,
      image_lng: property.image_lng,
      image_heading: property.image_heading,
      demographics: Demographic.get_demographics_for_property_preloaded(property.demographics),
      agents: Property.resolve_agents(property.agents),
      spaces: PropertySpace.get_spaces_for_property_preloaded(property.spaces),
      min_sq_feet: PropertySpace.get_min_sq_feet(property.spaces),
      max_sq_feet: PropertySpace.get_max_sq_feet(property.spaces),
      rental_rate_min: PropertySpace.get_rental_rate_min(property.spaces),
      rental_rate_max: PropertySpace.get_rental_rate_max(property.spaces)}}
  end
end
