defmodule RetailScore.AgentController do
  use RetailScore.Web, :controller

  alias RetailScore.Agent

  def index(conn, _params) do
    agents = Repo.all(Agent)
    render(conn, "index.json", agents: agents)
  end

  def create(conn, %{"agent" => agent_params}) do
    changeset = Agent.changeset(%Agent{}, agent_params)

    case Repo.insert(changeset) do
      {:ok, agent} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", agent_path(conn, :show, agent))
        |> render("show.json", agent: agent)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(RetailScore.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    agent = Repo.get!(Agent, id)
    render(conn, "show.json", agent: agent)
  end

  def update(conn, %{"id" => id, "agent" => agent_params}) do
    agent = Repo.get!(Agent, id)
    changeset = Agent.changeset(agent, agent_params)

    case Repo.update(changeset) do
      {:ok, agent} ->
        render(conn, "show.json", agent: agent)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(RetailScore.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    agent = Repo.get!(Agent, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(agent)

    send_resp(conn, :no_content, "")
  end
end
