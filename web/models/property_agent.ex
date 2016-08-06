defmodule RetailScore.PropertyAgent do
  use RetailScore.Web, :model

  schema "property_agents" do
    belongs_to :agent, RetailScore.Agent
    belongs_to :property, RetailScore.Property

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:property_id, :agent_id])
    |> validate_required([:property_id, :agent_id])
  end
end
