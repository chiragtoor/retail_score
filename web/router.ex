defmodule RetailScore.Router do
  use RetailScore.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", RetailScore do
    pipe_through :browser # Use the default browser stack

    get "/homepage", PageController, :index
    get "/", PageController, :index
    get "/customer", PageController, :index
    get "/targetcustomer/1", PageController, :index
    get "/targetcustomer/2", PageController, :index
    get "/scoreproperties", PageController, :index
    get "/test", PageController, :index
    get "/test/:city", PageController, :srp_page
    get "/homepage", PageController, :index
    get "/retail-space-for-lease/:city", PageController, :srp_page
    get "/properties/:propertyId", PageController, :pdp_page
  end

  # Other scopes may use custom stacks.
  scope "/api", RetailScore do
    pipe_through :api

    resources "/agents", AgentController, except: [:new, :edit]
    resources "/properties", PropertyController, except: [:new, :edit]
    resources "/messages", MessageController, except: [:new, :edit]
  end
end
