defmodule RetailScore.DemographicTest do
  use RetailScore.ModelCase

  alias RetailScore.Demographic

  @valid_attrs %{distance: "120.5", esri_variable: "some content", value: "120.5"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Demographic.changeset(%Demographic{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Demographic.changeset(%Demographic{}, @invalid_attrs)
    refute changeset.valid?
  end
end
