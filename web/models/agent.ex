defmodule RetailScore.Agent do
  use RetailScore.Web, :model

  schema "agents" do
    field :name, :string
    field :phone_number, :string
    field :email_address, :string
    field :company_name, :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :phone_number, :email_address, :company_name])
    |> validate_required([:name, :phone_number, :email_address, :company_name])
  end
end
