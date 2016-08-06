defmodule RetailScore.PropertyTest do
  use RetailScore.ModelCase

  alias RetailScore.Property

  @valid_attrs %{active: true, city: "some content", description: "some content", postal_code: "some content", retail_score: 42, state: "some content", street_address: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Property.changeset(%Property{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Property.changeset(%Property{}, @invalid_attrs)
    refute changeset.valid?
  end
end
