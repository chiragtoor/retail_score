defmodule RetailScore.Repo.Migrations.CreatePropertyBusiness do
  use Ecto.Migration

  def change do
    create table(:property_businesses) do
      add :property_id, references(:properties, on_delete: :nothing)
      add :business_id, references(:businesses, on_delete: :nothing)

      timestamps()
    end
    create index(:property_businesses, [:property_id])
    create index(:property_businesses, [:business_id])

  end
end
