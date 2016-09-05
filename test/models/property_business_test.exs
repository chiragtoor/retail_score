defmodule RetailScore.PropertyBusinessTest do
  use RetailScore.ModelCase

  alias RetailScore.PropertyBusiness

  @valid_attrs %{}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = PropertyBusiness.changeset(%PropertyBusiness{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = PropertyBusiness.changeset(%PropertyBusiness{}, @invalid_attrs)
    refute changeset.valid?
  end
end
