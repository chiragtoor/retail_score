defmodule RetailScore.Repo.Migrations.CreatePropertySpace do
  use Ecto.Migration

  def change do
    create table(:property_spaces) do
      add :name, :string
      add :sq_feet, :integer
      add :price_sq_feet, :float
      add :monthly_rate, :float
      add :lease_type, :string
      add :property_id, references(:properties, on_delete: :nothing)

      timestamps()
    end
    create index(:property_spaces, [:property_id])

  end
end
