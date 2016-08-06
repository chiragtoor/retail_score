defmodule RetailScore.MessageTest do
  use RetailScore.ModelCase

  alias RetailScore.Message

  @valid_attrs %{body: "some content", contact_email_address: "some content", contact_name: "some content", contact_phone_number: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Message.changeset(%Message{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Message.changeset(%Message{}, @invalid_attrs)
    refute changeset.valid?
  end
end
