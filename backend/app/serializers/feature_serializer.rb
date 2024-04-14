class FeatureSerializer < ActiveModel::Serializer
  attributes :id, :type
  attribute :f_attributes, key: 'attributes'
  attribute :links

  def f_attributes
    {
      external_id: self.object.external_id,
      magnitude: self.object.magnitude,
      place: self.object.place,
      time: self.object.time,
      tsunami: self.object.tsunami,
      mag_type: self.object.mag_type,
      title: self.object.title,
      coordinates: {
        longitude: self.object.c_longitude,
        latitude: self.object.c_latitude
      }
    }
  end

  def links
    {
      external_url: self.object.external_url
    }
  end
end
