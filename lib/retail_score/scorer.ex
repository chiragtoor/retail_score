defmodule RetailScore.Scorer do

  alias RetailScore.Google

  def score_property(address) do
    #call the google geocoder to get the lat and long for this property

    case Google.get_property_lat_lng(address) do

      {geocode_lat, geocode_lon} ->
        wellness = Google.radarSearch(Float.to_string(Float.round(geocode_lat, 7)),Float.to_string(Float.round(geocode_lon, 7)),["beauty_salon", "hair_care", "spa"], Map.new())
        fashion = Google.radarSearch(Float.to_string(Float.round(geocode_lat, 7)),Float.to_string(Float.round(geocode_lon, 7)),["clothing_store", "shoe_store", "jewelry_store"], Map.new())
        food = Google.radarSearch(Float.to_string(Float.round(geocode_lat, 7)),Float.to_string(Float.round(geocode_lon, 7)),["restaurant", "cafe", "bar"], Map.new())
      nil ->
        nil
    end

    case wellness do
      nil ->
        nil
      _->
        wellness_details = Google.getDetails(Map.keys(wellness), [])
    end

    case fashion do
      nil ->
        nil
      _->
        fashion_details = Google.getDetails(Map.keys(fashion), [])
    end

    case food do
      nil ->
        nil
      _->
        food_details = Google.getDetails(Map.keys(food), [])
    end

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