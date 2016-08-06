defmodule RetailScore.Repo.Migrations.CreateMessage do
  use Ecto.Migration

  def change do
    create table(:messages) do
      add :contact_name, :string
      add :contact_phone_number, :string
      add :contact_email_address, :string
      add :body, :string
      add :property_id, references(:properties, on_delete: :nothing)

      timestamps()
    end
    create index(:messages, [:property_id])

  end
end
