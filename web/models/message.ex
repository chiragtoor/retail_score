defmodule RetailScore.Message do
  use RetailScore.Web, :model

  schema "messages" do
    field :contact_name, :string
    field :contact_phone_number, :string
    field :contact_email_address, :string
    field :body, :string
    belongs_to :property, RetailScore.Property

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:contact_name, :contact_phone_number, :contact_email_address, :body, :property_id])
    |> cast_require_phone_number_or_email_address
    |> validate_required(:contact_name)
  end

  defp cast_require_phone_number_or_email_address(changeset) do
    case get_field(changeset, :contact_phone_number) do
      phone_number ->
        changeset
      nil ->
        validate_required(changeset, :contact_email_address)
    end
  end
end
