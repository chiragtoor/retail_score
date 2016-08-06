defmodule RetailScore.PropertyAgentTest do
  use RetailScore.ModelCase

  alias RetailScore.PropertyAgent

  @valid_attrs %{}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = PropertyAgent.changeset(%PropertyAgent{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = PropertyAgent.changeset(%PropertyAgent{}, @invalid_attrs)
    refute changeset.valid?
  end
end
