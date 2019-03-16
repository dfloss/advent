defmodule Advent.Day4 do
  def get_log_list(filename) do
    File.read!(filename)
    |> String.split(input, "\n", trim: true)
  end

  def get_guard_logs(filename) do
    File.stream!(filename)
    |>
  end
end
