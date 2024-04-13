namespace :tasks do
  desc "Get and persist data from the API"
  task get_data: :environment do
    response = HTTParty.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson', format: :plain)
    response = JSON.parse(response, symbolize_names: true)

    response[:features].each do |feature|
      f_properties = feature[:properties]
      actual_feature = Feature.create(
        type: feature[:type],
        external_id: feature[:id],
        magnitude: f_properties[:mag],
        place: f_properties[:place],
        time: f_properties[:time],
        tsunami: f_properties[:tsunami],
        mag_type: f_properties[:magType],
        title: f_properties[:title],
        c_longitude: feature[:geometry][:coordinates][0],
        c_latitude: feature[:geometry][:coordinates][1],
        external_url: f_properties[:url],
      )
    end

  end

end
