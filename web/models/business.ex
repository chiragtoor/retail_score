defmodule RetailScore.Business do
  use RetailScore.Web, :model

  schema "businesses" do
    field :name, :string
    field :place_id, :string
    field :street_address, :string
    field :phone_number, :string
    field :website, :string
    field :restaurant, :boolean, default: false
    field :cafe, :boolean, default: false
    field :bar, :boolean, default: false
    field :clothing_store, :boolean, default: false
    field :shoe_store, :boolean, default: false
    field :jewelry_store, :boolean, default: false
    field :beauty_salon, :boolean, default: false
    field :hair_care, :boolean, default: false
    field :spa, :boolean, default: false

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :place_id, :street_address, :phone_number, :website, :restaurant, :cafe, :bar, :clothing_store, :shoe_store, :jewelry_store, :beauty_salon, :hair_care, :spa])
    |> validate_required([:name, :place_id, :restaurant, :cafe, :bar, :clothing_store, :shoe_store, :jewelry_store, :beauty_salon, :hair_care, :spa])
  end
end
