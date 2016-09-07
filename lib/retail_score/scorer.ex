defmodule RetailScore.Scorer do

  alias RetailScore.Google

  def score_property(lat, lng) do
    #call the google geocoder to get the lat and long for this property
    wellness = Google.radarSearch(Float.to_string(lat),Float.to_string(lng),["beauty_salon", "hair_care", "spa"], Map.new())
    fashion = Google.radarSearch(Float.to_string(lat),Float.to_string(lng),["clothing_store", "shoe_store", "jewelry_store"], Map.new())
    food = Google.radarSearch(Float.to_string(lat),Float.to_string(lng),["restaurant", "cafe", "bar"], Map.new())

    IO.inspect "Wellness details"
    case Map.keys(wellness) do
      [] ->
        wellness_details = []
      _->
        wellness_details = Google.getDetails(Map.keys(wellness), [])
        IO.inspect length wellness_details
    end

    IO.inspect "Fashion details"
    case Map.keys(fashion) do
      [] ->
        fashion_details = []
      _->
        fashion_details = Google.getDetails(Map.keys(fashion), [])
        IO.inspect length fashion_details
    end

    IO.inspect "Food Details"
    case Map.keys(food) do
      [] ->
        food_details = []
      _->
        food_details = Google.getDetails(Map.keys(food), [])
        IO.inspect length food_details
    end
    

    %{"fashion_count" => length(fashion_details), "wellness_count" => length(wellness_details), "food_count" => length(food_details), "fashion_places" => fashion_details, "wellness_places" => wellness_details, "food_places" => food_details}
  end

  def get_fashion_places(address) do
    #call the google geocoder to get the lat and long for this property
    case Google.get_property_lat_lng(address) do

      {geocode_lat, geocode_lon} ->
        fashion = Google.radarSearch(Float.to_string(Float.round(geocode_lat, 7)),Float.to_string(Float.round(geocode_lon, 7)),["clothing_store", "shoe_store", "jewelry_store"], Map.new())
      nil ->
        nil
    end

    case fashion do
      nil ->
        nil
      _->
        fashion_details = Google.getDetails(Map.keys(fashion), [])
    end
  end

  def get_food_places(address) do
    #call the google geocoder to get the lat and long for this property
    case Google.get_property_lat_lng(address) do

      {geocode_lat, geocode_lon} ->
        food = Google.radarSearch(Float.to_string(Float.round(geocode_lat, 7)),Float.to_string(Float.round(geocode_lon, 7)),["restaurant", "cafe", "bar"], Map.new())
      nil ->
        nil
    end

    case food do
      nil ->
        nil
      _->
        food_details = Google.getDetails(Map.keys(food), [])
    end
  end

  def get_wellness_places(address) do
    #call the google geocoder to get the lat and long for this property
    case Google.get_property_lat_lng(address) do

      {geocode_lat, geocode_lon} ->
        wellness = Google.radarSearch(Float.to_string(Float.round(geocode_lat, 7)),Float.to_string(Float.round(geocode_lon, 7)),["beauty_salon", "hair_care", "spa"], Map.new())
      nil ->
        nil
    end

    case wellness do
      nil ->
        nil
      _->
        wellness_details = Google.getDetails(Map.keys(wellness), [])
    end
  end

end