defmodule Mix.Tasks.RetailScore.Digest do
  use Mix.Task

  def run(args) do
    Mix.Shell.IO.cmd "NODE_ENV=production ./node_modules/webpack/bin/webpack.js -p"
    Mix.Shell.IO.cmd "NODE_ENV=production webpack --config ./webpack.server.config.js"
    :ok = Mix.Tasks.Phoenix.Digest.run(args)
  end
end