defmodule RetailScore.Crypto do

  alias URI

  # method used to encrypt DB id's
  def encrypt(plaintext) do
    safe_encryption(plaintext, "A%2BA")
  end

  defp safe_encryption(plaintext, encryption) do
    case String.contains?(encryption, ["%2B", "%2F"]) do
      true ->
        iv    = :crypto.strong_rand_bytes(16) # Random IVs for each encryption
        state = :crypto.stream_init(:aes_ctr, key, iv)

        {_state, ciphertext} = :crypto.stream_encrypt(state, to_string(plaintext))

        new_encryption = iv <> ciphertext
        |> Base.encode64
        |> URI.encode(&URI.char_unreserved?/1)

        safe_encryption(plaintext, new_encryption)
      false ->
        encryption
    end
  end

  # method used to decrypt strings and get the encrypted DB id
  def decrypt(ciphertext) do
    {_result, ciphertext} = ciphertext
    |> URI.decode
    |> Base.decode64

    <<iv::binary-16, ciphertext::binary>> = ciphertext
    state = :crypto.stream_init(:aes_ctr, key, iv)

    {_state, plaintext} = :crypto.stream_decrypt(state, ciphertext)
    
    {id, _} = Integer.parse(plaintext)
    id
  end

  defp key do
    System.get_env("ENCRYPTION_KEY")
    |> :base64.decode
  end
end