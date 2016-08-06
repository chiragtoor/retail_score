defmodule RetailScore.Google do
  @google_server_key "AIzaSyASv9f24GcF78YIKRsX3uCRkj58JzZ8NaA"

  # url set up with key, must append the address in google format (' ' -> +) to use
  @geocode_query_url "https://maps.googleapis.com/maps/api/geocode/json?key=#{@google_server_key}"
  @geodirections_query_url "https://maps.googleapis.com/maps/api/directions/json?key=#{@google_server_key}&mode=driving"

  def get_property_lat_lng(address) do
    query_url = @geocode_query_url <> "&address=" <> address_param(address)

    case HTTPoison.get(query_url) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        Poison.Parser.parse!(body)
        |> get_lat_long_from_geocode_response
      {:ok, %HTTPoison.Response{status_code: 404}} ->
        nil
      {:error, %HTTPoison.Error{reason: _}} ->
        nil
      _ ->
        nil
    end
  end

  def get_streetview_image_details(address = %{"lat" => propLat, "lng" => propLng}) do
    case get_directions_api_lat_lng_from_address(address) do
      {imageLat, imageLng} ->
        case angleFromCoordinate(imageLat, imageLng, propLat, propLng) do
          nil ->
            nil
          heading ->
            {imageLat, imageLng, heading}
        end
      nil ->
        nil
    end
  end

  def get_directions_api_lat_lng_from_address(address) do
    query_url = @geodirections_query_url <> "&origin=" <> address_param(address) <> "&destination=" <> address_param(address)
  
    case HTTPoison.get(query_url) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        Poison.Parser.parse!(body)
        |> get_lat_long_from_directions_response
      {:ok, %HTTPoison.Response{status_code: 404}} ->
        nil
      {:error, %HTTPoison.Error{reason: _}} ->
        nil
      _ ->
        nil
    end
  end

  defp get_lat_long_from_directions_response(%{"routes" => [ %{"legs" => [%{"start_location" => %{"lat" => lat, "lng" => lng}} | _]} | _]}) do
    {lat, lng}
  end

  defp get_lat_long_from_directions_response(_) do
    nil
  end

  defp toDegrees (angle) do
    angle * (180 / :math.pi);
  end

  defp toRadians (angle) do
    angle * (:math.pi / 180);
  end

  def angleFromCoordinate(lat1, long1, lat2, long2) do

    dLon = long2 - long1
    y = :math.sin(toRadians(dLon)) * :math.cos(toRadians(lat2))
    x = (:math.cos(toRadians(lat1)) * :math.sin(toRadians(lat2))) - (:math.sin(toRadians(lat1)) * :math.cos(toRadians(lat2)) * :math.cos(toRadians(dLon)))
    brng = toDegrees(:math.atan2(y, x))

    modBrng = trunc(brng)

    newBrngStart = rem((modBrng + 360), 360)

    newBrngEnd = (modBrng * -1) + brng
    newBrngStart + newBrngEnd
  end

  defp address_param(%{"street_address" => streetAddress, "city" => city, "state" => state, "postal_code" => postalCode}) do
    String.replace("#{streetAddress}+#{city}+#{postalCode}+#{state}", " ", "+")
  end

  defp address_param(%{"street_address" => streetAddress, "city" => city, "postal_code" => postalCode}) do
    String.replace("#{streetAddress}+#{city}+#{postalCode}+CA", " ", "+")
  end

    defp get_lat_long_from_geocode_response(%{"results" => [%{"geometry" => %{"location" => %{"lat" => latitude, "lng" => longitude}}}]}) do
    {latitude, longitude}
  end

  defp get_lat_long_from_geocode_response(_) do
    nil
  end
end