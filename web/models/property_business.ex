defmodule RetailScore.PropertyBusiness do
  use RetailScore.Web, :model

  schema "property_businesses" do
    belongs_to :business, RetailScore.Business
    belongs_to :property, RetailScore.Property

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:property_id, :business_id])
    |> validate_required([:property_id, :business_id])
  end
end
