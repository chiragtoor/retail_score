defmodule RetailScore.S3 do

  alias ExAws.S3

  # bucket used in S3 does not change
  @bucket "retail-score-properties"

  def upload(key, data) do
    S3.put_object(@bucket, key, data)
  end

  def download(key) do
    {:ok, download} = S3.get_object(@bucket, key)
    download.body
  end

  def delete(photo_key) do
    S3.delete_object(@bucket, photo_key)
  end
end