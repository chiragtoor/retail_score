defmodule RetailScore.Processor do
  # def test do
  #   properties = "{\"City\": \"Elk Grove\",\"MinSquareFeet\": 1200.0, \"ZipCode\": \"95757\", \"StreetAddress\": \"5640 Whitelock Parkway\", \"BrokerCompany\": \"CBRE, Inc.\",\"RentPerMonth\": 0.0,\"State\": \"CA\",\"BrokerPhone\": \"(916) 446-8795\",\"MaxSquareFeet\": 70000.0, \"Spaces\": [{\"AvailableDate\": \"2015-04-01T00:00:00\",\"RatePerMonth\": null, \"LeaseType\": \"NNN\", \"Area\": \"70000.0\"}],\"BrokerName\": \"Heath\",\"RatePerMonthPerUnitArea\": 0.0}" 
  
  #   properties = properties
  #   |> Poison.decode!
  #     # |> IO.inspect

  #     IO.puts "Adding geo information"
  #     processed_with_geo = [properties]
  #     |> convert_raw_to_form
  #     |> add_geo_params_to_properties
  #     |> IO.inspect
  #     totalCount = processed_with_geo
  #     |> Enum.count
  #     IO.puts "#{totalCount} properties to be inserted for this file"

  #     IO.puts "Adding Demographics"
  #     processed_with_demographics = processed_with_geo
  #     |> Enum.chunk(50, 50, [])
  #     |> Enum.map(fn(batch) ->
  #       RetailScore.Demographic.get_esri_data_for_lat_lng_batch(batch)
  #     end)
  #     |> Enum.concat
  #     |> Enum.filter(fn(property) ->
  #       property != nil
  #     end)
  #     # |> IO.inspect
  #      totalCount = processed_with_demographics
  #     |> Enum.count
  #     IO.puts "#{totalCount} properties to be inserted after getting demographics"

  #     IO.puts "Adding RS Data"
  #     processed_with_rs_data = processed_with_demographics
  #     |> Enum.chunk(50, 50, [])
  #     |> Enum.map(fn(batch) ->
  #       RetailScore.Demographic.get_esri_data_for_lat_lng_rs_batch(batch)
  #     end)
  #     |> Enum.concat
  #     |> Enum.filter(fn(property) ->
  #       property != nil
  #     end)
  #     # |> IO.inspect
  #      totalCount = processed_with_rs_data
  #     |> Enum.count
  #     IO.puts "#{totalCount} properties to be inserted after getting RS data"

  #     IO.puts "Scoring properties by city"
  #     finalData = processed_with_rs_data
  #     |> score_rs_data_properties
  #     # |> IO.inspect

  #     IO.puts "Uploading final data to S3"
  #     uploadData = finalData
  #     |> Enum.map(fn(property) ->
  #       Poison.encode!(property)
  #     end)
  #     |> Enum.join(",")

  #     upload = "[" <> uploadData <> "]"

  #     IO.inspect upload
  # end

  def process_files(files) do
    files
    |> Enum.map(fn(file) ->
      IO.puts "Working on: #{file}"

      IO.puts "Downloading from S3"
      properties = RetailScore.S3.download("raw/#{file}")
      |> Poison.decode!
      # |> IO.inspect

      IO.puts "Adding geo information"
      processed_with_geo = properties
      |> convert_raw_to_form
      |> add_geo_params_to_properties
      # |> IO.inspect
      totalCount = processed_with_geo
      |> Enum.count
      IO.puts "#{totalCount} properties to be inserted for this file"

      IO.puts "Adding Demographics"
      processed_with_demographics = processed_with_geo
      |> Enum.chunk(50, 50, [])

      batch_count = processed_with_demographics |> Enum.count

      processed_with_demographics = processed_with_demographics
      |> Enum.with_index
      |> Enum.map(fn({batch, index}) ->
        IO.puts "\tOn batch #{index + 1} / #{batch_count}"
        RetailScore.Demographic.get_esri_data_for_lat_lng_batch(batch)
      end)
      |> Enum.concat
      |> Enum.filter(fn(property) ->
        property != nil
      end)
      # |> IO.inspect
       totalCount = processed_with_demographics
      |> Enum.count
      IO.puts "#{totalCount} properties to be inserted after getting demographics"

      IO.puts "Adding RS Data"
      processed_with_rs_data = processed_with_demographics
      |> Enum.chunk(50, 50, [])

      batch_count = processed_with_rs_data |> Enum.count

      processed_with_rs_data = processed_with_rs_data
      |> Enum.with_index
      |> Enum.map(fn({batch, index}) ->
        IO.puts "\tOn batch #{index + 1} / #{batch_count}"
        RetailScore.Demographic.get_esri_data_for_lat_lng_rs_batch(batch)
      end)
      |> Enum.concat
      |> Enum.filter(fn(property) ->
        property != nil
      end)
      # |> IO.inspect
       totalCount = processed_with_rs_data
      |> Enum.count
      IO.puts "#{totalCount} properties to be inserted after getting RS data"

      IO.puts "Scoring properties by city"
      finalData = processed_with_rs_data
      |> score_rs_data_properties
      # |> IO.inspect

      IO.puts "Uploading final data to S3"
      uploadData = finalData
      |> Enum.map(fn(property) ->
        Poison.encode!(property)
      end)
      |> Enum.join(",")

      upload = "[" <> uploadData <> "]"

      RetailScore.S3.upload("processed/#{file}", upload)

      IO.puts "Uploaded processed/#{file} to S3"
    end)
  end

  def rescore_files(files) do
    files
    |> Enum.map(fn(file) ->
      IO.puts "Working on: #{file}"

      IO.puts "Downloading from S3"
      properties = RetailScore.S3.download("processed/#{file}")
      |> Poison.decode!

      uploadData = properties
      |> Enum.map(fn(propertyData) ->
        %{"demographics" => demographics} = propertyData

        retailSales = demographics
        |> Enum.map(fn(demographic) ->
          case demographic do
            %{"esri_variable" => "RSALES4481"} ->
              demographic
            %{"esri_variable" => "RSALES4482"} ->
              demographic
            _ ->
              nil
          end
        end)
        |> Enum.filter(fn(demographic) ->
          demographic != nil
        end)
        |> IO.inspect
        |> Enum.reduce(0, fn(%{"value" => value}, sum) ->
          sum + value
        end)

        Map.merge(propertyData, %{"rs_data" => retailSales})
      end)
      |> score_rs_data_properties
      |> Enum.map(fn(property) ->
        Poison.encode!(property)
      end)
      |> Enum.join(",")

      upload = "[" <> uploadData <> "]"

      RetailScore.S3.upload("processed/#{file}", upload)

      IO.puts "Uploaded processed/#{file} to S3"

    end)
  end

  def process_files_2(files) do
    files
    |> Enum.map(fn(file) ->
      IO.puts "Working on: #{file}"

      IO.puts "Downloading from S3"
      properties = RetailScore.S3.download("processed/#{file}")
      |> Poison.decode!

       totalCount = properties
      |> Enum.count
      IO.puts "#{totalCount} properties to be inserted after getting demographics"

      IO.puts "Adding RS Data"
      processed_with_rs_data = properties
      |> Enum.chunk(50, 50, [])

      batch_count = processed_with_rs_data |> Enum.count

      processed_with_rs_data = processed_with_rs_data
      |> Enum.with_index
      |> Enum.map(fn({batch, index}) ->
        IO.puts "\tOn batch #{index + 1} / #{batch_count}"
        RetailScore.Demographic.get_esri_data_for_lat_lng_rs_batch(batch)
      end)
      |> Enum.concat
      |> Enum.filter(fn(property) ->
        property != nil
      end)

       totalCount = processed_with_rs_data
      |> Enum.count
      IO.puts "#{totalCount} properties to be inserted after getting RS data"

      IO.puts "Scoring properties by city"
      finalData = processed_with_rs_data
      |> score_rs_data_properties

      IO.puts "Uploading final data to S3"
      uploadData = finalData
      |> Enum.map(fn(property) ->
        Poison.encode!(property)
      end)
      |> Enum.join(",")

      upload = "[" <> uploadData <> "]"

      RetailScore.S3.upload("processed/#{file}", upload)

      IO.puts "Uploaded processed/#{file} to S3"
    end)
  end

  def insert_properties(files) do
    files
    |> Enum.map(fn(file) ->
      IO.puts "Inserting #{file} properties into the DB"

      properties = RetailScore.S3.download("processed/#{file}")
      |> Poison.decode!
      |> Enum.map(fn(dataSet) ->
        %{"property" => propertyParams, "demographics" => demographics, "propertySpaces" => propertySpaces, "agent" => agentParams} = dataSet

        property = RetailScore.Property.changeset(%RetailScore.Property{}, propertyParams)
        |> RetailScore.Repo.insert!

        propertySpaces
        |> Enum.map(fn(propertySpace) ->
          propertySpaceParams = propertySpace
          |> Map.put("property_id", property.id)

          RetailScore.PropertySpace.changeset(%RetailScore.PropertySpace{}, propertySpaceParams)
          |> RetailScore.Repo.insert!
        end)

        demographics
        |> Enum.map(fn(demographic) ->
          demographicParams = demographic
          |> Map.put("property_id", property.id)

          RetailScore.Demographic.changeset(%RetailScore.Demographic{}, demographicParams)
          |> RetailScore.Repo.insert!
        end)

        %{"name" => name, "phone_number" => phone_number, "company_name" => company_name} = agentParams

        case company_name do
          nil ->
            company_name = "Company not provided"
          _ ->
            nil
        end

        {{name, phone_number, company_name}, property.id}
      end)
      |> Enum.reduce(%{}, fn({agent = {name, phone_number, company_name}, propertyId}, agentToProperties) ->
        case Map.get(agentToProperties, agent) do
          nil ->
            Map.put(agentToProperties, agent, [propertyId])
          propertyList ->
            Map.put(agentToProperties, agent, propertyList ++ [propertyId])
        end
      end)
      |> Enum.map(fn({{name, phone_number, company_name}, propertyIds}) ->
        agentParms = %{"name" => name, "phone_number" => phone_number, "company_name" => company_name}
        
        agent = RetailScore.Agent.changeset(%RetailScore.Agent{}, agentParms)
        |> RetailScore.Repo.insert!

        propertyIds
        |> Enum.map(fn(propertyId) ->
          propertyAgentParams = %{"agent_id" => agent.id, "property_id" => propertyId}
          
          RetailScore.PropertyAgent.changeset(%RetailScore.PropertyAgent{}, propertyAgentParams)
          |> RetailScore.Repo.insert!
        end)
      end)
    end)
  end

  defp convert_raw_to_form(properties) do
    properties
    |> Enum.map(fn(property) ->
      %{"StreetAddress" => streetAddress, "City" => city, "State" => state, "ZipCode" => zipCode} = property
      %{"BrokerPhone" => brokerPhone, "BrokerName" => brokerName, "BrokerCompany" => brokerCompany} = property
      propertyParams = %{"street_address" => streetAddress, "city" => city, "state" => state, "postal_code" => zipCode}
      agentParams = %{"name" => brokerName, "phone_number" => brokerPhone, "company_name" => brokerCompany}

      case Map.get(agentParams, "company_name") do
        nil ->
          agentParams = agentParams
          |> Map.put("company_name", "Company not provided")
        _ ->
          nil
      end

      propertyParams = propertyParams
      |> Map.put("active", true)

      %{"Spaces" => spaces} = property

      encodedSpaces = spaces
      |> Enum.with_index
      |> Enum.map(fn({space, index}) ->
        %{"RatePerMonth" => rPM, "LeaseType" => lT, "Area" => a} = space

        case {rPM, lT, a} do
          {nil, nil, nil} ->
            %{"name" => "Space #{index + 1}"}
          {rPM, nil, nil} ->
            %{"name" => "Space #{index + 1}", "monthly_rate" => rPM}
          {nil, lT, nil} ->
            %{"name" => "Space #{index + 1}", "lease_type" => lT}
          {nil, nil, a} ->
            {area, _} = Integer.parse(a)
            %{"name" => "Space #{index + 1}", "sq_feet" => area}
          {rPM, lT, nil} ->
            %{"name" => "Space #{index + 1}", "monthly_rate" => rPM, "lease_type" => lT}
          {rPM, nil, a} ->
            {area, _} = Integer.parse(a)
            priceSqFeet = rPM / area
            %{"name" => "Space #{index + 1}", "monthly_rate" => rPM, "sq_feet" => area, "price_sq_feet" => priceSqFeet}
          {nil, lT, a} ->
            {area, _} = Integer.parse(a)
            %{"name" => "Space #{index + 1}", "lease_type" => lT, "sq_feet" => area}
          {rPM, lT, a} ->
            {area, _} = Integer.parse(a)
            priceSqFeet = rPM / area
            %{"name" => "Space #{index + 1}", "monthly_rate" => rPM, "lease_type" => lT, "sq_feet" => area, "price_sq_feet" => priceSqFeet}
        end
      end)

      %{"property" => propertyParams, "agent" => agentParams, "propertySpaces" => encodedSpaces}
    end)
  end

  defp add_geo_params_to_properties(properties) do
    properties
    |> Enum.map(fn(property) ->
      %{"property" => propertyParams} = property

      propertyParams = propertyParams
      |> RetailScore.Property.add_location_details_to_params
      |> RetailScore.Property.add_streetview_image_details_to_params
      
      case propertyParams do
        nil ->
          nil
        geoPropertyParams ->
          Map.put(property, "property", geoPropertyParams)
      end
    end)
    |> Enum.filter(fn(params) ->
      params != nil
    end)
  end

  defp score_rs_data_properties(properties) do
    properties
    |> Enum.map(fn(property) -> 
      %{"property" => %{"city" => city}} = property

      {city, property}
    end)
    |> Enum.reduce(%{}, fn({city, property}, cityProperties) ->
      case Map.get(cityProperties, city) do
        nil ->
          cityProperties
          |> Map.put(city, [property])
        propertyList ->
          cityProperties
          |> Map.put(city, propertyList ++ [property])
      end
    end)
    |> Enum.map(fn({city, propertyList}) ->
      sortedProperties = propertyList
      |> Enum.sort(fn(one, two) ->
        %{"rs_data" => sum_one} = one
        %{"rs_data" => sum_two} = two

        sum_one < sum_two
      end)

      totalCount = sortedProperties
      |> Enum.count

      sortedProperties
      |> Enum.with_index
      |> Enum.map(fn({property, index}) ->
        score = trunc((((index + 1) / totalCount) * 60) + 40)

        %{"property" => propertyMap} = property

        propertyMap = propertyMap
        |> Map.put("retail_score", score)

        property
        |> Map.put("property", propertyMap)
        |> Map.drop(["rs_data"])
      end)
    end)
    |> Enum.concat
  end
end