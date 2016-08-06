defmodule RetailScore.MessageView do
  use RetailScore.Web, :view

  def render("index.json", %{messages: messages}) do
    %{data: render_many(messages, RetailScore.MessageView, "message.json")}
  end

  def render("show.json", %{message: message}) do
    %{data: render_one(message, RetailScore.MessageView, "message.json")}
  end

  def render("message.json", %{message: message}) do
    %{id: message.id,
      property_id: message.property_id,
      contact_name: message.contact_name,
      contact_phone_number: message.contact_phone_number,
      contact_email_address: message.contact_email_address,
      body: message.body}
  end
end
