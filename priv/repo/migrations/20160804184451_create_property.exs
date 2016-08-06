defmodule RetailScore.Repo.Migrations.CreateProperty do
  use Ecto.Migration

  def change do
    create table(:properties) do
      add :street_address, :string
      add :city, :string
      add :state, :string
      add :postal_code, :string
      add :lat, :float
      add :lng, :float
      add :active, :boolean, default: true, null: false
      add :description, :string, size: 50000
      add :retail_score, :integer
      add :image_lat, :float
      add :image_lng, :float
      add :image_heading, :float

      timestamps()
    end

  end
end
