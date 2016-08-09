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
    |> require_phone_number_or_email_address
    |> validate_required([:name, :company_name])
  end

  defp require_phone_number_or_email_address(changeset) do
    case get_field(changeset, :contact_phone_number) do
      phone_number ->
        changeset
      nil ->
        validate_required(changeset, :contact_email_address)
    end
  end
end
