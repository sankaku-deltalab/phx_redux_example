defmodule PhxReduxExampleWeb.PushingLive.Index do
  use PhxReduxExampleWeb, :live_view
  use Phoenix.HTML
  import Phoenix.LiveView
  alias Phoenix.LiveView.JS

  @impl true
  def mount(_params, _session, socket) do
    socket = socket |> assign(show_client_sider: %{})
    {:ok, socket}
  end

  @impl true
  def handle_params(_params, _url, socket) do
    {:noreply, socket}
  end

  @impl true
  def handle_event("increment_client", _params, socket) do
    socket =
      socket
      # emit event at ClientSider
      |> push_event("inc", %{})

    {:noreply, socket}
  end

  @impl true
  def handle_event("decrement_client", _params, socket) do
    socket =
      socket
      # emit event at ClientSider
      |> push_event("dec", %{})

    {:noreply, socket}
  end

  @impl true
  def handle_event(
        "send_message_to_client",
        %{"message" => message, "erace_id" => erace_id},
        socket
      )
      when message |> is_bitstring() do
    socket =
      socket
      # emit event at window
      |> push_event("message_sended", %{message: message})
      # emit event at all hook
      |> push_event("erace_value", %{id_for_filter: erace_id})

    {:noreply, socket}
  end

  @impl true
  def handle_event(
        "send_message_to_client",
        %{"message" => message},
        socket
      )
      when message |> is_bitstring() do
    socket =
      socket
      # emit event at window
      |> push_event("message_sended", %{message: message})

    {:noreply, socket}
  end

  @impl true
  def handle_event("validate", params, socket) do
    IO.inspect(%{event: "validate", params: params})
    IO.inspect(socket.assigns)
    {:noreply, socket}
  end

  @impl true
  def handle_event("toggle_client_sider", %{"id" => id}, socket) do
    socket =
      socket |> update(:show_client_sider, fn mp -> Map.update(mp, id, true, &(not &1)) end)

    {:noreply, socket}
  end

  @impl true
  def handle_event(event, params, socket) do
    IO.inspect(%{event: event, params: params})
    IO.inspect(socket.assigns)
    {:noreply, socket}
  end
end
