# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :retail_score,
  ecto_repos: [RetailScore.Repo]

# Configures the endpoint
config :retail_score, RetailScore.Endpoint,
  url: [host: "localhost"],
  root: Path.dirname(__DIR__),
  secret_key_base: "ww521IY8gsOKjx841sY5ZucLJu5YRDskvl1fptG0y6ixa2pU6jbJJgjrc3yNWfdB",
  render_errors: [view: RetailScore.ErrorView, accepts: ~w(html json)],
  pubsub: [name: RetailScore.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

#configures the mailgun account
config :mailgun,
       mailgun_domain: "https://api.mailgun.net/v3/zamatics.com",
       mailgun_key: "key-b360d1b22418c4c9007f4617f1faf53e"

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
