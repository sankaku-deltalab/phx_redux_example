defmodule PhxReduxExampleWeb.PageController do
  use PhxReduxExampleWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
