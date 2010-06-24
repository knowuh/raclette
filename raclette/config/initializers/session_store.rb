# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_raclette_session',
  :secret      => 'eb05b82906c188f2b21afadc3d4b763e97d662818d6f515540f71c5fad531da1fa5fabf6fbaf1e0eb7f6940880200036afce970dfeb7e8f2420f31e9fdfe561b'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
