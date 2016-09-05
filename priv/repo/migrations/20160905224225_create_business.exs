defmodule RetailScore.Repo.Migrations.CreateBusiness do
  use Ecto.Migration

  def change do
    create table(:businesses) do
      add :name, :string
      add :place_id, :string
      add :street_address, :string
      add :phone_number, :string
      add :website, :string
      add :restaurant, :boolean, default: false, null: false
      add :cafe, :boolean, default: false, null: false
      add :bar, :boolean, default: false, null: false
      add :clothing_store, :boolean, default: false, null: false
      add :shoe_store, :boolean, default: false, null: false
      add :jewelry_store, :boolean, default: false, null: false
      add :beauty_salon, :boolean, default: false, null: false
      add :hair_care, :boolean, default: false, null: false
      add :spa, :boolean, default: false, null: false

      timestamps()
    end

  end
end
