defmodule RetailScore.PropertySpaceTest do
  use RetailScore.ModelCase

  alias RetailScore.PropertySpace

  @valid_attrs %{lease_type: "some content", monthly_rate: 42, name: "some content", price_sq_feet: 42, sq_feet: 42}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = PropertySpace.changeset(%PropertySpace{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = PropertySpace.changeset(%PropertySpace{}, @invalid_attrs)
    refute changeset.valid?
  end
end
