defmodule RetailScore.Repo.Migrations.CreatePropertyAgent do
  use Ecto.Migration

  def change do
    create table(:property_agents) do
      add :agent_id, references(:agents, on_delete: :nothing)
      add :property_id, references(:properties, on_delete: :nothing)

      timestamps()
    end
    create index(:property_agents, [:agent_id])
    create index(:property_agents, [:property_id])

  end
end
