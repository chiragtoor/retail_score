defimpl Poison.Encoder, for: Any do
  alias RetailScore.Crypto

  def encode(%{__struct__: _} = struct, options) do
    map = struct
          |> Map.from_struct
          |> sanitize_map
    Poison.Encoder.Map.encode(map, options)
  end

  defp sanitize_map(map) do
    Map.drop(map, [:__meta__, :__struct__, :updated_at, :inserted_at])
    |> convert_id
  end

  defp convert_id(map = %{:id => id}) do
    Map.put(map, :id, Crypto.encrypt(id))
  end

  defp convert_id(map) do
    map
  end
end