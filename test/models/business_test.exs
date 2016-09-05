defmodule RetailScore.BusinessTest do
  use RetailScore.ModelCase

  alias RetailScore.Business

  @valid_attrs %{bar: true, beauty_salon: true, cafe: true, clothing_store: true, hair_care: true, jewelry_store: true, name: "some content", phone_number: "some content", place_id: "some content", restaurant: true, shoe_store: true, spa: true, street_address: "some content", website: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Business.changeset(%Business{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Business.changeset(%Business{}, @invalid_attrs)
    refute changeset.valid?
  end
end
