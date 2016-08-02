use Mix.Config

# For development, we disable any cache and enable
# debugging and code reloading.
#
# The watchers configuration can be used to run external
# watchers to your application. For example, we use it
# with brunch.io to recompile .js and .css sources.
config :retail_score, RetailScore.Endpoint,
  http: [port: 4000],
  debug_errors: true,
  code_reloader: true,
  check_origin: false,
  watchers: [{Path.expand("webpack.devserver.js"), [cd: Path.expand("../", __DIR__)]},
             {"node", [
                "node_modules/webpack/bin/webpack.js",
                "--watch-stdin",
                "--colors",
                cd: Path.expand("../", __DIR__)
              ]},
              {"node", [
                "node_modules/webpack/bin/webpack.js",
                "--watch-stdin",
                "--colors",
                "--config",
                "webpack.server.config.js",
                cd: Path.expand("../", __DIR__)
              ]}
            ]


# Watch static and templates for browser reloading.
config :retail_score, RetailScore.Endpoint,
  live_reload: [
    patterns: [
      # ~r{priv/static/.*(js|css|png|jpeg|jpg|gif|svg)$},
      ~r{priv/gettext/.*(po)$},
      ~r{web/views/.*(ex)$},
      ~r{web/templates/.*(eex)$}
    ]
  ]

# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# Set a higher stacktrace during development. Avoid configuring such
# in production as building large stacktraces may be expensive.
config :phoenix, :stacktrace_depth, 20

# Configure your database
config :retail_score, RetailScore.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "retail_score_dev",
  hostname: "localhost",
  pool_size: 10
