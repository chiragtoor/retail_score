defmodule RetailScore.PageController do
  use RetailScore.Web, :controller

  def index(conn, _params) do
    initial_state = %{"visitors" => %{"max_online" => 30, "total" => 15, "online" => 15}}
    props = %{
      "location" => conn.request_path,
      "initial_state" => initial_state
    }

    result = RetailScore.ReactIO.json_call!(%{
      component: "./priv/static/js/server.js",
      props: props,
    })

    render(conn, "index.html", html: result["html"], props: initial_state)

    #render(conn, "index.html", html: [], props: %{})
  end
end
