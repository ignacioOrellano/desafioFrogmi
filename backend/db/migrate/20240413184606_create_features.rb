class CreateFeatures < ActiveRecord::Migration[7.1]
  def change
    create_table :features do |t|
      t.string :type
      t.string :external_id
      t.decimal :magnitude
      t.string :place, null: false
      t.string :time
      t.boolean :tsunami
      t.string :mag_type, null: false
      t.string :title, null: false
      t.decimal :c_longitude
      t.string :c_latitude
      t.string :decimal
      t.string :external_url, null: false

      t.timestamps
    end
  end
end
