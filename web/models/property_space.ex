defmodule RetailScore.PropertySpace do
  use RetailScore.Web, :model

  alias RetailScore.Repo

  schema "property_spaces" do
    field :name, :string
    field :sq_feet, :integer
    field :price_sq_feet, :float
    field :monthly_rate, :float
    field :lease_type, :string
    belongs_to :property, RetailScore.Property

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :sq_feet, :price_sq_feet, :monthly_rate, :lease_type, :property_id])
    |> validate_required([])
  end

  def get_min_sq_feet(spaces) do
    spaces
    |> Enum.filter(fn(space) ->
      space.sq_feet != nil
    end)
    |> Enum.map(fn(space) ->
      space.sq_feet
    end)
    |> reduce_min
  end

  def get_max_sq_feet(spaces) do
    spaces
    |> Enum.filter(fn(space) ->
      space.sq_feet != nil
    end)
    |> Enum.map(fn(space) ->
      space.sq_feet
    end)
    |> reduce_max
  end

  def get_rental_rate_min(spaces) do
    spaces
    |> Enum.filter(fn(space) ->
      (space.sq_feet != nil && space.price_sq_feet != nil) || (space.monthly_rate != nil)
    end)
    |> Enum.map(fn(space) ->
      if space.monthly_rate != nil do
        space.monthly_rate
      else
        space.sq_feet * space.price_sq_feet
      end
    end)
    |> reduce_min
  end

  def get_rental_rate_max(spaces) do
    spaces
    |> Enum.filter(fn(space) ->
      (space.sq_feet != nil && space.price_sq_feet != nil) || (space.monthly_rate != nil)
    end)
    |> Enum.map(fn(space) ->
      if space.monthly_rate != nil do
        space.monthly_rate
      else
        space.sq_feet * space.price_sq_feet
      end
    end)
    |> reduce_max
  end

  defp reduce_min([]) do
    nil
  end

  defp reduce_min(spaces) do
    spaces
    |> Enum.reduce(fn(value, min) ->
      if min <= value do
        min
      else
        value
      end
    end)
  end

  defp reduce_max([]) do
    nil
  end

  defp reduce_max(spaces) do
    spaces
    |> Enum.reduce(fn(value, max) ->
      if max >= value do
        max
      else
        value
      end
    end)
  end

  def get_spaces_for_property_preloaded(spaces) do
    spaces
    |> Enum.map(fn(space) ->
      spaceMap = %{}
      |> add_if_not_null("name", space.name)
      |> add_if_not_null("sq_feet", space.sq_feet)
      |> add_if_not_null("price_sq_feet", space.price_sq_feet)
      |> add_if_not_null("monthly_rate", space.monthly_rate)
      |> add_if_not_null("lease_type", space.lease_type)
    end)
  end

  defp add_if_not_null(map, key, value) do
    if value != nil do
      Map.put(map, key, value)
    else
      map
    end
  end

  def insert_property_spaces(property, %{"spaces" => []}) do
    nil
  end

  def insert_property_spaces(property, %{"spaces" => spacesList}) do
    spacesList
    |> Enum.with_index
    |> Enum.map(fn({space, index}) ->

      changeset = changeset(%__MODULE__{}, space)
      |> put_change(:property_id, property.id)
      |> Repo.insert!
    end)
  end
end
