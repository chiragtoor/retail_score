defmodule RetailScore.Property do
  use RetailScore.Web, :model

  alias RetailScore.Google

  schema "properties" do
    field :street_address, :string
    field :city, :string
    field :state, :string
    field :postal_code, :string
    field :lat, :float
    field :lng, :float
    field :active, :boolean, default: false
    field :description, :string
    field :retail_score, :integer
    field :image_lat, :float
    field :image_lng, :float
    field :image_heading, :float
    has_many :property_agents, RetailScore.PropertyAgent
    has_many :agents, through: [:property_agents, :agent]
    has_many :demographics, RetailScore.Demographic
    has_many :spaces, RetailScore.PropertySpace

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:street_address, :city, :state, :postal_code, :lat, :lng, :active, :description, :retail_score, :image_lat, :image_lng, :image_heading])
    |> validate_required([:street_address, :city, :state, :postal_code, :active, :retail_score])
  end

  def add_location_details_to_params(property_params) do
    case Google.get_property_lat_lng(property_params) do
      {geocode_lat, geocode_lon} ->
        property_params
        |> Map.put("lat", Float.round(geocode_lat, 7))
        |> Map.put("lng", Float.round(geocode_lon, 7))
      nil ->
        nil
    end
  end

  def resolve_agents(nil) do
    []
  end

  def resolve_agents(agents) do
    agents
  end

  def add_streetview_image_details_to_params(nil) do
    nil
  end

  def add_streetview_image_details_to_params(property_params) do
    case Google.get_streetview_image_details(property_params) do
      {image_lat, image_lng, image_heading} ->
        property_params
        |> Map.put("image_lat", Float.round(image_lat, 7))
        |> Map.put("image_lng", Float.round(image_lng, 7))
        |> Map.put("image_heading", Float.round(image_heading, 7))
      nil ->
        property_params
    end
  end
end
