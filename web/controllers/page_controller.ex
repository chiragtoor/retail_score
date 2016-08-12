defmodule RetailScore.PageController do
  use RetailScore.Web, :controller

  alias RetailScore.Property
  alias RetailScore.PropertySpace
  alias RetailScore.Demographic
  alias RetailScore.Crypto

  def index(conn, _params) do
    initial_state = %{"server_side" => true}
    props = %{
      "location" => conn.request_path,
      "initial_state" => initial_state
    }

    result = RetailScore.ReactIO.json_call!(%{
      component: "./priv/static/js/server.js",
      props: props,
    })

    render(conn, "index.html", html: result["html"], props: initial_state)

    # render(conn, "index.html", html: [], props: %{})
  end

  def pdp_page(conn, %{"propertyId" => id}) do
    property = Repo.get!(Property, Crypto.decrypt(id))
    |> Repo.preload(:agents)
    |> Repo.preload(:demographics)
    |> Repo.preload(:spaces)

    propertyData = %{id: Crypto.encrypt(property.id),
      street_address: property.street_address,
      city: property.city,
      state: property.state,
      postal_code: property.postal_code,
      # description: property.description,
      lat: property.lat,
      lng: property.lng,
      image_lat: property.image_lat,
      image_lng: property.image_lng,
      image_heading: property.image_heading,
      retail_score: property.retail_score,
      demographics: Demographic.get_demographics_for_property_preloaded(property.demographics),
      agents: Property.resolve_agents(property.agents),
      spaces: PropertySpace.get_spaces_for_property_preloaded(property.spaces),
      min_sq_feet: PropertySpace.get_min_sq_feet(property.spaces),
      max_sq_feet: PropertySpace.get_max_sq_feet(property.spaces),
      rental_rate_min: PropertySpace.get_rental_rate_min(property.spaces),
      rental_rate_max: PropertySpace.get_rental_rate_max(property.spaces)}

    initial_state = %{"property" => propertyData, "server_side" => true}
    props = %{
      "location" => conn.request_path,
      "initial_state" => initial_state
    }

    result = RetailScore.ReactIO.json_call!(%{
      component: "./priv/static/js/server.js",
      props: props,
    })

    render(conn, "index.html", html: result["html"], props: initial_state)
  end

  def srp_page(conn, %{"city" => city}) do
    [city, state] = String.split(city, ", ")

    IO.puts "SERVER RENDER SRP"

    properties = Property
    |> where([p], p.city == ^city)
    |> where([p], p.state == ^state)
    |> where([p], p.active == true)
    |> limit(20)
    |> Repo.all
    |> Repo.preload(:spaces)
    |> Enum.map(fn(property) ->
      %{id: Crypto.encrypt(property.id),
        street_address: property.street_address,
        city: property.city,
        state: property.state,
        postal_code: property.postal_code,
        lat: property.lat,
        lng: property.lng,
        image_lat: property.image_lat,
        image_lng: property.image_lng,
        image_heading: property.image_heading,
        # description: property.description,
        retail_score: property.retail_score,
        spaces: Enum.count(PropertySpace.get_spaces_for_property_preloaded(property.spaces)),
        min_sq_feet: PropertySpace.get_min_sq_feet(property.spaces),
        max_sq_feet: PropertySpace.get_max_sq_feet(property.spaces),
        rental_rate_min: PropertySpace.get_rental_rate_min(property.spaces),
        rental_rate_max: PropertySpace.get_rental_rate_max(property.spaces)}
     end)

    initial_state = %{"properties" => properties, "server_side" => true}

    props = %{
      "location" => conn.request_path,
      "initial_state" => initial_state
    }

    result = RetailScore.ReactIO.json_call!(%{
      component: "./priv/static/js/server.js",
      props: props,
    })

    render(conn, "index.html", html: result["html"], props: initial_state)
  end
end
