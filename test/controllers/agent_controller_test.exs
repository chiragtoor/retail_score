defmodule RetailScore.AgentControllerTest do
  use RetailScore.ConnCase

  alias RetailScore.Agent
  @valid_attrs %{company_name: "some content", email_address: "some content", name: "some content", phone_number: "some content"}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, agent_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "shows chosen resource", %{conn: conn} do
    agent = Repo.insert! %Agent{}
    conn = get conn, agent_path(conn, :show, agent)
    assert json_response(conn, 200)["data"] == %{"id" => agent.id,
      "name" => agent.name,
      "phone_number" => agent.phone_number,
      "email_address" => agent.email_address,
      "company_name" => agent.company_name}
  end

  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, agent_path(conn, :show, -1)
    end
  end

  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, agent_path(conn, :create), agent: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Agent, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, agent_path(conn, :create), agent: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    agent = Repo.insert! %Agent{}
    conn = put conn, agent_path(conn, :update, agent), agent: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Agent, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    agent = Repo.insert! %Agent{}
    conn = put conn, agent_path(conn, :update, agent), agent: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn} do
    agent = Repo.insert! %Agent{}
    conn = delete conn, agent_path(conn, :delete, agent)
    assert response(conn, 204)
    refute Repo.get(Agent, agent.id)
  end
end
