defmodule RetailScore.Repo.Migrations.CreateAgent do
  use Ecto.Migration

  def change do
    create table(:agents) do
      add :name, :string
      add :phone_number, :string
      add :email_address, :string
      add :company_name, :string

      timestamps()
    end

  end
end
