defmodule RetailScore.Test do

  @properties [%{"name" => "1124 Montana Avenue", "lat" => 34.030344, "lng" => -118.4972039},
               %{"name" => "1444 Third Street Promenade", "lat" => 34.0145689, "lng" => -118.4951749},
               %{"name" => "3rd Street Mall Center", "lat" => 34.013660, "lng" => -118.493965},
               %{"name" => "Temecula Houses", "lat" => 33.540920, "lng" => -117.129235},
               %{"name" => "Temecula Mall", "lat" => 33.524607, "lng" => -117.154212}]

  def test do
    @properties
    |> Enum.map(fn(%{"name" => name, "lat" => lat, "lng" => lng}) ->
      get_esri_data_for_lat_lng_rs_test(lat, lng)
      |> Enum.map(fn(%{"Name" => varName, "Value" => value}) ->
        IO.puts "#{String.pad_trailing(varName, 40, ".")} spending at #{String.pad_trailing(name, 40, ".")} -> #{value}"
      end)
    end)
  end

  @rs_variables_test [
    {"RTSALESTOT", "retailmarketplace.RTSALESTOT", "Total Retail"},
    {"RSALES4413", "retailmarketplace.RSALES4413", "Auto Parts/Accessor/Tire Stores"},
    {"RSALES442", "retailmarketplace.RSALES442", "Furniture/Home Furnishing Stores"},
    {"RSALES4431", "retailmarketplace.RSALES4431", "Electronics & Appliance Stores"},
    {"RSALES4441", "retailmarketplace.RSALES4441", "Bldg Material/Supplies Dealers"},
    {"RSALES4452", "retailmarketplace.RSALES4452", "Specialty Food Stores"},
    {"RSALES4461", "retailmarketplace.RSALES4461", "Health & Personal Care Stores"},
    {"RSALES4481", "retailmarketplace.RSALES4481", "Clothing Stores"},
    {"RSALES4482", "retailmarketplace.RSALES4482", "Shoe Stores"},
    {"RSALES451", "retailmarketplace.RSALES451", "Sports/Hobby/Book/Music Stores"},
    {"RSALES4531", "retailmarketplace.RSALES4531", "Florists"},
    {"RSALES4532", "retailmarketplace.RSALES4532", "Office Supply/Station/Gift Stores"},
    {"RSALES7221", "retailmarketplace.RSALES7221", "Full-Service Restaurants"},
    {"RSALES7224", "retailmarketplace.RSALES7224", "Drinking Places-Alcohol"}
  ]
  @client_id "lpCIeD2LSd3f0NSK"
  @client_secret "750385b9fd9e4093ad995fdb21c48c1a"
  @esri_url "http://geoenrich.arcgis.com/arcgis/rest/services/World/geoenrichmentserver/Geoenrichment/Enrich?"
  @rs_study_area_options ~s(studyAreaOptions=[{%22areaType%22:%22RingBuffer%22,%22bufferUnits%22:%22esriKilometers%22,%22bufferRadii%22:[0.1]}])
  @rs_study_areas ~s(studyAreas=[{%22areaType%22:%22RingBuffer%22,%22bufferUnits%22:%22esriKilometers%22,%22bufferRadii%22:[0.1],%22geometry%22:)
  def get_esri_data_for_lat_lng_rs_test(lat, lng) do
    variables = @rs_variables_test
    |> Enum.map(fn({_, queryVariable, _}) ->
      queryVariable
    end)
    |> Enum.join("%22,%22")

    query_url = @esri_url <>
      "token=" <> get_esri_token(@client_id, @client_secret) <>
      "&" <> get_study_area_for_lat_lng_rs_test(lat, lng) <>
      @rs_study_area_options <> "&f=pjson&forStorage=true" <>
      "&analysisVariables=[%22" <> variables <> "%22]" 

    # IO.inspect query_url

    case HTTPoison.post(query_url, "", [], [{:timeout, :infinity}, {:recv_timeout, :infinity}]) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        extract_esri_variables_rs_test(Poison.Parser.parse!(body))
        |> Enum.map(fn({variable, value, name}) ->
          %{"Name" => name, "Value" => value}
        end)
      _ ->
        {:error, "ERROR Retreiving Esri Attributes"}
    end
  end
  defp get_study_area_for_lat_lng_rs_test(lat, lng) do
    @rs_study_areas <> "{%22x%22:" <> "#{lng}" <> ",%22y%22:" <> "#{lat}" <> "}}]"
  end
  defp extract_esri_variables_rs_test(%{"results" => [%{"value" => %{"FeatureSet" => [%{"features" => [%{"attributes" => esriAttributes}]}]}}]}) do
    @rs_variables_test
    |> Enum.map(fn({variable, _, name}) -> 
      {variable, Map.get(esriAttributes, variable), name}
    end)
  end
  def get_esri_token(client_id, client_secret) do
    token_query = "https://www.arcgis.com/sharing/rest/oauth2/token?f=json&client_id=#{client_id}&client_secret=#{client_secret}&grant_type=client_credentials"
  
    case HTTPoison.post(token_query, "") do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        %{"access_token" => token} = Poison.Parser.parse!(body)
        token
      _ ->
        {:error, "ERROR Retreiving Esri Token"}
    end
  end
end