class Feature < ApplicationRecord
    has_many :comments
    validates :place, :mag_type, :title, :external_url, presence: true
    
    validates :magnitude, comparison: {greather_than_or_equal_to: -1.0, less_than_or_equal_to: 10.0}
    validates :c_latitude, comparison: {greather_than_or_equal_to: -90.0, less_than_or_equal_to: 90.0}
    validates :c_longitude, comparison: {greather_than_or_equal_to: -180.0, less_than_or_equal_to: 180.0}

    validates :external_id, uniqueness: true

    def self.filter_by_mag_type(mag_types)
        where(mag_type: mag_types)
    end
end
