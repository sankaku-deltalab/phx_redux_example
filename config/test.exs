import Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :phx_redux_example, PhxReduxExampleWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "PAagppV87ZlnGcIyYP2ZrvK1lP+y2aWmnmaMffAbt0IjootMWl+Cja0oypMtuqTw",
  server: false

# In test we don't send emails.
config :phx_redux_example, PhxReduxExample.Mailer,
  adapter: Swoosh.Adapters.Test

# Print only warnings and errors during test
config :logger, level: :warn

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime
