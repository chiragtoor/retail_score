defmodule RetailScore.Repo.Migrations.CreateDemographic do
  use Ecto.Migration

  def change do
    create table(:demographics) do
      add :esri_variable, :string
      add :value, :float
      add :distance, :float
      add :property_id, references(:properties, on_delete: :nothing)

      timestamps()
    end
    create index(:demographics, [:property_id])

  end
end
