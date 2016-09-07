defmodule RetailScore.PropertyController do
  use RetailScore.Web, :controller

  alias RetailScore.Property
  alias RetailScore.PropertySpace
  alias RetailScore.PropertyAgent
  alias RetailScore.Demographic
  alias RetailScore.Agent

  alias RetailScore.Crypto

  alias RetailScore.Repo

  def index(conn, %{"city" => city, "state" => state}) do
    properties = Property
    |> where([p], p.city == ^city)
    |> where([p], p.state == ^state)
    |> where([p], p.active == true)
    |> Repo.all
    |> Repo.preload(:agents)
    |> Repo.preload(:spaces)

    render(conn, "srp.json", properties: properties)
  end

  def index(conn, _params) do
    properties = Repo.all(Property)
    render(conn, "index.json", properties: properties)
  end

  def create(conn, %{"property" => property_params}) do
    # Add Geo Info and StreetView Image info to params
    changesetParams = property_params
    |> Property.add_location_details_to_params
    |> Property.add_streetview_image_details_to_params
    |> Map.put("active", true)

    case changesetParams do
      nil ->
        # Return error if something wrong with the Geo info
        conn
        |> put_status(:unprocessable_entity)
        |> json(%{error: "Cannot get Geo info"})
      changesetParams ->
        changeset = Property.changeset(%Property{}, changesetParams)

        case Repo.insert(changeset) do
          {:ok, property} ->
            # If property inserted add Demographic, Space, and Agent info to DB
            Demographic.insert_esri_data_for_property(property)
            PropertySpace.insert_property_spaces(property, property_params)

            case property_params do
              # If agent_id provided add the relation
              %{"agent_id" => agent_id} ->
                PropertyAgent.changeset(%PropertyAgent{}, %{:property_id => property.id, :agent_id => agent_id})
                |> Repo.insert!
              %{"agent" => agent_params} ->
                agent = Agent.changeset(%Agent{}, agent_params)
                |> Repo.insert!

                PropertyAgent.changeset(%PropertyAgent{}, %{:property_id => property.id, :agent_id => agent.id})
                |> Repo.insert!
              _ ->
                nil
            end

            conn
            |> put_status(:created)
            |> put_resp_header("location", property_path(conn, :show, property))
            |> render("show.json", property: property)
          {:error, changeset} ->
            conn
            |> put_status(:unprocessable_entity)
            |> render(RetailScore.ChangesetView, "error.json", changeset: changeset)
        end
    end
  end

  def show(conn, %{"id" => id}) do
    property = Repo.get!(Property, Crypto.decrypt(id))
    |> Repo.preload(:agents)
    |> Repo.preload(:demographics)
    |> Repo.preload(:spaces)
    |> Repo.preload(:businesses)

    render(conn, "pdp.json", property: property)
  end

  def update(conn, %{"id" => id, "property" => property_params}) do
    property = Repo.get!(Property, id)
    changeset = Property.changeset(property, property_params)

    case Repo.update(changeset) do
      {:ok, property} ->
        render(conn, "show.json", property: property)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(RetailScore.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    property = Repo.get!(Property, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(property)

    send_resp(conn, :no_content, "")
  end
end
