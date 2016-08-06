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

    get "/", PageController, :index
    get "/srp", PageController, :index
    get "/pdp", PageController, :index
    get "/retail-space-for-lease/:city", PageController, :index
    get "/properties/:propertyId", PageController, :index
  end

  # Other scopes may use custom stacks.
  scope "/api", RetailScore do
    pipe_through :api

    resources "/agents", AgentController, except: [:new, :edit]
    resources "/properties", PropertyController, except: [:new, :edit]
    resources "/messages", MessageController, except: [:new, :edit]
  end
end
