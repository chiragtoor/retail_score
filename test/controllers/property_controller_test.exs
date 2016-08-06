defmodule RetailScore.PropertyControllerTest do
  use RetailScore.ConnCase

  alias RetailScore.Property
  @valid_attrs %{active: true, city: "some content", description: "some content", postal_code: "some content", retail_score: 42, state: "some content", street_address: "some content"}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, property_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "shows chosen resource", %{conn: conn} do
    property = Repo.insert! %Property{}
    conn = get conn, property_path(conn, :show, property)
    assert json_response(conn, 200)["data"] == %{"id" => property.id,
      "street_address" => property.street_address,
      "city" => property.city,
      "state" => property.state,
      "postal_code" => property.postal_code,
      "active" => property.active,
      "description" => property.description,
      "retail_score" => property.retail_score}
  end

  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, property_path(conn, :show, -1)
    end
  end

  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, property_path(conn, :create), property: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Property, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, property_path(conn, :create), property: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    property = Repo.insert! %Property{}
    conn = put conn, property_path(conn, :update, property), property: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Property, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    property = Repo.insert! %Property{}
    conn = put conn, property_path(conn, :update, property), property: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn} do
    property = Repo.insert! %Property{}
    conn = delete conn, property_path(conn, :delete, property)
    assert response(conn, 204)
    refute Repo.get(Property, property.id)
  end
end
