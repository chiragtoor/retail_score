defmodule RetailScore.AgentTest do
  use RetailScore.ModelCase

  alias RetailScore.Agent

  @valid_attrs %{company_name: "some content", email_address: "some content", name: "some content", phone_number: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Agent.changeset(%Agent{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Agent.changeset(%Agent{}, @invalid_attrs)
    refute changeset.valid?
  end
end
