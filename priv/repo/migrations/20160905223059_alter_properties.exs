defmodule RetailScore.Repo.Migrations.AlterProperties do
  use Ecto.Migration

  def change do
  	alter table(:properties) do
  		add :food_count, :integer
  		add :fashion_count, :integer
  		add :wellness_count, :integer
  	end
  end
end
