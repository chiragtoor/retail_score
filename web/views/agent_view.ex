defmodule RetailScore.AgentView do
  use RetailScore.Web, :view

  def render("index.json", %{agents: agents}) do
    %{data: render_many(agents, RetailScore.AgentView, "agent.json")}
  end

  def render("show.json", %{agent: agent}) do
    %{data: render_one(agent, RetailScore.AgentView, "agent.json")}
  end

  def render("agent.json", %{agent: agent}) do
    %{id: agent.id,
      name: agent.name,
      phone_number: agent.phone_number,
      email_address: agent.email_address,
      company_name: agent.company_name}
  end
end
