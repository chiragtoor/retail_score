defmodule RetailScore.Mailgun do

  alias RetailScore.Agent

  use Mailgun.Client,
      domain: "https://api.mailgun.net/v3/zamatics.com",
      key: "key-b360d1b22418c4c9007f4617f1faf53e"

  def email_founders(%{"message" => message_params, "property" => property}) do
    {name, email, phone, message} = {"", "", "", ""}
    case message_params do
      %{"contact_name" => contact_name, "contact_email_address" => contact_email_address, "body" => contact_message} ->
        name = contact_name
        email = contact_email_address
        message = contact_message
      %{"contact_name" => contact_name, "contact_phone_number" => contact_phone_number, "body" => contact_message} ->
        name = contact_name
        phone = contact_phone_number
        message = contact_message
      %{"contact_name" => contact_name, "contact_phone_number" => contact_phone_number, "body" => contact_message, "contact_email_address" => contact_email_address} ->
        name = contact_name
        email = contact_email_address
        phone = contact_phone_number
        message = contact_message
    end

    text = "<div>
              <h4>#{name} is interested in property (#{property.id}) at #{property.street_address}:</h4>
              <p>E-Mail: #{email}</p>
              <p>Phone #: #{phone}</p>
              <p>Message: #{message}</p>
            </div>"

    send_email to: "sudjeev@zamatics.com",
             from: "services@zamatics.com",
             subject: "CONTACT ON RETAILSCORE",
             html: text

    send_email to: "chirag@zamatics.com",
             from: "services@zamatics.com",
             subject: "CONTACT ON RETAILSCORE",
             html: text
  end
end